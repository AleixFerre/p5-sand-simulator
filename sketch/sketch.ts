function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  fill('red');
  rect(-50, -50, 100, 100);
}
