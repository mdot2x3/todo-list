import "./style.css";
import { TaskItem } from "./TaskItem.js";
import { TaskList } from "./TaskList.js";
import { Project } from "./Project.js";

let projectGroup = [];

// const testProject = new Project("Project 1", "Project description", "3/10/2025", "High");
// const testList = new TaskList("Task 1", testProject.id);
// const todo1 = new TaskItem("Item 1", "Test description", "3/05/2025", "Medium");
// const todo2 = new TaskItem("Item 2", "Another test description", "3/06/2025", "Low");

// testList.addTaskItem(todo1);
// testList.addTaskItem(todo2);

// testProject.addTaskList(testList);

// projectGroup.push(testProject);

// //console logs show objects as they exist at the moment you expand them, not necessarily when they were logged
// //parse/stringify forces the console to log the current state of the object at that moment, rather than a reference that updates dynamically.
// console.log("Project Group:", JSON.parse(JSON.stringify(projectGroup)));
// console.log("Task List Found:", testProject.getTaskListById);
// console.log("Task Found:", testList.getTaskItemById("Item 1"));

// testList.removeTaskItem("Item 2");
// console.log("After Removing Task 2:", testList.taskListArray);

function createProject(title, description, dueDate, priority) {
    const newProject = new Project(title, description, dueDate, priority);
    projectGroup.push(newProject);
    console.log(`Project "${title}" created.`);
    return newProject;
}

function createTaskList(title, projectId) {
    const newTaskList = new TaskList(title, projectId);
    addTaskListToProject(projectId, newTaskList);
    return newTaskList;
}

function createTaskItem(title, description, dueDate, priority, notes, taskListId) {
    const newTaskItem = new TaskItem(title, description, dueDate, priority, notes, taskListId);
    addTaskItemToTaskList(taskListId, newTaskItem);
}

function addTaskListToProject(projectId, taskList) {
    const project = projectGroup.find((arrayElement) => arrayElement.id === projectId);
    if (project) {
        project.addTaskList(taskList);
        console.log(`Task List "${taskList.title}" added to Project: "${project.title}".`);
    } else {
        console.log(`Project with ID ${projectId} not found.`);
    }
}

function addTaskItemToTaskList(taskListId, taskItem) {
    let taskListFound = false;

    for (const project of projectGroup) {
        const taskList = project.projectArrayOfTaskLists.find((arrayElement) => arrayElement.id === taskListId);
        
        if (taskList) {
            taskList.addTaskItem(taskItem);
            console.log(`Task Item "${taskItem.title}" added to Task List: "${taskList.title}".`);
            taskListFound = true;
            break;
        }
    }

    if (!taskListFound) {
        console.log(`Task List with ID ${taskListId} not found.`);
    }
}

function viewAllProjects() {
    projectGroup.forEach((arrayElementProject) => {
        console.log(`Project: ${arrayElementProject.title}`);
        arrayElementProject.projectArrayOfTaskLists.forEach((arrayElementTaskList) => {
            console.log(`   Task List: ${arrayElementTaskList.title}`);
            arrayElementTaskList.taskListArrayOfTaskItems.forEach((arrayElementTaskItem) => {
                console.log(`       Task: ${arrayElementTaskItem.title} | Due: ${arrayElementTaskItem.dueDate}`);
            });
        });
    });
}

const project1 = createProject("Project 1", "Project description", "3/10/2025", "High");
const tasklist1 = createTaskList("Task 1", project1.id);
createTaskItem("Item 1", "Test description", "3/05/2025", "Medium", "no notes", tasklist1?.id);
viewAllProjects();
