class DialoguePanel extends egret.DisplayObjectContainer {
    private textField: egret.TextField;
    private button: egret.Bitmap;
    public task: Task;

    constructor() {

        super();

        this.button = this.createBitmapByName("button_png");
        this.addChild(this.button);
        this.button.y = 50;
        this.button.touchEnabled = true;
       // this.touchEnabled = false;

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.alpha = 1;
        this.textField.width = 500;
        this.textField.size = 24;
        this.textField.textColor = 0x000000;
        this.x = 250;
        this.y = 550;

        this.alpha = 0;

        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.onButtonClick();
        }, this)
    }

    private onButtonClick() {
        this.alpha = 0;
        this.touchEnabled = false;
        var taskService: TaskService = TaskService.getInstance();
        if (this.task.status == TaskStatus.ACCEPTABLE) {

            taskService.accept(this.task.id);
            this.task.onAccept(this.task);

        } else if (this.task.status == TaskStatus.CAN_SUBMIT) {

            taskService.finish(this.task.id);

        }
    }

    public getTextField(): egret.TextField {
        return this.textField;
    }

    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}