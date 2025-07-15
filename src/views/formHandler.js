import { createProject, viewAllProjects } from "../controllers/projectController.js";
import { projectStorage } from "../models/projectStorage.js";
import { createProjectCard } from "./cardGenerator.js";
import { createTaskItem } from "../controllers/taskItemController.js";
import { addTaskToUI } from "./taskGenerator.js";
import { checkIfNoProjects } from "../index.js";

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

    // fix timezone offset to ensure date selected in modal matches card display
    const dueDateString = formData.get("dueDate");
    const dueDate = parseDateFromInput(dueDateString);
    function parseDateFromInput(inputDateString) {
        const [year, month, day] = inputDateString.split("-").map(Number);
        // month is 0-indexed
        return new Date(year, month - 1, day);
    }

    const priority = formData.get("priority");

    // correctly assigns newProject
    const newProject = createProject(title, description, dueDate, priority);
    // check that the project has an id
    console.log("Project Created:", newProject);

    viewAllProjects();
    // view table of all current project data stored
    console.table(projectStorage);

    // generate a UI card, collect project id from newProject object
    createProjectCard(title, description, dueDate, priority, newProject.id);
    
    addProjectDialog.close();

    checkIfNoProjects();
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

    // get project ID from expanded card
    const projectCard = document.querySelector(".projectCard.expanded");
    const projectId = projectCard ? projectCard.dataset.projectId : null;
    if (!projectId) {
        console.error("Error: No project is currently selected to add the task.");
        return;
    }

    // get dropdown selection
    const selectElement = document.querySelector("#taskListSelection");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const taskListId = selectedOption.value !== "none" ? selectedOption.value : null;
    const taskListTitle = selectedOption.textContent;

    // handle unassigned task
    if (!taskListId) {
        const newTaskItem = createTaskItem(title, description, dueDate, priority, notes, projectId, null);
        // unassigned
        addTaskToUI(newTaskItem, projectId, null);
    } else {
        // add task to the existing or new task list
        const newTaskItem = createTaskItem(title, description, dueDate, priority, notes, projectId, taskListId);
        addTaskToUI(newTaskItem, projectId, taskListId, taskListTitle);
    }

    addTaskDialog.close();
}