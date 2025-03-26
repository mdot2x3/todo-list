import { createProject, viewAllProjects } from "../controllers/projectController.js";
import { projectStorage } from "../models/projectStorage.js";

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
    
    addProjectDialog.close();
}