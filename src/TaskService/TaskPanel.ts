class TaskPanel extends egret.DisplayObjectContainer implements Observer {
    public textField: egret.TextField;

    constructor() {
        super();
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.alpha = 1;
        this.textField.width = 500;
        this.textField.size = 24;
        this.textField.textColor = 0xffffff;
        this.x = 100;
        this.y = 950;

    }

    public onChange(task: Task) {
        if (task.status == TaskStatus.ACCEPTABLE) {
            this.textField.$setText("请点击头上是叹号的NPC");
        } else if (task.status == TaskStatus.DURING) {
            this.textField.$setText("请点击头上是问号的NPC");
        } else if (task.status == TaskStatus.SUBMITTED) {
            this.textField.$setText("任务完成");
        }
    }

    public rule(taskList: any) {

        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.DURING || taskList[i].status == TaskStatus.SUBMITTED) {
                return taskList;
            }
        }
    }
}