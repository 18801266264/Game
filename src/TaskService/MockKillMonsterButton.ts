class MockKillMonsterButton extends egret.DisplayObjectContainer {
    public button: egret.Bitmap;
    public task: Task;

    constructor(m, PlayerContainer, grid) {

        super();

        this.button = this.createBitmapByName("killMonsterButton_png");
        this.addChild(this.button);
        this.button.y = 50;
        this.button.touchEnabled = false;

        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
            var list = new CommandList();
            list.addCommand(new WalkCommand(e.stageX / grid.Size, e.stageY / grid.Size, m, PlayerContainer, grid));
            list.addCommand(new FightCommand(this));
            list.execute();
        }, this)
    }

    public onButtonClick(callback): void {

        var sceneService = SceneService.getInstance();
        if (this.task.status == TaskStatus.ACCEPTABLE) {

            sceneService.accept(this.task.id);


        } else if (this.task.status == TaskStatus.DURING) {

            this.task.onDuring(this.task);

        } else if (this.task.status == TaskStatus.CAN_SUBMIT) {

            sceneService.finish(this.task.id);

        }
        callback();

    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public rule(taskList: any) {

        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.DURING || taskList[i].status == TaskStatus.SUBMITTED) {
                return taskList[i];
            }
        }
    }
}