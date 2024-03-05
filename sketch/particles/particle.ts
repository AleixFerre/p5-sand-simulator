abstract class Particle {
    x: number;
    y: number;
    direction_x: boolean;
    abstract getMaterial():Materials;

    constructor(x: number, y: number, dir:number = 0) {
        this.x = floor(x / RESOLUTION);
        this.y = floor(y / RESOLUTION);
        if(dir == 0){
            this.direction_x = Math.random() < 0.5;
        } else if(dir > 0 ){
            this.direction_x = true;
        } else{
            this.direction_x = false;
        }
        
        
    }

    /**
     * Updates the particle.
     * @returns {number} 0 If the particle needs to be static
     * 1 if it can be procesed more, otherwise its static
     * 2 if it needs to be dynamic
     * 3 if it activates a particle
    */
    update(): boolean {
        if (this.y + 1 >= height / RESOLUTION) return true;
        return false;
    }

    draw(img: p5.Image) {
        drawPixel(this.x * RESOLUTION, this.y * RESOLUTION, getMaterialColor(this.getMaterial()), img);
    }
}
