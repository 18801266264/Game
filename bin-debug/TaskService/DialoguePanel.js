var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel() {
        var _this = this;
        _super.call(this);
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
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onButtonClick();
        }, this);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.onButtonClick = function () {
        this.alpha = 0;
        this.touchEnabled = false;
        var taskService = TaskService.getInstance();
        if (this.task.status == TaskStatus.ACCEPTABLE) {
            taskService.accept(this.task.id);
            this.task.onAccept(this.task);
        }
        else if (this.task.status == TaskStatus.CAN_SUBMIT) {
            taskService.finish(this.task.id);
        }
    };
    p.getTextField = function () {
        return this.textField;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel');
//# sourceMappingURL=DialoguePanel.js.map