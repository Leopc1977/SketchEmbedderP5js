export default function bouncingBallsSketch(p) {
  let balls = [];

  p.setup = () => {
    p.createCanvas(400, 400);
    for (let i = 0; i < 5; i++) {
      balls.push(new Ball(p));
    }
  };

  p.draw = () => {
    p.background(30);
    for (let ball of balls) {
      ball.move();
      ball.display();
    }
  };

  class Ball {
    constructor(p) {
      this.p = p;
      this.x = p.random(p.width);
      this.y = p.random(p.height);
      this.dx = p.random(-3, 3);
      this.dy = p.random(-3, 3);
      this.radius = p.random(20, 50);
      this.color = [p.random(255), p.random(255), p.random(255)];
    }

    move() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x - this.radius < 0 || this.x + this.radius > this.p.width) {
        this.dx *= -1;
      }
      if (this.y - this.radius < 0 || this.y + this.radius > this.p.height) {
        this.dy *= -1;
      }
    }

    display() {
      this.p.fill(...this.color);
      this.p.noStroke();
      this.p.ellipse(this.x, this.y, this.radius * 2);
    }
  }
}
