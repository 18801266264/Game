class SceneService extends EventEmitter{
    private static instance;
    private static count = 0;

    constructor() {
        super();
        SceneService.count++;
        if (SceneService.count > 1) {
            throw 'singleton!';
        }
    }

    public static getInstance() {
        if (SceneService.instance == null) {
            SceneService.instance = new SceneService();
        }
        return SceneService.instance;
    }

    public accept(id: string): void {

        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.DURING;
            }
        }
        this.notify();

    }

    public during(id: string):void{

    }

    public finish(id: string): ErrorCode {

        if (!id) {
            return ErrorCode.TASK_MISSING;
        }

        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.SUBMITTED;
            }
        }

        this.notify();
        return ErrorCode.SUCCEED;
    }



}