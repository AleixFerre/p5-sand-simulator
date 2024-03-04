abstract class Particle {
    x: number;
    y: number;
    material: Materials;

    constructor(x: number, y: number, material: Materials) {
        this.x = x;
        this.y = y;
        this.material = material;
    }

    update(): boolean {
        return this.y >= windowHeight - 1;
    }

    draw(img: p5.Image) {
        img.set(this.x, this.y, getMaterialColor(this.material));
    }
}
