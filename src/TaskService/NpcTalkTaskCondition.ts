class NpcTalkTaskCondition implements TaskCondition {
    onAccept(task: TaskConditionContext) {
        task.current++;
        task.checkStatus();

    }
    onDuring(task: TaskConditionContext) {

    }
    onSubmit(task: TaskConditionContext) {

    }

}