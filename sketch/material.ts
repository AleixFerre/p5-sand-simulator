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
    Wall,
}

const MaterialRef: Record<Materials, Material> = {
    [Materials.Sand]: new Material(10, 'orange'),
    [Materials.Water]: new Material(5, 'teal'),
    [Materials.Wall]: new Material(100, 'gray'),
}

function getMaterial(material: Materials): Material {
    return MaterialRef[material];
}

function getMaterialColor(material: Materials): p5.Color {
    return color(getMaterial(material).color);
}
