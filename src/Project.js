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

    removeTaskList(taskListId) {
        //filter creates a new array (set to overwrite the prior one in this case),
        //and is filled with elements that pass the test provided by the function
        this.projectArray = this.projectArray.filter(arrayElement => arrayElement.id !== taskListId);
    }

    getTaskListById(taskListId) {
        return this.projectArray.find(arrayElement => arrayElement.id === taskListId);
    }
}