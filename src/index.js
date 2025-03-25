import "./style.css";
import "./views/appUI.js";
import { createProject, deleteProject, removeTaskListFromProject, viewAllProjects } from "./controllers/projectController.js";
import { createTaskList, removeTaskItemFromTaskList } from "./controllers/taskListController.js";
import { createTaskItem } from "./controllers/taskItemController.js";

// test data
const project1 = createProject("Project 1", "Project description", "3/10/2025", "High");
const project2 = createProject("Project 2", "Project description", "3/11/2025", "Medium");
const project3 = createProject("Project 3", "Project description", "3/12/2025", "Low");
const tasklist1 = createTaskList("Task List 1", project1.id);
const tasklist2 = createTaskList("Task List 2", project1.id);
const taskitem1 = createTaskItem("Task Item 1", "Test description", "3/05/2025", "Medium", "no notes", tasklist1.id);
const taskitem2 = createTaskItem("Task Item 2", "Test description", "3/06/2025", "High", "no notes", tasklist1.id);
const taskitem3 = createTaskItem("Task Item 1A", "Test description", "3/07/2025", "Low", "no notes", tasklist2.id);

removeTaskItemFromTaskList(tasklist1.id, taskitem2.id);
removeTaskListFromProject(tasklist2);

deleteProject(project2.id);

viewAllProjects();