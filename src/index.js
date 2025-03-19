import "./style.css";
// import { TaskItem } from "../models/TaskItem.js";
// import { TaskList } from "../models/TaskList.js";
// import { Project } from "../models/Project.js";
import { createProject, viewAllProjects } from "./controllers/projectController.js";
import { createTaskList } from "./controllers/taskListController.js";
import { createTaskItem } from "./controllers/taskItemController.js";

// const testProject = new Project("Project 1", "Project description", "3/10/2025", "High");
// const testList = new TaskList("Task 1", testProject.id);
// const todo1 = new TaskItem("Item 1", "Test description", "3/05/2025", "Medium");
// const todo2 = new TaskItem("Item 2", "Another test description", "3/06/2025", "Low");

// testList.addTaskItem(todo1);
// testList.addTaskItem(todo2);

// testProject.addTaskList(testList);

// projectStorage.push(testProject);

// //console logs show objects as they exist at the moment you expand them, not necessarily when they were logged
// //parse/stringify forces the console to log the current state of the object at that moment, rather than a reference that updates dynamically.
// console.log("Project Group:", JSON.parse(JSON.stringify(projectStorage)));
// console.log("Task List Found:", testProject.getTaskListById);
// console.log("Task Found:", testList.getTaskItemById("Item 1"));

// testList.removeTaskItem("Item 2");
// console.log("After Removing Task 2:", testList.taskListArray);

const project1 = createProject("Project 1", "Project description", "3/10/2025", "High");
const tasklist1 = createTaskList("Task 1", project1.id);
const taskItem1 = createTaskItem("Item 1", "Test description", "3/05/2025", "Medium", "no notes", tasklist1.id);

viewAllProjects();
