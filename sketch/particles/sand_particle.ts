class Sand extends Particle {

    static material = Materials.Sand;
    override getMaterial(): Materials {
        return Sand.material;
    }
    
    static check:[number,number][] = [[0,1],[1,1],[-1,1]];

    constructor(x: number, y: number) {
        super(x, y);
    }

    override update(): boolean {

        if (super.update()) {
            return true;
        }
        let empty = Sand.isEmpty(
            STATIC_PARTICLES[this.x][this.y] 
            )
        if (!empty) {
            this.y--;
            return false;
        }
        const dir = (this.direction_x) ? 1 : -1;

        for(let i = 0; i<Sand.check.length;i++){
            let empty = Sand.isEmpty(
                STATIC_PARTICLES[this.x + dir * Sand.check[i][0]][this.y + Sand.check[i][1]] 
                )
            if (empty) {
                this.x += dir * Sand.check[i][0];
                this.y += Sand.check[i][1];
                return false;
            }
        }
        return true;
    }
    /**
     * 
     * @param material 
     * @returns 0 if full 2 if empty 3 if aviable but full
     */
    static isEmpty(material: Materials): boolean {
        if (material === null) return true;
        if (MaterialRef[material].type === MaterialType.Liquid 
            && MaterialRef[material].density <= MaterialRef[Materials.Sand].density)
            return true;
        return false;
    }
}
