export class TaskList {
    constructor(id, projectId) {
        this.id = id;
        this.projectId = projectId;
        this.taskListArray = [];
    }

    addTaskItem(taskItem) {
        this.taskListArray.push(taskItem);
    }
    
}