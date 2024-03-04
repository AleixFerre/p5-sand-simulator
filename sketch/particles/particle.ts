class Particle {
    x: number;
    y: number;
    material: Materials;
    static direction: boolean = false;

    constructor(x: number, y: number, material: Materials) {
        this.x = x;
        this.y = y;
        this.material = material;
    }

    /**
     * Updates the particle.
     *
     * @returns {boolean} If the particle needs to be static
    */
    update(STATIC_PARTICLES: Materials[][]): boolean {
        if (this.y >= windowHeight - 1) {
            return true;
        }

        if (STATIC_PARTICLES[this.x][this.y+1] !== null) {
            if (STATIC_PARTICLES[this.x+1][this.y+1] === null) {
                this.x++;
                this.y++;
                return false;
            }
            if (STATIC_PARTICLES[this.x-1][this.y+1] === null) {
                this.x--;
                this.y++;
                return false;
            }
            return true;
        }

        this.y++;
        return false;
    }

    draw(img: p5.Image) {
        img.set(this.x, this.y, getMaterialColor(this.material));
    }
}
