class Astar {
    private _open: Array<Nodes>;
    private _closed: Array<Nodes>;
    private _grid: Grid;
    private _endNode: Nodes;
    private _startNode: Nodes;
    public _path: Array<Nodes>;
    private _heuristic: Function = this.diagonal;
    private _straightCost: number = 1.0;
    private _diagCost: number = Math.SQRT2;
    constructor(grid: Grid) {
        this._grid = grid;
    }

    private diagonal(node: Nodes): number {
        var dx: number = Math.abs(node.x - this._endNode.x);
        var dy: number = Math.abs(node.y - this._endNode.y);
        var diag: number = Math.min(dx, dy);
        var straight: number = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    }
    public findPath(startNode: Nodes, endNode: Nodes): Boolean {
        this._startNode = startNode;
		this._endNode = endNode;
        this._open = new Array();
        this._closed = new Array();
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        return this.search();
    }
    public search(): Boolean {
        var node: Nodes = this._startNode;
        while (node != this._endNode) {
            var startX: number = Math.max(0, node.x - 1);
            var endX: number = Math.min(this._grid._numRows - 1, node.x + 1);
            var startY: number = Math.max(0, node.y - 1);
            var endY: number = Math.min(this._grid._numRows - 1, node.y + 1);
            for (var i: number = startX; i <= endX; i++) {
                for (var j: number = startY; j <= endY; j++) {
                    var test: Nodes = this._grid.getNode(i, j);
                    if (test == node || !test.walkable || !this._grid.getNode(node.x, test.y).walkable || !this._grid.getNode(test.x, node.y).walkable) {
                        continue;
                    }
                    var cost: number = this._straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        cost = this._diagCost;
                    }
                    var g: number = node.g + cost * test.costMultiplier;
                    var h: number = this._heuristic(test);
                    var f: number = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    } else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.push(test);
                    }
                }
            }
            for (var o: number = 0; o < this._open.length; o++) {

            }
            this._closed.push(node);
            if (this._open.length == 0) {
                //  this.trace("no path found");
                return false;
            }
            this._open.sort(function (a, b) {
                return a.f - b.f;
            });
            this._open.map(function (a) {
                console.log(a, f);
            });
            node = this._open.shift() as Nodes;
        }
        this.buildPath();
        return true;
    }
    private buildPath(): void {
        this._path = new Array();
        var node: Nodes = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node);
        }
    }

    private isOpen(node: Nodes): boolean {
        return this._open.indexOf(node) >= 0;

    }
    private isClosed(node: Nodes): boolean {
        return this._closed.indexOf(node) >= 0;
    }
}