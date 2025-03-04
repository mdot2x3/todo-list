import "./style.css";
import { TaskItem } from "./TaskItem.js";
import { TaskList } from "./TaskList.js";
import { Project } from "./Project.js";

const testProject = new Project(1001, "Project 1", "Project description", "3/10/2025", "High")
const testList = new TaskList(1, 1001);
const todo1 = new TaskItem("Task 1", "Test description", "3/05/2025", "Medium");
const todo2 = new TaskItem("Task 2", "Another test description", "3/06/2025", "Low");

testList.addTaskItem(todo1);
testList.addTaskItem(todo2);

testProject.addTaskList(testList);

console.log(testProject.projectArray);