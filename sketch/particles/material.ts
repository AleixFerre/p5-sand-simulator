class Material {
    density: number;
    color: string;

    constructor(density: number, color: string) {
        this.density = density;
        this.color = color;
    }
}

enum Materials {
    Sand,
    Water,
}

const MaterialRef: Record<Materials, Material> = {
    [Materials.Sand]: new Material(10, 'yellow'),
    [Materials.Water]: new Material(5, 'blue'),
}

function getMaterial(material: Materials): Material {
    return MaterialRef[material];
}

function getMaterialColor(material: Materials): p5.Color {
    return color(getMaterial(material).color);
}
