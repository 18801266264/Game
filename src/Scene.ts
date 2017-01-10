class GameScene extends egret.DisplayObjectContainer {

    private static scene: GameScene;
    public static replaceScene(scene: GameScene) {
        GameScene.scene = scene;
    }

    public static getCurrentScene(): GameScene {
        return GameScene.scene;
    }

    public moveTo(x: number, y: number, m: StateMachine, PlayerContainer: egret.DisplayObjectContainer, grid: Grid, callback: Function) {
        console.log("开始移动")
        /*
        egret.setTimeout(function () {
            console.log("结束移动")
            callback();
        }, this, 500)
        */

        var timeInterval = 100;

        m.setState("move");

        clearInterval(Main.interval);

        var astar: Astar = new Astar(grid);

        var endXpos = Math.floor(x);
        var endYpos = Math.floor(y);
        var startXpos = Math.floor(PlayerContainer.x / grid.Size);
        var startYpos = Math.floor(PlayerContainer.y / grid.Size);

        if (astar.findPath(grid.getNode(startXpos, startYpos), grid.getNode(endXpos, endYpos))) { //传入起点和终点
            astar._path.map((tile) => {
                console.log(`x:${tile.x},y:${tile.y}`)
            });
        }

        var maxLength = astar._path.length;
        var i = 0;

        astar._path.shift();

        Main.interval = setInterval(() => {

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

        }, timeInterval)

        var timer = new egret.Timer(maxLength * timeInterval, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, () => {
            m.setState("stand");
            callback();
            timer.stop();
        }, this);
        timer.start();

    }

    public stopMove(callback: Function) {
        console.log("取消移动")
        callback();
    }

}