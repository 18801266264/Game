var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(picture, emoji, id, dialoguePanel, mockKillMonsterButton, m, PlayerContainer, grid) {
        var _this = this;
        _super.call(this);
        this.touchEnabled = true;
        this.dialoguePanel = dialoguePanel;
        this.mockKillMonsterButton = mockKillMonsterButton;
        this.picture = picture;
        this.emoji = emoji;
        this.emoji.alpha = 0;
        this.picture.y = 100;
        this.id = id;
        this.addChild(this.picture);
        this.addChild(this.emoji);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var list = new CommandList();
            list.addCommand(new WalkCommand(e.stageX / grid.Size, e.stageY / grid.Size, m, PlayerContainer, grid));
            list.addCommand(new TalkCommand(_this));
            list.execute();
        }, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onNPCClick = function (callback) {
        var task;
        if (this.id == "npc_0" || this.id == "npc_1") {
            this.dialoguePanel.alpha = 1;
            this.dialoguePanel.touchEnabled = true;
            var taskService = TaskService.getInstance();
            this.dialoguePanel.task = taskService.getTaskByCustomRole(this.rule);
        }
        else if (this.id == "npc_2") {
            var sceneService = SceneService.getInstance();
            this.mockKillMonsterButton.task = sceneService.getTaskByCustomRole(this.rule);
            this.mockKillMonsterButton.button.touchEnabled = true;
        }
        this.emoji.alpha = 0;
        callback();
    };
    p.onChange = function (task) {
        if (task.total == 0) {
            if (task.status == TaskStatus.ACCEPTABLE) {
                if (this.id == "npc_0") {
                    this.emoji.alpha = 1;
                }
                if (this.id == "npc_1") {
                    this.emoji.alpha = 0;
                    this.touchEnabled = false;
                }
                this.dialoguePanel.getTextField().$setText("请点击另一个NPC");
            }
            else if (task.status == TaskStatus.DURING) {
                if (this.id == "npc_0") {
                    this.emoji.alpha = 0;
                    this.touchEnabled = false;
                }
                if (this.id == "npc_1") {
                    this.emoji.alpha = 1;
                    this.touchEnabled = true;
                }
                this.dialoguePanel.getTextField().$setText("任务完成");
            }
            else if (task.status == TaskStatus.SUBMITTED) {
                this.emoji.alpha = 0;
                this.touchEnabled = false;
            }
        }
        if (task.total == 5) {
            if (task.status == TaskStatus.ACCEPTABLE) {
                if (this.id == "npc_2") {
                    this.emoji.alpha = 1;
                }
            }
            else if (task.status == TaskStatus.DURING) {
                if (this.id == "npc_2") {
                    this.emoji.alpha = 0;
                }
            }
            else if (task.status == TaskStatus.SUBMITTED) {
                if (this.id == "npc_2") {
                    this.emoji.alpha = 1;
                }
            }
        }
    };
    p.rule = function (taskList) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.CAN_SUBMIT || taskList[i].status == TaskStatus.SUBMITTED) {
                return taskList[i];
            }
        }
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map