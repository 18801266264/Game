var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var scene = new GameScene();
        this.addChild(scene);
        var grid = new Grid(10, 10, scene);
        var astar = new Astar(grid);
        var standdata = RES.getRes("PLAYER_STAND_json");
        var standtxtr = RES.getRes("PLAYER_STAND_png");
        var stand_mcFactory = new egret.MovieClipDataFactory(standdata, standtxtr);
        var playerstand_mc = new egret.MovieClip(stand_mcFactory.generateMovieClipData("1"));
        var movedata = RES.getRes("PLAYER_MOVE_json");
        var movetxtr = RES.getRes("PLAYER_MOVE_png");
        var move_mcFactory = new egret.MovieClipDataFactory(movedata, movetxtr);
        var playermove_mc = new egret.MovieClip(move_mcFactory.generateMovieClipData("2"));
        var PlayerContainer = new egret.DisplayObjectContainer();
        //  this.addChild(PlayerContainer);
        PlayerContainer.addChild(playerstand_mc);
        PlayerContainer.addChild(playermove_mc);
        playermove_mc.gotoAndPlay(1, -1);
        playerstand_mc.gotoAndPlay(1, -1);
        playerstand_mc.alpha = 0;
        playermove_mc.alpha = 0;
        var m = new StateMachine(scene, playerstand_mc, playermove_mc, PlayerContainer);
        scene.addChild(PlayerContainer);
        GameScene.replaceScene(scene);
        scene.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (true) {
                var list = new CommandList();
                list.addCommand(new WalkCommand(e.stageX / grid.Size, e.stageY / grid.Size, m, PlayerContainer, grid));
                list.execute();
            }
        }, this);
        /*
                var timeInterval = 100;
                var grid = new Grid(10, 10, this);
        
                var standdata = RES.getRes("PLAYER_STAND_json");
                var standtxtr = RES.getRes("PLAYER_STAND_png");
                var stand_mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(standdata, standtxtr);
                var playerstand_mc: egret.MovieClip = new egret.MovieClip(stand_mcFactory.generateMovieClipData("1"));
        
                var movedata = RES.getRes("PLAYER_MOVE_json");
                var movetxtr = RES.getRes("PLAYER_MOVE_png");
                var move_mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(movedata, movetxtr);
                var playermove_mc: egret.MovieClip = new egret.MovieClip(move_mcFactory.generateMovieClipData("2"));
        
                var PlayerContainer = new egret.DisplayObjectContainer();
                this.addChild(PlayerContainer);
                PlayerContainer.addChild(playerstand_mc);
                PlayerContainer.addChild(playermove_mc);
                playermove_mc.gotoAndPlay(1, -1);
                playerstand_mc.gotoAndPlay(1, -1);
                playerstand_mc.alpha = 0;
                playermove_mc.alpha = 0;
        
                var m: StateMachine = new StateMachine(this, playerstand_mc, playermove_mc, PlayerContainer);
        
                var interval;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
        
                    m.setState("move");
        
                    clearInterval(interval);
        
                    var astar: Astar = new Astar(grid);
        
                    var endXpos = Math.floor(e.stageX / grid.Size);
                    var endYpos = Math.floor(e.stageY / grid.Size);
                    var startXpos = Math.floor(PlayerContainer.x / grid.Size);
                    var startYpos = Math.floor(PlayerContainer.y / grid.Size);
        
                    if (astar.findPath(grid.getNode(startXpos, startYpos), grid.getNode(endXpos, endYpos))) { //传入起点和终点
                        astar._path.map((tile) => {
                            console.log(`x:${tile.x},y:${tile.y}`)
                        });
                    }
        
                    var maxLength = astar._path.length;
                    var i = 0;
        
                    astar._path.shift();
                    interval = setInterval(() => {
        
                        var pos = astar._path.shift();
                        //  PlayerContainer.x = pos.x * grid.Size;
                        //  PlayerContainer.y = pos.y * grid.Size;
        
                        egret.Tween.get(PlayerContainer).to({ x: pos.x * grid.Size, y: pos.y * grid.Size }, timeInterval, egret.Ease.sineInOut);
        
                        i++;
                        if (i == maxLength - 1) {
                            clearInterval(interval);
        
                        }
        
                    }, timeInterval)
        
                    var timer = new egret.Timer(maxLength * timeInterval, 0);
                    timer.addEventListener(egret.TimerEvent.TIMER, () => {
                        m.setState("stand");
                        timer.stop();
                    }, this);
                    timer.start();
        
                }, this);
        */
        //TaskService
        var taskScene = new egret.DisplayObjectContainer();
        this.addChild(taskScene);
        var taskService = TaskService.getInstance();
        var sceneService = SceneService.getInstance();
        var emoji_1 = this.createBitmapByName("emoji_1_png");
        var emoji_2 = this.createBitmapByName("emoji_2_png");
        var emoji_3 = this.createBitmapByName("emoji_1_png");
        var picture_1 = this.createBitmapByName("npc1_png");
        var picture_2 = this.createBitmapByName("npc2_png");
        var picture_3 = this.createBitmapByName("npc3_png");
        var mockKillMonsterButton = new MockKillMonsterButton(m, PlayerContainer, grid);
        taskScene.addChild(mockKillMonsterButton);
        mockKillMonsterButton.x = 600;
        mockKillMonsterButton.y = 550;
        var dialoguePanel = new DialoguePanel();
        taskScene.addChild(dialoguePanel);
        var NPC_1 = new NPC(picture_1, emoji_1, "npc_0", dialoguePanel, mockKillMonsterButton, m, PlayerContainer, grid);
        NPC_1.x = 400;
        NPC_1.y = 500;
        taskScene.addChild(NPC_1);
        var NPC_2 = new NPC(picture_2, emoji_2, "npc_1", dialoguePanel, mockKillMonsterButton, m, PlayerContainer, grid);
        NPC_2.x = 900;
        NPC_2.y = 800;
        taskScene.addChild(NPC_2);
        var NPC_3 = new NPC(picture_3, emoji_3, "npc_2", dialoguePanel, mockKillMonsterButton, m, PlayerContainer, grid);
        NPC_3.x = 600;
        NPC_3.y = 200;
        taskScene.addChild(NPC_3);
        var npcTalkTaskCondition = new NpcTalkTaskCondition();
        var killMonsterTaskCondition = new KillMonsterTaskCondition();
        var task = new Task("1", "task1", TaskStatus.ACCEPTABLE, -1, 0, npcTalkTaskCondition);
        var taskPanel = new TaskPanel();
        taskScene.addChild(taskPanel);
        var task2 = new Task("2", "task2", TaskStatus.ACCEPTABLE, -1, 5, killMonsterTaskCondition);
        taskService.observerList.push(NPC_1);
        taskService.observerList.push(NPC_2);
        taskService.observerList.push(taskPanel);
        taskService.taskList.push(task);
        sceneService.observerList.push(killMonsterTaskCondition);
        sceneService.observerList.push(NPC_3);
        sceneService.taskList.push(task2);
        taskService.notify();
        sceneService.notify();
        //UserPanel
        var eightGod = this.createBitmapByName("eightGod_jpg");
        //  this.addChild(captain);
        var timg = this.createBitmapByName("timg_jpg");
        timg.y = 230;
        // this.addChild(timg);
        var jewels = [];
        var jewel1 = new Jewel(1, 2.8);
        jewels.push(jewel1);
        var equipments = [];
        var equipment1 = new Equipment(1, Rare.传说, jewels);
        equipments.push(equipment1);
        var heroes = [];
        var hero1 = new Hero(true, 50, 1, Rare.传说, equipments);
        //  hero1.properties.all.push(property);
        heroes.push(hero1);
        var panel = new Panel(heroes);
        //  this.addChild(panel);
        var user = new User(100, 100, 50, 100, 1, heroes);
        console.log(user.fightPower);
        var userPanelButton = new egret.TextField();
        userPanelButton.touchEnabled = true;
        this.addChild(userPanelButton);
        userPanelButton.$setText("属性面板");
        userPanelButton.textColor = 0xffffff;
        userPanelButton.x = 500;
        userPanelButton.y = 950;
        userPanelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (userPanel.alpha == 0) {
                userPanel.alpha = 1;
            }
            else {
                userPanel.alpha = 0;
            }
        }, this);
        var userPanel = new egret.DisplayObjectContainer();
        userPanel.alpha = 0;
        var background = this.createBitmapByName("userPanel_jpg");
        userPanel.addChild(background);
        userPanel.addChild(panel);
        userPanel.addChild(eightGod);
        userPanel.addChild(timg);
        this.addChild(userPanel);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map