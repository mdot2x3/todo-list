import { TaskList } from "../models/TaskList.js";
import { addTaskListToProject } from "./projectController.js";
import { projectStorage } from "../models/projectStorage.js";

export function createTaskList(title, projectId) {
    const newTaskList = new TaskList(title, projectId);
    addTaskListToProject(projectId, newTaskList);
    return newTaskList;
}

export function addTaskItemToTaskList(taskListId, taskItem) {
    for (const project of projectStorage) {
        // utilize Project class method
        const taskList = project.getTaskListById(taskListId);
        
        if (taskList) {
            // utilize TaskList class method
            taskList.addTaskItem(taskItem);
            console.log(`Task Item "${taskItem.title}" added to Task List: "${taskList.title}".`);
            return;
        }
    }
    // else
    console.log(`Task List with ID ${taskListId} not found.`);
}