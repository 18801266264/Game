class Nodes {
    public x: number;
    public y: number;
    public f: number;
    public g: number;
    public h: number;
    public walkable: boolean;
    public parent: Nodes;
    public costMultiplier: number = 1.0;
    constructor(x: number, y: number,walkable:boolean) {
        this.x = x;
        this.y = y;
        this.walkable = walkable;
    }

}