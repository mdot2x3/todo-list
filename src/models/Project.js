export class Project {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectArrayOfTaskLists = [];
        this.projectArrayOfTaskItems = [];
    }

    addTaskList(taskList) {
        this.projectArrayOfTaskLists.push(taskList);
    }

    removeTaskList(taskListId) {
        // filter creates a new array (set to overwrite the prior one in this case),
        // and is filled with elements that pass the test provided by the function
        this.projectArrayOfTaskLists = this.projectArrayOfTaskLists.filter(arrayElement => arrayElement.id !== taskListId);
    }

    getTaskListById(taskListId) {
        return this.projectArrayOfTaskLists.find(arrayElement => arrayElement.id === taskListId);
    }

    addTaskItem(taskItem) {
        this.projectArrayOfTaskItems.push(taskItem);
    }

    removeTaskItem(taskItemId) {
        this.projectArrayOfTaskItems = this.projectArrayOfTaskItems.filter(arrayElement => arrayElement.id !== taskItemId);
    }

    getTaskItemById(taskItemId) {
        return this.projectArrayOfTaskItems.find(arrayElement => arrayElement.id === taskItemId);
    }
}