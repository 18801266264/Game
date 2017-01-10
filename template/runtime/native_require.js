
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/Command/Command.js",
	"bin-debug/Command/CommandList.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/PlayerStateMachine/StateMachine.js",
	"bin-debug/Scene.js",
	"bin-debug/TaskService/DialoguePanel.js",
	"bin-debug/TaskService/ErrorCode.js",
	"bin-debug/TaskService/EventEmitter.js",
	"bin-debug/TaskService/KillMonsterTaskCondition.js",
	"bin-debug/TaskService/MockKillMonsterButton.js",
	"bin-debug/TaskService/NPC.js",
	"bin-debug/TaskService/NpcTalkTaskCondition.js",
	"bin-debug/TaskService/Observer.js",
	"bin-debug/TaskService/SceneService.js",
	"bin-debug/TaskService/Task.js",
	"bin-debug/TaskService/TaskCondition.js",
	"bin-debug/TaskService/TaskConditionContext.js",
	"bin-debug/TaskService/TaskPanel.js",
	"bin-debug/TaskService/TaskService.js",
	"bin-debug/TaskService/TaskStatus.js",
	"bin-debug/TileMap/Astar.js",
	"bin-debug/TileMap/Grid.js",
	"bin-debug/TileMap/Nodes.js",
	"bin-debug/UserPanel/Hero.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1000,
		contentHeight: 1000,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};