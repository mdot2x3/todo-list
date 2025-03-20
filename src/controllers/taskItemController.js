import { TaskItem } from "../models/TaskItem";
import { addTaskItemToTaskList } from "./taskListController.js";

export function createTaskItem(title, description, dueDate, priority, notes, taskListId) {
    const newTaskItem = new TaskItem(title, description, dueDate, priority, notes);
    addTaskItemToTaskList(taskListId, newTaskItem);
    return newTaskItem;
}