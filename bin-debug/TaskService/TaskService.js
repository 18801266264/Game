var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        _super.call(this);
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'singleton!';
        }
    }
    var d = __define,c=TaskService,p=c.prototype;
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    p.accept = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.DURING;
            }
        }
        this.notify();
    };
    p.finish = function (id) {
        if (!id) {
            return ErrorCode.TASK_MISSING;
        }
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.SUBMITTED;
            }
        }
        this.notify();
        return ErrorCode.SUCCEED;
    };
    TaskService.count = 0;
    return TaskService;
}(EventEmitter));
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map