class EventEmitter {

    public observerList: Observer[] = [];
    public taskList: Task[] = [];
    
    public getTaskByCustomRole(rule: Function): Task {
        return rule(this.taskList);
    }

    public notify(): void {

        for (var i = 0; i < this.taskList.length; i++) {
            for (var observer of this.observerList) {
                observer.onChange(this.taskList[i]);
            }
        }
    }
}