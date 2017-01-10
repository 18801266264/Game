class Task implements TaskConditionContext {
    public id: string;
    public name: string;
    public status: TaskStatus;
    public current: number = 0;
    public total: number = 100;
    private condition: TaskCondition;

    constructor(id: string, name: string, status: TaskStatus, current: number, total: number, condition: TaskCondition) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.current = current;
        this.total = total;
        this.condition = condition;

    }

    public onAccept(task: Task) {
        this.condition.onAccept(this);
    }

    public onDuring(task: Task){
        this.condition.onDuring(this);
    }

    public onSubmit() {

    }


    public checkStatus() {
        if (this.current > this.total) {
            console.warn();
        }
        if (this.status == TaskStatus.DURING &&
            this.current >= this.total) {

            this.status = TaskStatus.CAN_SUBMIT;
        }
    }

    public getcurrent(): number {
        return this.current;

    }

    public setcurrent(current: number): void {
        this.current = current;
    }
}





