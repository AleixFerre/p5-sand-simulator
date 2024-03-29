let DYNAMIC_PARTICLES: Particle[] = [];
let ACTIVATED_PARTICLES: Particle[] = [];
const STATIC_PARTICLES: Materials[][] = [];
const PARTICLES_AMOUNT = 50;

const DELAY = 10

let currentMaterial: Materials;
let delay = 0

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
  if (!mouseIsPressed
    && DYNAMIC_PARTICLES.length === 0
    && ACTIVATED_PARTICLES.length === 0) return;

  translate(-width / 2, -height / 2);
  updateParticles();
  drawParticles();

  fill('white');
  textAlign(LEFT, TOP);
  text(floor(frameRate()), 5, 5);

  textAlign(RIGHT, TOP);
  text(MaterialNames[currentMaterial], width - 5, 5);

  if (delay < DELAY) delay++;
}

function keyPressed() {
  if (keyCode === 49) {
    currentMaterial = Materials.Sand;
  } else if (keyCode === 50) {
    currentMaterial = Materials.Water;
  } else if (keyCode === 51) {
    currentMaterial = Materials.Wall;
  } else if (keyCode === 52) {
    currentMaterial = null;
  }
}

function updateParticles() {
  const newDynamicParticles: Particle[] = [];
  let newActivatedParticles: Particle[] = [];
  const particleToSpawn = mouseIsPressed && currentMaterial !== null ? getParticleFromMaterial(mouseX, mouseY, currentMaterial) : null;

  if (particleToSpawn) {
    newDynamicParticles.push(particleToSpawn);
  } else if (delay >= DELAY) {
    if (mouseIsPressed) {
      delay = 0;
      const pta = removeParticle(floor(mouseX / RESOLUTION), floor(mouseY / RESOLUTION));
      if (pta.length > 0) ACTIVATED_PARTICLES = ACTIVATED_PARTICLES.concat(pta);
    }
  }

  for (const particle of DYNAMIC_PARTICLES) {
    const shouldBeStatic = particle.update();
    if (shouldBeStatic) {
      if (STATIC_PARTICLES[particle.x][particle.y] != null) {
        newDynamicParticles.push(
          getParticleFromMaterial(particle.x * RESOLUTION, particle.y * RESOLUTION, STATIC_PARTICLES[particle.x][particle.y])
        );
      }
      STATIC_PARTICLES[particle.x][particle.y] = particle.getMaterial();
    } else {
      newDynamicParticles.push(particle);
    }
  }

  for (const particle of ACTIVATED_PARTICLES) {
    if(Math.random()<0.3){
      newActivatedParticles.push(particle);
      break;
    }
    const pos_x = particle.x;
    const pos_y = particle.y;
    let shouldBeStatic = particle.update();
    if (shouldBeStatic) {
      if (STATIC_PARTICLES[particle.x][particle.y] != null) {
        newDynamicParticles.push(
          getParticleFromMaterial(particle.x * RESOLUTION, particle.y * RESOLUTION, STATIC_PARTICLES[particle.x][particle.y])
        );
      }
      STATIC_PARTICLES[particle.x][particle.y] = particle.getMaterial();
    } else {
      newActivatedParticles = newActivatedParticles.concat(activateParticleFull(pos_x, pos_y));
      newDynamicParticles.push(particle);
    }
  }


  ACTIVATED_PARTICLES = newActivatedParticles;
  DYNAMIC_PARTICLES = newDynamicParticles;
}

function activateParticleFull(x: number, y: number): Particle[] {
  const rand = Math.random() < 0.5 ? -1:1;
  const posivilitis: [number, number][] = [[0, -1], [1, -1], [-1, -1],[1, 0], [-1, 0]];
  const partArr : Particle[] = [];
  for (let i: number = 0; i < posivilitis.length; i++) {
    const pos: [number, number] = [x + posivilitis[i][0] * rand, y + posivilitis[i][1]];
    let pta = activateParticle(pos[0], pos[1],-posivilitis[i][0]* rand);
    if (pta !== null) {
      partArr.push(pta);
      return partArr;
    }
  }
  return partArr;
}
function activateParticleTopRand(x: number, y: number): Particle {
  const posivilitis: [number, number][] = [[1, -1], [0, -1], [-1, -1]];
  const rand: number = floor(Math.random() * posivilitis.length);
  for (let i: number = 0; i < posivilitis.length; i++) {
    const pos: [number, number] = [x + posivilitis[(i + rand) % posivilitis.length][0], y + posivilitis[(i + rand) % posivilitis.length][1]];
    const pta = activateParticle(pos[0], pos[1]);
    if (pta !== null) return pta;
  }
  return null;
}
function activateParticle(x: number, y: number, dir: number = 0): Particle {
  const material: Materials = STATIC_PARTICLES[x][y];
  if (material != null && getMaterial(material).type != MaterialType.Static) {
    STATIC_PARTICLES[x][y] = null;
    return getParticleFromMaterial(x * RESOLUTION, y * RESOLUTION, material, dir);
  }
  return null;
}
function removeParticle(x: number, y: number): Particle[] {
  if (STATIC_PARTICLES[x][y] !== null) {
    STATIC_PARTICLES[x][y] = null;
    return activateParticleFull(x, y);
  }
  return []
}

function drawParticles() {
  drawStaticParticles();

  for (const particle of DYNAMIC_PARTICLES) {
    particle.draw(img);
  }
  for (const particle of ACTIVATED_PARTICLES) {
    particle.draw(img,1);
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
        const c = lerpColor(getMaterialColor(STATIC_PARTICLES[i][j]),color('black'),0.1)
        drawPixel(i * RESOLUTION, j * RESOLUTION, c, img);
      }
    }
  }
}

function initParticles() {
  for (let i = PARTICLES_AMOUNT; i > 0; i--) {
    DYNAMIC_PARTICLES.push(
      new Sand(floor(width / 2), (i) * RESOLUTION)
    );
    DYNAMIC_PARTICLES.push(
      new Sand(floor(width / 2 + RESOLUTION), (i) * RESOLUTION)
    );
    DYNAMIC_PARTICLES.push(
      new Sand(floor(width / 2 - RESOLUTION), (i) * RESOLUTION)
    );
  }

  for (let i = 0; i < width / RESOLUTION; i++) {
    STATIC_PARTICLES.push(new Array(height / RESOLUTION).fill(null));

  }
  for (let i = 0; i < width / RESOLUTION; i++) {
    STATIC_PARTICLES[i][0] = Materials.Wall;
    STATIC_PARTICLES[i][height / RESOLUTION - 1] = Materials.Wall
  }
  for (let i = 0; i < height / RESOLUTION; i++) {
    STATIC_PARTICLES[0][i] = Materials.Wall;
    STATIC_PARTICLES[width / RESOLUTION - 1][i] = Materials.Wall
  }
}

function drawPixel(x: number, y: number, color: p5.Color, img: p5.Image) {
  for (let i = 0; i < RESOLUTION - MARGIN; i++) {
    for (let j = 0; j < RESOLUTION - MARGIN; j++) {
      img.set(x + i, y + j, color);
    }
  }
}
