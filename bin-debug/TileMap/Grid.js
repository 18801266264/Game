var Grid = (function () {
    function Grid(numCols, numRows, stage) {
        this.config = [];
        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = new Array();
        this.stage = stage;
        this.Size = 100;
        this.config = [
            { node: new Nodes(0, 0, true), image: "1_jpg" },
            { node: new Nodes(1, 0, false), image: "2_jpg" },
            { node: new Nodes(2, 0, false), image: "2_jpg" },
            { node: new Nodes(3, 0, false), image: "2_jpg" },
            { node: new Nodes(4, 0, false), image: "2_jpg" },
            { node: new Nodes(5, 0, false), image: "2_jpg" },
            { node: new Nodes(6, 0, false), image: "2_jpg" },
            { node: new Nodes(7, 0, false), image: "2_jpg" },
            { node: new Nodes(8, 0, false), image: "2_jpg" },
            { node: new Nodes(9, 0, false), image: "2_jpg" },
            { node: new Nodes(0, 1, true), image: "1_jpg" },
            { node: new Nodes(1, 1, true), image: "1_jpg" },
            { node: new Nodes(2, 1, true), image: "1_jpg" },
            { node: new Nodes(3, 1, true), image: "1_jpg" },
            { node: new Nodes(4, 1, true), image: "1_jpg" },
            { node: new Nodes(5, 1, true), image: "1_jpg" },
            { node: new Nodes(6, 1, true), image: "1_jpg" },
            { node: new Nodes(7, 1, true), image: "1_jpg" },
            { node: new Nodes(8, 1, true), image: "1_jpg" },
            { node: new Nodes(9, 1, false), image: "2_jpg" },
            { node: new Nodes(0, 2, false), image: "2_jpg" },
            { node: new Nodes(1, 2, false), image: "2_jpg" },
            { node: new Nodes(2, 2, false), image: "2_jpg" },
            { node: new Nodes(3, 2, false), image: "2_jpg" },
            { node: new Nodes(4, 2, false), image: "2_jpg" },
            { node: new Nodes(5, 2, false), image: "2_jpg" },
            { node: new Nodes(6, 2, false), image: "2_jpg" },
            { node: new Nodes(7, 2, false), image: "2_jpg" },
            { node: new Nodes(8, 2, true), image: "1_jpg" },
            { node: new Nodes(9, 2, false), image: "2_jpg" },
            { node: new Nodes(0, 3, false), image: "2_jpg" },
            { node: new Nodes(1, 3, true), image: "1_jpg" },
            { node: new Nodes(2, 3, true), image: "1_jpg" },
            { node: new Nodes(3, 3, true), image: "1_jpg" },
            { node: new Nodes(4, 3, true), image: "1_jpg" },
            { node: new Nodes(5, 3, true), image: "1_jpg" },
            { node: new Nodes(6, 3, true), image: "1_jpg" },
            { node: new Nodes(7, 3, false), image: "2_jpg" },
            { node: new Nodes(8, 3, true), image: "1_jpg" },
            { node: new Nodes(9, 3, false), image: "2_jpg" },
            { node: new Nodes(0, 4, false), image: "2_jpg" },
            { node: new Nodes(1, 4, true), image: "1_jpg" },
            { node: new Nodes(2, 4, false), image: "2_jpg" },
            { node: new Nodes(3, 4, false), image: "2_jpg" },
            { node: new Nodes(4, 4, false), image: "2_jpg" },
            { node: new Nodes(5, 4, false), image: "2_jpg" },
            { node: new Nodes(6, 4, false), image: "2_jpg" },
            { node: new Nodes(7, 4, false), image: "2_jpg" },
            { node: new Nodes(8, 4, true), image: "1_jpg" },
            { node: new Nodes(9, 4, false), image: "2_jpg" },
            { node: new Nodes(0, 5, false), image: "2_jpg" },
            { node: new Nodes(1, 5, true), image: "1_jpg" },
            { node: new Nodes(2, 5, true), image: "1_jpg" },
            { node: new Nodes(3, 5, true), image: "1_jpg" },
            { node: new Nodes(4, 5, true), image: "1_jpg" },
            { node: new Nodes(5, 5, true), image: "1_jpg" },
            { node: new Nodes(6, 5, true), image: "1_jpg" },
            { node: new Nodes(7, 5, true), image: "1_jpg" },
            { node: new Nodes(8, 5, true), image: "1_jpg" },
            { node: new Nodes(9, 5, false), image: "2_jpg" },
            { node: new Nodes(0, 6, false), image: "2_jpg" },
            { node: new Nodes(1, 6, true), image: "1_jpg" },
            { node: new Nodes(2, 6, true), image: "1_jpg" },
            { node: new Nodes(3, 6, true), image: "1_jpg" },
            { node: new Nodes(4, 6, true), image: "1_jpg" },
            { node: new Nodes(5, 6, true), image: "1_jpg" },
            { node: new Nodes(6, 6, true), image: "1_jpg" },
            { node: new Nodes(7, 6, true), image: "1_jpg" },
            { node: new Nodes(8, 6, true), image: "1_jpg" },
            { node: new Nodes(9, 6, false), image: "2_jpg" },
            { node: new Nodes(0, 7, false), image: "2_jpg" },
            { node: new Nodes(1, 7, true), image: "1_jpg" },
            { node: new Nodes(2, 7, false), image: "2_jpg" },
            { node: new Nodes(3, 7, false), image: "2_jpg" },
            { node: new Nodes(4, 7, false), image: "2_jpg" },
            { node: new Nodes(5, 7, false), image: "2_jpg" },
            { node: new Nodes(6, 7, false), image: "2_jpg" },
            { node: new Nodes(7, 7, false), image: "2_jpg" },
            { node: new Nodes(8, 7, false), image: "2_jpg" },
            { node: new Nodes(9, 7, false), image: "2_jpg" },
            { node: new Nodes(0, 8, false), image: "2_jpg" },
            { node: new Nodes(1, 8, true), image: "1_jpg" },
            { node: new Nodes(2, 8, true), image: "1_jpg" },
            { node: new Nodes(3, 8, true), image: "1_jpg" },
            { node: new Nodes(4, 8, true), image: "1_jpg" },
            { node: new Nodes(5, 8, true), image: "1_jpg" },
            { node: new Nodes(6, 8, true), image: "1_jpg" },
            { node: new Nodes(7, 8, true), image: "1_jpg" },
            { node: new Nodes(8, 8, true), image: "1_jpg" },
            { node: new Nodes(9, 8, false), image: "2_jpg" },
            { node: new Nodes(0, 9, false), image: "2_jpg" },
            { node: new Nodes(1, 9, false), image: "2_jpg" },
            { node: new Nodes(2, 9, false), image: "2_jpg" },
            { node: new Nodes(3, 9, false), image: "2_jpg" },
            { node: new Nodes(4, 9, false), image: "2_jpg" },
            { node: new Nodes(5, 9, false), image: "2_jpg" },
            { node: new Nodes(6, 9, false), image: "2_jpg" },
            { node: new Nodes(7, 9, false), image: "2_jpg" },
            { node: new Nodes(8, 9, true), image: "1_jpg" },
            { node: new Nodes(9, 9, true), image: "1_jpg" }
        ];
        //  var grid = new astar.Grid(10, 10);
        //var container = new egret.DisplayObjectContainer();
        for (var i = 0; i < this.config.length; i++) {
            var tile = this.config[i];
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(tile.image);
            bitmap.x = tile.node.x * this.Size;
            bitmap.y = tile.node.y * this.Size;
            bitmap.touchEnabled = tile.node.walkable;
            this.stage.addChild(bitmap);
        }
    }
    var d = __define,c=Grid,p=c.prototype;
    p.getNode = function (x, y) {
        var result = this.config[y * this._numRows + x].node;
        return result;
    };
    return Grid;
}());
egret.registerClass(Grid,'Grid');
//# sourceMappingURL=Grid.js.map