interface TaskCondition {
    onAccept(task: TaskConditionContext);
    onDuring(task: TaskConditionContext);
    onSubmit(task: TaskConditionContext);
    
}