import { TaskItem } from "../models/TaskItem";
import { addTaskItemToTaskList } from "./taskListController.js";
import { addTaskItemToProject } from "./projectController.js";

export function createTaskItem(title, description, dueDate, priority, notes, projectId, taskListId = null) {
    const newTaskItem = new TaskItem(title, description, dueDate, priority, notes, taskListId);
    // if a taskListId is provided, add to the TaskList, else add directly to the Project.
    if (taskListId) {
        addTaskItemToTaskList(taskListId, newTaskItem);
    } else {
        addTaskItemToProject(projectId, newTaskItem);
    }

    return newTaskItem;
}