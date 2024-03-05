class Wall extends Particle {

    static material = Materials.Wall;
    override getMaterial(): Materials {
        return Wall.material;
    }
    constructor(x: number, y: number) {
        super(x, y);
    }

    override update(): boolean {
        return true;
    }
}
