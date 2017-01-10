var StateMachine = (function () {
    function StateMachine(stage, idleanim, walkanim, PlayerContainer) {
        this.timeOnEnterFrame = 0;
        this.RatioX = 0;
        this.RatioY = 0;
        this.stage = stage;
        this.idleanim = idleanim;
        this.walkanim = walkanim;
        this.PlayerContainer = PlayerContainer;
        this.standstate = new Standstate(this);
        this.movestate = new Movestate(this);
        this.currentState = this.standstate;
        this.currentState.onEnter();
    }
    var d = __define,c=StateMachine,p=c.prototype;
    p.setState = function (s) {
        console.log("当前状态：" + this.currentState.getStateName());
        console.log("即将进入状态：" + s);
        if (this.currentState.getStateName() != s) {
            this.currentState.onExit();
            this.currentState.setStateName(s);
            this.currentState.onEnter();
        }
    };
    return StateMachine;
}());
egret.registerClass(StateMachine,'StateMachine');
var Standstate = (function () {
    function Standstate(mac) {
        this.s = "stand";
        this.mac = mac;
    }
    var d = __define,c=Standstate,p=c.prototype;
    p.getStateName = function () {
        return this.s;
    };
    p.setStateName = function (Statename) {
        this.s = Statename;
    };
    p.onEnter = function () {
        console.log("进入stand");
        this.mac.idleanim.alpha = 1;
    };
    p.onExit = function () {
        this.mac.idleanim.alpha = 0;
        this.mac.currentState = this.mac.movestate;
        console.log("退出stand");
    };
    return Standstate;
}());
egret.registerClass(Standstate,'Standstate',["State"]);
var Movestate = (function () {
    function Movestate(mac) {
        this.s = "move";
        this.mac = mac;
    }
    var d = __define,c=Movestate,p=c.prototype;
    p.getStateName = function () {
        return this.s;
    };
    p.setStateName = function (Statename) {
        this.s = Statename;
    };
    p.onEnter = function () {
        this.mac.walkanim.alpha = 1;
        console.log("进入move");
    };
    p.onExit = function () {
        console.log("退出move");
        this.mac.walkanim.alpha = 0;
        this.mac.currentState = this.mac.standstate;
    };
    return Movestate;
}());
egret.registerClass(Movestate,'Movestate',["State"]);
//# sourceMappingURL=StateMachine.js.map