class Launch extends Particle {
  constructor(x, y, radius, targetX, targetY) {
    super(x, y, radius);
    this.targetX = targetX;
    this.targetY = targetY;
  }
  fillStyle() {
    return `rgba(255,255,255, ${(this.y - this.targetY) / this.y})`;
  }
  terminalPositionHandler() {}
  update() {
    this.y -= 25;

    this.y = Math.max(this.y, this.targetY);

    if (this.y == this.targetY) {
      this.terminalPositionHandler();
      return;
    }

    this.draw();
  }
}
