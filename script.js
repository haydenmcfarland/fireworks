const audio = document.getElementById("audio");
const canvas = document.getElementById("fireworks");
const container = document.getElementById("container");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let analyser, bufferLength, context, dataArray, particles;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

audio.onplay = () => {
  if (!analyser) initAudioAnalyser();
};

canvas.addEventListener("click", (event) => {
  launch(event.x, event.y);
});

function initAudioAnalyser() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  context = new AudioContext();
  let src = context.createMediaElementSource(audio);
  analyser = context.createAnalyser();
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 1024;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

function init() {
  particles = [];
  Launch.prototype.terminalPositionHandler = function () {
    setTimeout(() => {
      for (var i = 0; i < Math.round(500 * Math.max(Math.random(), 0.5)); i++) {
        particles.push(new Firework(this.x, this.y));
      }
    }, 500);
  };

  setInterval(createParticlesFromAudio, 300);
}

function launch(x, y) {
  particles.push(new Launch(x, canvas.height, 3, x, y));
}

function createParticlesFromAudio() {
  if (analyser && !audio.paused) {
    analyser.getByteFrequencyData(dataArray);
    let max = Math.max.apply(Math, dataArray) / 255;

    if (max < 0.75) {
      return;
    }

    let x = Math.round(max * canvas.width * Math.random());
    let y = Math.round(max * Math.random() + 200);
    launch(x, y);
  }
}

function updateParticles() {
  particles.forEach((p) => p.update());
}

function clearCanvas() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
}

function garbageCollector() {
  particles = particles.filter((particle) => {
    if (particle.targetY) {
      if (particle.y != particle.targetY) {
        return true;
      }

      return false;
    }

    return particle.radius > 0;
  });
}

function animate() {
  requestAnimationFrame(animate);
  clearCanvas();
  updateParticles();
  garbageCollector();
}

init();
animate();
