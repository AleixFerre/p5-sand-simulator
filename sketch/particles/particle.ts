abstract class Particle {
    x: number;
    y: number;
    material: Materials;

    constructor(x: number, y: number, material: Materials) {
        this.x = floor(x / RESOLUTION);
        this.y = floor(y / RESOLUTION);
        this.material = material;
    }

    /**
     * Updates the particle.
     * @returns {boolean} If the particle needs to be static
    */
    update(): boolean {
        return this.y + 1 >= height;
    }

    draw(img: p5.Image) {
        drawPixel(this.x * RESOLUTION, this.y * RESOLUTION, getMaterialColor(this.material), img)
    }
}
