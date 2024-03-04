let DYNAMIC_PARTICLES: Particle[] = [];
const STATIC_PARTICLES: Materials[][] = [];
const PARTICLES_AMOUNT = 500;

let img: p5.Image;
let backgroundColor: p5.Color;

function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  createCanvas(windowWidth, windowHeight, WEBGL);

  backgroundColor = color('black');
  img = createImage(width, height);
  initParticles();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  translate(-width / 2, -height / 2);
  updateParticles();
  drawParticles();
}

function drawStaticParticles() {
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      if (STATIC_PARTICLES[i][j] === null) {
        img.set(i, j, backgroundColor);
      } else {
        img.set(i, j, getMaterialColor(STATIC_PARTICLES[i][j]));
      }
    }
  }
}

function updateParticles() {
  const newDynamicParticles: Particle[] = [];
  for (const particle of DYNAMIC_PARTICLES) {
    const shouldBeStatic = particle.update(STATIC_PARTICLES);
    if (shouldBeStatic) {
      STATIC_PARTICLES[particle.x][particle.y] = particle.material;
    } else {
      newDynamicParticles.push(particle);
    }
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

function initParticles() {
  for (let i = 0; i < PARTICLES_AMOUNT; i++) {
    DYNAMIC_PARTICLES.push(
      new Particle(floor(windowWidth/2), PARTICLES_AMOUNT-i, Materials.Water)
    )
  }

  for (let i = 0; i < windowWidth; i++) {
    STATIC_PARTICLES.push(new Array(windowHeight).fill(null));
  }
}
