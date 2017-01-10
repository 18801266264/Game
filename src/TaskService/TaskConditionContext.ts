interface TaskConditionContext {
    current: number;

    getcurrent(): number
    setcurrent(current: number): void
    checkStatus();
}

