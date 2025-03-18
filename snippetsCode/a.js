export default function sketch(p) {
  let x = 50;
  let y = 50;

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(200);
    p.ellipse(x, y, 50, 50);
    x += 1;
  };
}
