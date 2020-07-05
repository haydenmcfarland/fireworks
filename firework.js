class Firework extends Particle {
  constructor(x, y) {
    super(x, y, Math.random() * 3);

    this.vx = -5 + Math.random() * 10;
    this.vy = -5 + Math.random() * 10;

    if (Math.random() < 0.5) {
      this.r = 255;
      this.g = 255;
      this.b = 255;
      return;
    }

    this.r = Math.round(Math.random()) * 255;
    this.g = Math.round(Math.random()) * 255;
    this.b = Math.round(Math.random()) * 255;
  }
  fillStyle(opacity = 0.5) {
    return `rgba(${this.r},${this.g},${this.b},${opacity})`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.radius -= 0.1;

    if (this.radius < 0) {
      return;
    }

    this.draw();
  }
}
