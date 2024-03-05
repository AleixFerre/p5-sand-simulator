abstract class Particle {
    x: number;
    y: number;
    material: Materials;
    direction: boolean;

    constructor(x: number, y: number, material: Materials) {
        this.x = floor(x / RESOLUTION);
        this.y = floor(y / RESOLUTION);
        this.material = material;
        this.direction = Math.random() < 0.5;
    }

    /**
     * Updates the particle.
     * @returns {boolean} If the particle needs to be static
    */
    update(): boolean {
        return this.y + 1 >= height / RESOLUTION;

    }

    draw(img: p5.Image) {
        drawPixel(this.x * RESOLUTION, this.y * RESOLUTION, getMaterialColor(this.material), img);
    }
}
