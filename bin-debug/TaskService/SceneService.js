var SceneService = (function (_super) {
    __extends(SceneService, _super);
    function SceneService() {
        _super.call(this);
        SceneService.count++;
        if (SceneService.count > 1) {
            throw 'singleton!';
        }
    }
    var d = __define,c=SceneService,p=c.prototype;
    SceneService.getInstance = function () {
        if (SceneService.instance == null) {
            SceneService.instance = new SceneService();
        }
        return SceneService.instance;
    };
    p.accept = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.DURING;
            }
        }
        this.notify();
    };
    p.during = function (id) {
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
    SceneService.count = 0;
    return SceneService;
}(EventEmitter));
egret.registerClass(SceneService,'SceneService');
//# sourceMappingURL=SceneService.js.map