var NpcTalkTaskCondition = (function () {
    function NpcTalkTaskCondition() {
    }
    var d = __define,c=NpcTalkTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.current++;
        task.checkStatus();
    };
    p.onDuring = function (task) {
    };
    p.onSubmit = function (task) {
    };
    return NpcTalkTaskCondition;
}());
egret.registerClass(NpcTalkTaskCondition,'NpcTalkTaskCondition',["TaskCondition"]);
//# sourceMappingURL=NpcTalkTaskCondition.js.map