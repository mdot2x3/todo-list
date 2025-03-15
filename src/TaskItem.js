export class TaskItem {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkbox = false;
    }

    toggleCheckbox() {
        //calling this will flip its boolean value
        this.checkbox = !this.checkbox;
    }
}