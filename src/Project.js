export class Project {
    constructor(id, title, description, dueDate, priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectArray = [];
    }

    addTaskList(taskList) {
        this.projectArray.push(taskList);
    }

}