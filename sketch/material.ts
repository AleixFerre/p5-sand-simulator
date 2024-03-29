class Material {
    color: string;
    density: number;
    type: MaterialType;

    constructor(color: string,type: MaterialType = MaterialType.Solid, density: number = 1 ) {
        this.color = color;
        this.density = density;
        this.type = type;
    }
}

enum Materials {
    Sand,
    Water,
    Wall,
}
enum MaterialType {
    Solid,
    Liquid,
    Static,
}

const MaterialRef: Record<Materials, Material> = {
    [Materials.Sand]: new Material('orange',MaterialType.Solid,10),
    [Materials.Water]: new Material('teal',MaterialType.Liquid,1),
    [Materials.Wall]: new Material('gray',MaterialType.Static,100),
}

const MaterialNames: Record<Materials, string> = {
    [Materials.Sand]: 'Sand',
    [Materials.Water]: 'Water',
    [Materials.Wall]: 'Wall',
}

function getParticleFromMaterial(x:number,y:number,mat: Materials, dir: number = 0): Particle {
    const MaterialParticleRef: Record<Materials, Particle> = {
        [Materials.Sand]: new Sand(x, y, dir),
        [Materials.Water]: new Water(x, y, dir),
        [Materials.Wall]: new Wall(x, y, dir)
    }
    return MaterialParticleRef[mat];
}

function getMaterial(material: Materials): Material {
    return MaterialRef[material];
}

function getMaterialColor(material: Materials): p5.Color {
    return color(getMaterial(material).color);
}
