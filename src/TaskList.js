export class TaskList {
    constructor(title, projectId) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.projectId = projectId;
        this.taskListArray = [];
    }

    addTaskItem(taskItem) {
        this.taskListArray.push(taskItem);
    }

    removeTaskItem(taskItemId) {
        this.taskListArray = this.taskListArray.filter(arrayElement => arrayElement.title !== taskItemId);
    }

    getTaskItemById(taskItemId) {
        return this.taskListArray.find(arrayElement => arrayElement.title === taskItemId);
    }
}