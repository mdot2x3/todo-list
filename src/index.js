import "./style.css";
import "./views/appUI.js";
import { createProject, deleteProject, removeTaskListFromProject, removeTaskItemFromProject, viewAllProjects } from "./controllers/projectController.js";
import { createTaskList, removeTaskItemFromTaskList } from "./controllers/taskListController.js";
import { createTaskItem } from "./controllers/taskItemController.js";
import { createProjectCard } from "./views/cardGenerator.js";

/*
// backend functionality - test data 1
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
*/

/*
// backend functionality - test data 2

// Step 1: Create Projects
const project1 = createProject("Project Alpha", "First project", "4/10/2025", "High");
const project2 = createProject("Project Beta", "Second project", "4/11/2025", "Medium");

// Step 2: Create Task Lists inside project1
const tasklist1 = createTaskList("Task List A", project1.id);
const tasklist2 = createTaskList("Task List B", project1.id);

// Step 3: Add Task Items to a Task List
const taskitem1 = createTaskItem("Task A1", "Task inside list", "4/05/2025", "Medium", "no notes", project1.id, tasklist1.id);
const taskitem2 = createTaskItem("Task A2", "Task inside list", "4/06/2025", "High", "no notes", project1.id, tasklist1.id);

// Step 4: Add Task Item directly inside Project (not inside Task List)
const taskitem3 = createTaskItem("Standalone Task", "Task without a list", "4/07/2025", "Low", "no notes", project1.id);

// Step 5: Remove a Task Item from a Task List
removeTaskItemFromTaskList(tasklist1.id, taskitem1.id);

// Step 6: Remove a Task Item directly from a Project
removeTaskItemFromProject(project1.id, taskitem3.id);

// Step 7: Remove a Task List from a Project
removeTaskListFromProject(tasklist2);

// Step 8: Delete an entire Project
deleteProject(project2.id);

// Step 9: View All Projects
viewAllProjects();
*/

createProjectCard("title1", "description", "dueDate", "priority", 1);
createProjectCard("title2", "description", "dueDate", "priority", 2);
createProjectCard("title33333333333333333333333333333333", "descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", "dueDate", "priority", 3);
createProjectCard("title4", "description", "dueDate", "priority", 4);
createProjectCard("title5", "description", "dueDate", "priority", 5);
createProjectCard("title6666666666666666666666666666", "descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", "dueDate", "priority", 6);