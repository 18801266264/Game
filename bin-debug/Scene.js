var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.apply(this, arguments);
    }
    var d = __define,c=GameScene,p=c.prototype;
    GameScene.replaceScene = function (scene) {
        GameScene.scene = scene;
    };
    GameScene.getCurrentScene = function () {
        return GameScene.scene;
    };
    p.moveTo = function (x, y, m, PlayerContainer, grid, callback) {
        console.log("开始移动");
        /*
        egret.setTimeout(function () {
            console.log("结束移动")
            callback();
        }, this, 500)
        */
        var timeInterval = 100;
        m.setState("move");
        clearInterval(Main.interval);
        var astar = new Astar(grid);
        var endXpos = Math.floor(x);
        var endYpos = Math.floor(y);
        var startXpos = Math.floor(PlayerContainer.x / grid.Size);
        var startYpos = Math.floor(PlayerContainer.y / grid.Size);
        if (astar.findPath(grid.getNode(startXpos, startYpos), grid.getNode(endXpos, endYpos))) {
            astar._path.map(function (tile) {
                console.log("x:" + tile.x + ",y:" + tile.y);
            });
        }
        var maxLength = astar._path.length;
        var i = 0;
        astar._path.shift();
        Main.interval = setInterval(function () {
            var pos = astar._path.shift();
            //  PlayerContainer.x = pos.x * grid.Size;
            //  PlayerContainer.y = pos.y * grid.Size;
            if (pos) {
                egret.Tween.get(PlayerContainer).to({ x: pos.x * grid.Size, y: pos.y * grid.Size }, timeInterval, egret.Ease.sineInOut);
            }
            i++;
            if (i == maxLength - 1) {
                clearInterval(Main.interval);
            }
        }, timeInterval);
        var timer = new egret.Timer(maxLength * timeInterval, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            m.setState("stand");
            callback();
            timer.stop();
        }, this);
        timer.start();
    };
    p.stopMove = function (callback) {
        console.log("取消移动");
        callback();
    };
    return GameScene;
}(egret.DisplayObjectContainer));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=Scene.js.map