import { createProject, viewAllProjects } from "../controllers/projectController.js";
import { projectStorage } from "../models/projectStorage.js";
import { createProjectCard } from "./cardGenerator.js";
import { createTaskItem } from "../controllers/taskItemController.js";

export function projectFormSubmission(event) {
    // prevent page reload on submit
    event.preventDefault();

    const addProjectDialog = document.querySelector("#addProjectDialog"); 
    const addProjectForm = addProjectDialog.querySelector("#addProjectForm");
    const formData = new FormData(addProjectForm);

    // run form validation before proceeding
    // if any input is empty, form.checkValidity() will return false, !false = true and thus the code block will execute
    if (!addProjectForm.checkValidity()) {
        // trigger browser's validation messages
        addProjectForm.reportValidity();
        // stop execution if any field is empty
        return;
    }

    // use FormData instead of querySelector to extract values
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    const priority = formData.get("priority");

    createProject(title, description, dueDate, priority);
    viewAllProjects();
    // view table of all current project data stored
    console.table(projectStorage);

    // generate a UI card
    createProjectCard(title, description, dueDate, priority);
    
    addProjectDialog.close();
}

export function taskFormSubmission(event) {
    event.preventDefault();

    const addTaskDialog = document.querySelector("#addTaskDialog");
    const addTaskForm = document.querySelector("#addTaskForm");
    const formData = new FormData(addTaskForm);

    if (!addTaskForm.checkValidity()) {
        addTaskForm.reportValidity();
        return;
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    const priority = formData.get("priority");
    const notes = formData.get("notes");
    const taskListId = document.querySelector("#taskListSelection").value;

    // generate a task item
    createTaskItem(title, description, dueDate, priority, notes, taskListId);

    addTaskDialog.close();
}