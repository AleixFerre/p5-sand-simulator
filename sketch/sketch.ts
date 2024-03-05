let DYNAMIC_PARTICLES: Particle[] = [];
const STATIC_PARTICLES: Materials[][] = [];
const PARTICLES_AMOUNT = 4;

let currentMaterial: Materials;

const RESOLUTION = 10;
const CANVAS_SIZE = 60;
const MARGIN = 1;

let img: p5.Image;
let backgroundColor: p5.Color;

let font: p5.Font;


function preload() {
  font = loadFont('assets/Inconsolata-Medium.ttf');
}

function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  createCanvas(CANVAS_SIZE * RESOLUTION, CANVAS_SIZE * RESOLUTION, WEBGL);

  currentMaterial = Materials.Sand;

  textFont(font);
  textSize(32);

  frameRate(120);

  backgroundColor = color('black');
  img = createImage(width, height);
  initParticles();
}

function draw() {
  if (!mouseIsPressed && DYNAMIC_PARTICLES.length === 0) return;

  translate(-width / 2, -height / 2);
  updateParticles();
  drawParticles();

  fill('white');
  textAlign(LEFT, TOP);
  text(floor(frameRate()), 5, 5);

  textAlign(RIGHT, TOP);
  text(MaterialNames[currentMaterial], width - 5, 5);
}

function keyPressed() {
  if (keyCode === 49) {
    currentMaterial = Materials.Sand;
  } else if (keyCode === 50) {
    currentMaterial = Materials.Water;
  }
}

function updateParticles() {
  const newDynamicParticles: Particle[] = [];
  const particleToSpawn = mouseIsPressed ? getParticleFromMaterial(currentMaterial) : null;
  let hasSpawned = false;

  for (const particle of DYNAMIC_PARTICLES) {
    const shouldBeStatic = particle.update();
    if (shouldBeStatic) {
      STATIC_PARTICLES[particle.x][particle.y] = particle.material;
    } else {
      /*
      if (particleToSpawn && !hasSpawned && particleToSpawn.y >= particle.y) {
        newDynamicParticles.push(particleToSpawn);
        hasSpawned = true;
      }*/
      newDynamicParticles.push(particle);
    }
  }

  if (particleToSpawn && !hasSpawned) {
    newDynamicParticles.push(particleToSpawn);
  }

  DYNAMIC_PARTICLES = newDynamicParticles;
}

function drawParticles() {
  drawStaticParticles();

  for (const particle of DYNAMIC_PARTICLES) {
    particle.draw(img);
  }
  img.updatePixels();
  image(img, 0, 0);
}

function drawStaticParticles() {
  for (let i = 0; i < img.width / RESOLUTION; i++) {
    for (let j = 0; j < img.height / RESOLUTION; j++) {
      if (STATIC_PARTICLES[i][j] === null) {
        drawPixel(i * RESOLUTION, j * RESOLUTION, backgroundColor, img);
      } else {
        drawPixel(i * RESOLUTION, j * RESOLUTION, getMaterialColor(STATIC_PARTICLES[i][j]), img);
      }
    }
  }
}

function initParticles() {
  for (let i = PARTICLES_AMOUNT; i > 0; i--) {
    DYNAMIC_PARTICLES.push(
      new Sand(floor(width / 2), (i)*RESOLUTION)
    )
  }

  for (let i = 0; i < width / RESOLUTION; i++) {
    STATIC_PARTICLES.push(new Array(height / RESOLUTION).fill(null));

  }
  for (let i = 0; i < width / RESOLUTION; i++) {
    STATIC_PARTICLES[i][0] = Materials.Wall;
    STATIC_PARTICLES[i][height / RESOLUTION -1] = Materials.Wall
  }
  for (let i = 0; i < height / RESOLUTION; i++) {
    STATIC_PARTICLES[0][i] = Materials.Wall;
    STATIC_PARTICLES[width / RESOLUTION -1][i] = Materials.Wall
  }
}

function drawPixel(x: number, y: number, color: p5.Color, img: p5.Image) {
  for (let i = 0; i < RESOLUTION - MARGIN; i++) {
    for (let j = 0; j < RESOLUTION - MARGIN; j++) {
      img.set(x + i, y + j, color);
    }
  }
}
