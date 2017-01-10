var Task = (function () {
    function Task(id, name, status, current, total, condition) {
        this.current = 0;
        this.total = 100;
        this.id = id;
        this.name = name;
        this.status = status;
        this.current = current;
        this.total = total;
        this.condition = condition;
    }
    var d = __define,c=Task,p=c.prototype;
    p.onAccept = function (task) {
        this.condition.onAccept(this);
    };
    p.onDuring = function (task) {
        this.condition.onDuring(this);
    };
    p.onSubmit = function () {
    };
    p.checkStatus = function () {
        if (this.current > this.total) {
            console.warn();
        }
        if (this.status == TaskStatus.DURING &&
            this.current >= this.total) {
            this.status = TaskStatus.CAN_SUBMIT;
        }
    };
    p.getcurrent = function () {
        return this.current;
    };
    p.setcurrent = function (current) {
        this.current = current;
    };
    return Task;
}());
egret.registerClass(Task,'Task',["TaskConditionContext"]);
//# sourceMappingURL=Task.js.map