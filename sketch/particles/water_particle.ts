class Water extends Particle {
    constructor(x: number, y: number) {
        super(x, y, Materials.Water);
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
            if(Math.random() < 0.003) this.direction = !this.direction;
            const dir = (this.direction) ? 1 : -1;
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
            const stop = (Math.random() < 0.8)
            if (STATIC_PARTICLES[this.x + dir][this.y] === null) {
                if(!stop)this.x += dir;
                return false;
            }
            else if (STATIC_PARTICLES[this.x - dir][this.y] !== null) {
                return true;
            }
            return stop;
            /*
            if (STATIC_PARTICLES[this.x - dir][this.y] === null) {
                this.x -= dir;
                return false;
            }
            
            //else return true
            return true;
            */
        }

        this.y++;
        return false;
    }
}
