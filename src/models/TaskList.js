export class TaskList {
    constructor(title, projectId) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.projectId = projectId;
        this.taskListArrayOfTaskItems = [];
    }

    addTaskItem(taskItem) {
        this.taskListArrayOfTaskItems.push(taskItem);
    }

    removeTaskItem(taskItemId) {
        this.taskListArrayOfTaskItems = this.taskListArrayOfTaskItems.filter(arrayElement => arrayElement.id !== taskItemId);
    }

    getTaskItemById(taskItemId) {
        return this.taskListArrayOfTaskItems.find(arrayElement => arrayElement.id === taskItemId);
    }
}