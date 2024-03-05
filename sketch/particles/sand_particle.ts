class Sand extends Particle {
    constructor(x: number, y: number) {
        super(x, y, Materials.Sand);
    }


    override update(): boolean {
        if(STATIC_PARTICLES[this.x][this.y] !== null){
            this.y--;
            return false;
        }
        if (super.update()) {
            return true;
        }
        if (STATIC_PARTICLES[this.x][this.y + 1] !== null) {
            const dir = (Math.random() < 0.5) ? 1 : -1;
            if (STATIC_PARTICLES[this.x + dir][this.y + 1] === null) {
                this.x += dir;
                this.y++;
                return false;
            }
            if (STATIC_PARTICLES[this.x - dir][this.y + 1] === null) {
                this.x -= dir;
                this.y++;
                return false;
            }
            return true;
        }

        this.y++;
        return false;
    }
}
