export default function animatedGraph(p) {
  let circleX = 200;
  let circleY = 150;
  let circleRadius = 75;

  let graphX = 50;
  let graphY = 300;
  let graphAmplitude = 50;
  let graphPeriod = 300;

  p.setup = function () {
    p.createCanvas(400, 400);
    p.angleMode(p.DEGREES);
    p.describe(
      'Animated demonstration of a point moving around the unit circle, together with the corresponding sine and cosine values moving along their graphs.'
    );
  };

  p.draw = function () {
    p.background(0);

    // Set angle based on frameCount, and display current value
    let angle = p.frameCount % 360;

    p.fill(255);
    p.textSize(20);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`angle: ${angle}`, 25, 25);

    // Draw circle and diameters
    p.noFill();
    p.stroke(128);
    p.strokeWeight(3);
    p.circle(circleX, circleY, 2 * circleRadius);
    p.line(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
    p.line(circleX - circleRadius, circleY, circleX + circleRadius, circleY);

    // Draw moving points
    let pointX = circleX + circleRadius * p.cos(angle);
    let pointY = circleY - circleRadius * p.sin(angle);

    p.line(circleX, circleY, pointX, pointY);

    p.noStroke();

    p.fill('white');
    p.circle(pointX, pointY, 10);

    p.fill('orange');
    p.circle(pointX, circleY, 10);

    p.fill('red');
    p.circle(circleX, pointY, 10);

    // Draw graph
    p.stroke('grey');
    p.strokeWeight(3);
    p.line(graphX, graphY, graphX + 300, graphY);
    p.line(graphX, graphY - graphAmplitude, graphX, graphY + graphAmplitude);
    p.line(
      graphX + graphPeriod,
      graphY - graphAmplitude,
      graphX + graphPeriod,
      graphY + graphAmplitude
    );

    p.fill('grey');
    p.strokeWeight(1);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Graph Representation', graphX + 150, graphY + 20);
  };
}
