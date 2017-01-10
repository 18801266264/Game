interface Command {

    execute(callback: Function): void;

    cancel(callback: Function): void;

}

class WalkCommand implements Command {
    private x;
    private y;
    private m: StateMachine;
    private PlayerContainer: egret.DisplayObjectContainer;
    private grid: Grid;
    private interval;
    constructor(x: number, y: number, m: StateMachine, PlayerContainer: egret.DisplayObjectContainer, grid: Grid) {
        this.x = x;
        this.y = y;
        this.m = m;
        this.PlayerContainer = PlayerContainer;
        this.grid = grid;

    }

    execute(callback: Function): void {
        GameScene.getCurrentScene().moveTo(this.x, this.y, this.m, this.PlayerContainer, this.grid, function () {
            callback();
        })
    }

    cancel(callback: Function) {
        GameScene.getCurrentScene().stopMove(function () {
            callback();
        })
    }
}

class FightCommand implements Command {
    /**
     * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
     */
    private _hasBeenCancelled = false;
    private mockKillMonsterButton: MockKillMonsterButton;

    constructor(mockKillMonsterButton) {
        this.mockKillMonsterButton = mockKillMonsterButton;
    }

    execute(callback: Function): void {

        console.log("开始战斗")
        this.mockKillMonsterButton.onButtonClick(callback);
    }

    cancel(callback: Function) {
        console.log("脱离战斗")
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100)

    }
}

class TalkCommand implements Command {

    private npc: NPC;
    constructor(npc) {
        this.npc = npc;
    }
    execute(callback: Function): void {
        this.npc.onNPCClick(callback);
    }

    cancel(callback: Function) {
        console.log("关闭对话框");
    }
}