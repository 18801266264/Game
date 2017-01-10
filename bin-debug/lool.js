//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var look = (function (_super) {
    __extends(look, _super);
    function look() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=look,p=c.prototype;
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
        /*
                var taskService: TaskService = TaskService.getInstance();
                var sceneService: SceneService = SceneService.getInstance();
        
                var emoji_1: egret.Bitmap = this.createBitmapByName("emoji_1_png");
                var emoji_2: egret.Bitmap = this.createBitmapByName("emoji_2_png");
                var emoji_3: egret.Bitmap = this.createBitmapByName("emoji_1_png");
                var picture_1: egret.Bitmap = this.createBitmapByName("egret_icon_png");
                var picture_2: egret.Bitmap = this.createBitmapByName("egret_icon_png");
                var picture_3: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        
                var mockKillMonsterButton = new MockKillMonsterButton();
                this.addChild(mockKillMonsterButton);
                mockKillMonsterButton.x = 450;
                mockKillMonsterButton.y = 320;
        
                var dialoguePanel = new DialoguePanel();
                this.addChild(dialoguePanel);
        
                var NPC_1: NPC = new NPC(picture_1, emoji_1, "npc_0", dialoguePanel, mockKillMonsterButton);
                NPC_1.x = 100;
                NPC_1.y = 100;
                this.addChild(NPC_1);
        
                var NPC_2: NPC = new NPC(picture_2, emoji_2, "npc_1", dialoguePanel, mockKillMonsterButton);
                NPC_2.x = 500;
                NPC_2.y = 500;
                this.addChild(NPC_2);
        
                var NPC_3: NPC = new NPC(picture_3, emoji_3, "npc_2", dialoguePanel, mockKillMonsterButton);
                NPC_3.x = 500;
                NPC_3.y = 100;
                this.addChild(NPC_3);
        
                var npcTalkTaskCondition = new NpcTalkTaskCondition();
                var killMonsterTaskCondition = new KillMonsterTaskCondition();
        
                var task: Task = new Task("1", "task1", TaskStatus.ACCEPTABLE, -1, 0, npcTalkTaskCondition);
                var taskPanel = new TaskPanel();
                this.addChild(taskPanel);
        
                var task2: Task = new Task("2", "task2", TaskStatus.ACCEPTABLE, -1, 5, killMonsterTaskCondition);
        
                taskService.observerList.push(NPC_1);
                taskService.observerList.push(NPC_2);
                taskService.observerList.push(taskPanel);
                taskService.taskList.push(task);
        
                sceneService.observerList.push(killMonsterTaskCondition);
                sceneService.observerList.push(NPC_3);
                sceneService.taskList.push(task2);
        
                taskService.notify();
                sceneService.notify();*/
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return look;
}(egret.DisplayObjectContainer));
egret.registerClass(look,'look');
//# sourceMappingURL=lool.js.map