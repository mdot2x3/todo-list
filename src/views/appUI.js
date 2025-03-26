import { projectFormSubmission } from "./formHandler.js";
import { projectStorage } from "../models/projectStorage.js";
import { createProjectCard } from "./cardGenerator.js";

document.addEventListener("DOMContentLoaded", () => {

const addProjectDialog = document.querySelector("#addProjectDialog");
const openAddProject = document.querySelector("#openAddProject");
const closeAddProject = addProjectDialog.querySelector("#closeAddProject");
const submitAddProject = addProjectDialog.querySelector("#submitAddProject");
const addProjectForm = addProjectDialog.querySelector("#addProjectForm");

// open input modal on button click
openAddProject.addEventListener("click", () => {
    addProjectDialog.showModal();
});

// close input modal on button click
closeAddProject.addEventListener("click", () => {
    addProjectDialog.close();
});

// whenever the .close() method is run, reset the input fields
addProjectDialog.addEventListener("close", () => {
    if (addProjectForm) {
        addProjectForm.reset();
    }
});

// listen for addProject submit, run formHandler.js function
submitAddProject.addEventListener("click", projectFormSubmission);

// load any saved projects in projectStorage as cards, even on refresh
projectStorage.forEach(createProjectCard);



});