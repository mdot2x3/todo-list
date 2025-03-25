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

export function removeTaskItemFromTaskList(taskListId, taskItemId) {
    for (const project of projectStorage) {
        const taskList = project.projectArrayOfTaskLists.find((arrayElement) => arrayElement.id === taskListId);
        if (taskList) {
            const taskItem = taskList.taskListArrayOfTaskItems.find((arrayElementTaskItem) => arrayElementTaskItem.id === taskItemId);
            if (taskItem) {
                // utilize TaskList class method
                taskList.removeTaskItem(taskItemId);
                console.log(`Task Item with ID "${taskItemId}" removed from Task List: "${taskList.title}".`);
            } else {
                console.log(`Task Item with ID "${taskItemId}" not found in Task List "${taskList.title}".`);
            }
            return;
        }
    }
    // else
    console.log(`Task List with ID ${taskListId} not found.`);
}