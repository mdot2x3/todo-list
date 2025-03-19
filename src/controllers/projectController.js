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

export function viewAllProjects() {
    projectStorage.forEach((arrayElementProject) => {
        console.log(`Project: ${arrayElementProject.title}`);
        arrayElementProject.projectArrayOfTaskLists.forEach((arrayElementTaskList) => {
            console.log(`   Task List: ${arrayElementTaskList.title}`);
            arrayElementTaskList.taskListArrayOfTaskItems.forEach((arrayElementTaskItem) => {
                console.log(`       Task: ${arrayElementTaskItem.title} | Due: ${arrayElementTaskItem.dueDate}`);
            });
        });
    });
}