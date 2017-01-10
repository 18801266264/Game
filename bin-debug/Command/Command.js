var WalkCommand = (function () {
    function WalkCommand(x, y, m, PlayerContainer, grid) {
        this.x = x;
        this.y = y;
        this.m = m;
        this.PlayerContainer = PlayerContainer;
        this.grid = grid;
    }
    var d = __define,c=WalkCommand,p=c.prototype;
    p.execute = function (callback) {
        GameScene.getCurrentScene().moveTo(this.x, this.y, this.m, this.PlayerContainer, this.grid, function () {
            callback();
        });
    };
    p.cancel = function (callback) {
        GameScene.getCurrentScene().stopMove(function () {
            callback();
        });
    };
    return WalkCommand;
}());
egret.registerClass(WalkCommand,'WalkCommand',["Command"]);
var FightCommand = (function () {
    function FightCommand(mockKillMonsterButton) {
        /**
         * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
         */
        this._hasBeenCancelled = false;
        this.mockKillMonsterButton = mockKillMonsterButton;
    }
    var d = __define,c=FightCommand,p=c.prototype;
    p.execute = function (callback) {
        console.log("开始战斗");
        this.mockKillMonsterButton.onButtonClick(callback);
    };
    p.cancel = function (callback) {
        console.log("脱离战斗");
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100);
    };
    return FightCommand;
}());
egret.registerClass(FightCommand,'FightCommand',["Command"]);
var TalkCommand = (function () {
    function TalkCommand(npc) {
        this.npc = npc;
    }
    var d = __define,c=TalkCommand,p=c.prototype;
    p.execute = function (callback) {
        this.npc.onNPCClick(callback);
    };
    p.cancel = function (callback) {
        console.log("关闭对话框");
    };
    return TalkCommand;
}());
egret.registerClass(TalkCommand,'TalkCommand',["Command"]);
//# sourceMappingURL=Command.js.map