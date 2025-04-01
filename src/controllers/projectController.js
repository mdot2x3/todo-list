import { Project } from "../models/Project.js";
import { projectStorage } from "../models/projectStorage.js";

export function createProject(title, description, dueDate, priority) {
    const newProject = new Project(title, description, dueDate, priority);
    projectStorage.push(newProject);
    console.log(`Project "${title}" created.`);
    return newProject;
}

export function addTaskListToProject(projectId, taskList) {
    const project = projectStorage.find((arrayElement) => arrayElement.id === projectId);
    if (project) {
        // utilize Project class method
        project.addTaskList(taskList);
        console.log(`Task List "${taskList.title}" added to Project: "${project.title}".`);
    } else {
        console.log(`Project with ID ${projectId} not found.`);
    }
}

export function removeTaskListFromProject(taskList) {
    // .some() is an array method that checks if at least one element in the array meets the provided condition, returns true/false
    // .find()+.some() iterates over each taskList inside each project's projectArrayOfTaskLists, checks if any TaskList has an id
    // matching taskListId, and if so, returns that project object
    const project = projectStorage.find((arrayElement) => arrayElement.projectArrayOfTaskLists.some((arrayElementTaskList) => arrayElementTaskList.id === taskList.id));
    if (project) {
        // utilize Project class method
        project.removeTaskList(taskList.id);
        console.log(`Task List "${taskList.title}" removed from Project: "${project.title}".`);
    } else {
        console.log(`Task List with ID "${taskList.id}" not found.`);
    }
}

export function addTaskItemToProject(projectId, taskItem) {
    const project = projectStorage.find(arrayElement => arrayElement.id === projectId);
    if (project) {
        project.addTaskItem(taskItem);
        console.log(`Task Item "${taskItem.title}" added to Project: "${project.title}".`);
    } else {
        console.log(`Project with ID ${projectId} not found.`);
    }
}

export function removeTaskItemFromProject(projectId, taskItemId) {
    const project = projectStorage.find(arrayElement => arrayElement.id === projectId);
    if (project) {
        project.removeTaskItem(taskItemId);
        console.log(`Task Item with ID "${taskItemId}" removed from Project: "${project.title}".`);
    } else {
        console.log(`Project with ID ${projectId} not found.`);
    }
}

export function viewAllProjects() {
    projectStorage.forEach((arrayElementProject) => {
        
        // show the project
        console.log(`Project: ${arrayElementProject.title}`);

         // show unassigned task items (not inside a TaskList)
        if (arrayElementProject.projectArrayOfTaskItems.length > 0) {
            console.log("   Unassigned Tasks:");
            arrayElementProject.projectArrayOfTaskItems.forEach((arrayElementTaskItem) => {
                console.log(`       Task: ${arrayElementTaskItem.title} | Due: ${arrayElementTaskItem.dueDate}`);
            });
        }

        // show task lists and their task items
        arrayElementProject.projectArrayOfTaskLists.forEach((arrayElementTaskList) => {
            console.log(`   Task List: ${arrayElementTaskList.title}`);

            arrayElementTaskList.taskListArrayOfTaskItems.forEach((arrayElementTaskItem) => {
                console.log(`       Task: ${arrayElementTaskItem.title} | Due: ${arrayElementTaskItem.dueDate}`);
            });
        });

    });
}

export function deleteProject(productId) {
    const project = projectStorage.find(arrayElement => arrayElement.id === productId);
    if (project) {
        project.removeProject();
    } else {
        console.log(`Project with ID "${projectId}" not found.`);
    }
}