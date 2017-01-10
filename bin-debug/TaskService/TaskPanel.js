var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        _super.call(this);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.alpha = 1;
        this.textField.width = 500;
        this.textField.size = 24;
        this.textField.textColor = 0xffffff;
        this.x = 100;
        this.y = 950;
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        if (task.status == TaskStatus.ACCEPTABLE) {
            this.textField.$setText("请点击头上是叹号的NPC");
        }
        else if (task.status == TaskStatus.DURING) {
            this.textField.$setText("请点击头上是问号的NPC");
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this.textField.$setText("任务完成");
        }
    };
    p.rule = function (taskList) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.DURING || taskList[i].status == TaskStatus.SUBMITTED) {
                return taskList;
            }
        }
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map