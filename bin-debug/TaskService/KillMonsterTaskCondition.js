var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition() {
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.current++;
        task.checkStatus();
    };
    p.onDuring = function (task) {
        task.current++;
        task.checkStatus();
    };
    p.onSubmit = function () {
    };
    p.onChange = function (task) {
        if (task.getcurrent() == -1) {
            this.onAccept(task);
        }
        if (task.getcurrent() == 0) {
            this.onDuring(task);
        }
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["TaskCondition","Observer"]);
//# sourceMappingURL=KillMonsterTaskCondition.js.map