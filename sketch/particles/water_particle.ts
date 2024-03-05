class Water extends Particle {
    constructor(x: number, y: number) {
        super(x, y, Materials.Water);
    }

    override update(): boolean {
        if (STATIC_PARTICLES[this.x][this.y] !== null) {
            this.y--;
            this.direction = !this.direction;2
            return false;
        }
        if (super.update()) {
            return true;
        }

        if (STATIC_PARTICLES[this.x][this.y + 1] !== null) {
            const dir = (this.direction) ? 1 : -1;
            if (STATIC_PARTICLES[this.x + dir][this.y + 1] === null) {
                this.x += dir;
                this.y++;
                return false;
            }
            if (STATIC_PARTICLES[this.x - dir][this.y + 1] === null) {
                this.x -= dir;
                this.y++;
                this.direction = !this.direction;
                return false;
            }
            const stop = (Math.random() < 0.75)
            if (STATIC_PARTICLES[this.x + dir][this.y] === null) {
                if (!stop) this.x += dir;
                return false;
            }
            else if (STATIC_PARTICLES[this.x - dir][this.y] !== null) {
                return true;
            }
            else this.direction = !this.direction;
            return stop;
        }

        this.y++;
        return false;
    }
}
