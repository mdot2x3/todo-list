export class TaskItem {
    // set taskListId null to create a TaskItem without specifying taskListId upfront,
    // set notes to "" to allow the parameter field to be optional, if empty it will skip past it
    constructor(title, description, dueDate, priority, notes = "", taskListId = null) {
        //auto-generate unique id
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.taskListId = taskListId;
        this.checkbox = false;
    }

    toggleCheckbox() {
        //calling this will flip its boolean value
        this.checkbox = !this.checkbox;
    }
}