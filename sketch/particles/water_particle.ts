class Water extends Particle {

    static material = Materials.Water;
    override getMaterial(): Materials {
        return Water.material;
    }

    static check: [number, number, number, number][] = //x,y,flip if empty,chance stop
        [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [-1, 1, 1, 0],
            [1, 0, 0, 0.7],
            [-1, 0, 1, 1],
        ];

    constructor(x: number, y: number) {
        super(x, y);
    }

    override update(): boolean {
        if (super.update()) {
            return true;
        }
        let empty = Water.isEmpty(
            STATIC_PARTICLES[this.x][this.y]
        )

        if (!empty) {
            this.y--;
            this.direction_x != this.direction_x
            return false;
        }
        const dir = (this.direction_x) ? 1 : -1;

        for (let i = 0; i < Water.check.length; i++) {
            let empty = Water.isEmpty(
                STATIC_PARTICLES[this.x + dir * Water.check[i][0]][this.y + Water.check[i][1]]
            )
            if (empty) {
                this.x += dir * Water.check[i][0];
                this.y += Water.check[i][1];
                this.direction_x = Water.check[i][2] == 1 ? !this.direction_x : this.direction_x;
                return false;
            }
            else if (Water.check[i][3] != 0 && Math.random() < Water.check[i][3]) {
                return true;
            }
        }
        return true;
    }
    static isEmpty(material: Materials): boolean {
        if (material === null) return true;
        return false;
    }
}
