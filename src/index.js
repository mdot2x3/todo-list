import "./style.css";
import { TaskItem } from "./TaskItem.js";
import { TaskList } from "./TaskList.js";
import { Project } from "./Project.js";

let projectGroup = [];

const testProject = new Project(1001, "Project 1", "Project description", "3/10/2025", "High");
const testList = new TaskList("Task 1", testProject.id);
const todo1 = new TaskItem("Item 1", "Test description", "3/05/2025", "Medium");
const todo2 = new TaskItem("Item 2", "Another test description", "3/06/2025", "Low");

testList.addTaskItem(todo1);
testList.addTaskItem(todo2);

testProject.addTaskList(testList);

projectGroup.push(testProject);

//console logs show objects as they exist at the moment you expand them, not necessarily when they were logged
//parse/stringify forces the console to log the current state of the object at that moment, rather than a reference that updates dynamically.
console.log("Project Group:", JSON.parse(JSON.stringify(projectGroup)));
console.log("Task List Found:", testProject.getTaskListById);
console.log("Task Found:", testList.getTaskItemById("Item 1"));

testList.removeTaskItem("Item 2");
console.log("After Removing Task 2:", testList.taskListArray);