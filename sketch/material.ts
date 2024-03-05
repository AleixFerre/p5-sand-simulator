class Material {
    color: string;

    constructor(color: string) {
        this.color = color;
    }
}

enum Materials {
    Sand,
    Water,
    Wall,
}

const MaterialRef: Record<Materials, Material> = {
    [Materials.Sand]: new Material('orange'),
    [Materials.Water]: new Material('teal'),
    [Materials.Wall]: new Material('gray'),
}

const MaterialNames: Record<Materials, string> = {
    [Materials.Sand]: 'Sand',
    [Materials.Water]: 'Water',
    [Materials.Wall]: 'Wall',
}

function getParticleFromMaterial(mat: Materials): Particle {
    const MaterialParticleRef: Record<Materials, Particle> = {
        [Materials.Sand]: new Sand(mouseX, mouseY),
        [Materials.Water]: new Water(mouseX, mouseY),
        [Materials.Wall]: new Sand(mouseX, mouseY)
    }
    return MaterialParticleRef[mat];
}

function getMaterial(material: Materials): Material {
    return MaterialRef[material];
}

function getMaterialColor(material: Materials): p5.Color {
    return color(getMaterial(material).color);
}
