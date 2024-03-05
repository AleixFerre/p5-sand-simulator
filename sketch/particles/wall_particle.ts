class Wall extends Particle {

    static material = Materials.Wall;
    override getMaterial(): Materials {
        return Wall.material;
    }
    constructor(x: number, y: number, dir:number = 0) {
        super(x, y, dir);
    }

    override update(): boolean {
        return true;
    }
}
