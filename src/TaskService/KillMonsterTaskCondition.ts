class KillMonsterTaskCondition implements TaskCondition, Observer {
    onAccept(task: TaskConditionContext) {
        task.current++;
        task.checkStatus();

    }

    onDuring(task: TaskConditionContext) {
        task.current++;
        task.checkStatus();
    }

    onSubmit() {

    }

    public onChange(task: Task) {
        if (task.getcurrent() == -1) {
            this.onAccept(task);
        }
        if (task.getcurrent() == 0) {
            this.onDuring(task);
        }

    }
}