import { createProject, viewAllProjects } from "../controllers/projectController.js";
import { projectStorage } from "../models/projectStorage.js";

export function projectFormSubmission(event, dialog) {
    // prevent page reload on submit
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;

    createProject(title, description, dueDate, priority);
    viewAllProjects();
    // view table of all current project data stored
    console.table(projectStorage);
    dialog.close();
}