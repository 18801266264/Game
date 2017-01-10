var EventEmitter = (function () {
    function EventEmitter() {
        this.observerList = [];
        this.taskList = [];
    }
    var d = __define,c=EventEmitter,p=c.prototype;
    p.getTaskByCustomRole = function (rule) {
        return rule(this.taskList);
    };
    p.notify = function () {
        for (var i = 0; i < this.taskList.length; i++) {
            for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
                var observer = _a[_i];
                observer.onChange(this.taskList[i]);
            }
        }
    };
    return EventEmitter;
}());
egret.registerClass(EventEmitter,'EventEmitter');
//# sourceMappingURL=EventEmitter.js.map