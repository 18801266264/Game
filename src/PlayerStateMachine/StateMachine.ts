interface State{
    getStateName():String;
    setStateName(Statename:String);
    onEnter();
    onExit();
}

class StateMachine{
    
    public x:number;
    public y:number;
    public stage:egret.DisplayObjectContainer;
    public idleanim:egret.MovieClip;
    public walkanim:egret.MovieClip;
    public currentState:State;
    public PlayerContainer:egret.DisplayObjectContainer;
    public standstate:Standstate;
    public movestate:Movestate;
    public timeOnEnterFrame:number = 0;
    public RatioX:number = 0;
    public RatioY:number = 0;

    constructor(stage:egret.DisplayObjectContainer,idleanim:egret.MovieClip,walkanim:egret.MovieClip,PlayerContainer:egret.DisplayObjectContainer){
        this.stage = stage ;
        this.idleanim = idleanim ;
        this.walkanim = walkanim ;
        this.PlayerContainer = PlayerContainer ;
        this.standstate = new Standstate(this) ;
        this.movestate = new Movestate(this) ;
        this.currentState = this.standstate ;
        this.currentState.onEnter() ;
    }
    setState(s: String){
        console.log("当前状态："+this.currentState.getStateName());
        console.log("即将进入状态："+s);  

        if(this.currentState.getStateName() != s){
            this.currentState.onExit();
            this.currentState.setStateName(s);
            this.currentState.onEnter();
        }
    }
}

class Standstate implements State{
    public mac:StateMachine;
    constructor(mac:StateMachine){
        this.mac = mac;
    }
    s:String="stand";
    public getStateName():String{
        return this.s;
    }
    public setStateName(Statename:String){
        this.s = Statename;
    }
    public onEnter():void{
        console.log("进入stand");
        this.mac.idleanim.alpha = 1;

    }
    public onExit():void{
        this.mac.idleanim.alpha = 0;
        this.mac.currentState = this.mac.movestate;
        console.log("退出stand");
    }

}

class Movestate implements State{
    public mac:StateMachine;
    constructor(mac:StateMachine){
        this.mac = mac;
    }
    s:String="move";
    public getStateName():String{
        return this.s;
    }
    public setStateName(Statename:String){
        this.s = Statename;
    }
    public onEnter():void{
        this.mac.walkanim.alpha = 1;      
        console.log("进入move");
    }
    public onExit():void{
        console.log("退出move");
        this.mac.walkanim.alpha = 0;
        this.mac.currentState = this.mac.standstate;
    }

}