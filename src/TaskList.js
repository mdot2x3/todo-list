export class TaskList {
    constructor(id, title, projectId) {
        this.id = id;
        this.title = title;
        this.projectId = projectId;
        this.taskListArray = [];
    }

    addTaskItem(taskItem) {
        this.taskListArray.push(taskItem);
    }

    removeTaskItem(taskItemTitle) {
        this.taskListArray = this.taskListArray.filter(arrayElement => arrayElement.title !== taskItemId);
    }

    getTaskItemById(taskItemTitle) {
        return this.taskListArray.find(arrayElement => arrayElement.title === taskItemId);
    }
}