// taskScheduler.ts

interface Task {
    id: string;
    name: string;
    execute: () => Promise<void>;
    interval: number; // Interval in milliseconds
}

class TaskScheduler {
    private tasks: Task[] = [];
    private taskIntervals: Map<string, NodeJS.Timeout> = new Map();

    // Add a new task to the scheduler
    addTask(task: Task): void {
        if (this.taskIntervals.has(task.id)) {
            console.log(`Task with ID ${task.id} already exists.`);
            return;
        }

        this.tasks.push(task);
        const intervalId = setInterval(async () => {
            console.log(`Executing task: ${task.name}`);
            try {
                await task.execute();
            } catch (error) {
                console.error(`Error executing task ${task.name}:`, error);
            }
        }, task.interval);

        this.taskIntervals.set(task.id, intervalId);
        console.log(`Task ${task.name} added with ID ${task.id}.`);
    }

    // Remove a task from the scheduler
    removeTask(taskId: string): void {
        const intervalId = this.taskIntervals.get(taskId);
        if (!intervalId) {
            console.log(`No task found with ID ${taskId}.`);
            return;
        }

        clearInterval(intervalId);
        this.taskIntervals.delete(taskId);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);

        console.log(`Task with ID ${taskId} has been removed.`);
    }

    // List all scheduled tasks
    listTasks(): void {
        if (this.tasks.length === 0) {
            console.log('No tasks are currently scheduled.');
            return;
        }

        console.log('Scheduled tasks:');
        this.tasks.forEach((task) => {
            console.log(`- [${task.id}] ${task.name} (Interval: ${task.interval}ms)`);
        });
    }

    // Clear all tasks from the scheduler
    clearAllTasks(): void {
        this.taskIntervals.forEach((intervalId, taskId) => {
            clearInterval(intervalId);
            console.log(`Task with ID ${taskId} has been cleared.`);
        });

        this.taskIntervals.clear();
        this.tasks = [];
        console.log('All tasks have been cleared.');
    }
}

export default TaskScheduler;
