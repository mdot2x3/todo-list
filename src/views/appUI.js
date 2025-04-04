import { projectFormSubmission, taskFormSubmission } from "./formHandler.js";
import { projectStorage } from "../models/projectStorage.js";
import { createProjectCard } from "./cardGenerator.js";
import { toggleExpandProjectCard } from "./projectCardHandler.js";
import { showTaskListInput, resetTaskListInput, handleTaskListSubmission } from "./taskGenerator.js";

document.addEventListener("DOMContentLoaded", () => {
    const contentArea = document.querySelector("#content");

    const addProjectDialog = document.querySelector("#addProjectDialog");
    const openAddProject = document.querySelector("#openAddProject");
    const closeAddProject = addProjectDialog.querySelector("#closeAddProject");
    const submitAddProject = addProjectDialog.querySelector("#submitAddProject");
    const addProjectForm = addProjectDialog.querySelector("#addProjectForm");
    
    const addTaskDialog = document.querySelector("#addTaskDialog");
    const closeAddTask = addTaskDialog.querySelector("#closeAddTask");
    const submitAddTask = addTaskDialog.querySelector("#submitAddTask");
    const addTaskForm = addTaskDialog.querySelector("#addTaskForm");

    const addTaskListButton = addTaskDialog.querySelector("#addTaskListButton");

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
        if (addProjectForm) addProjectForm.reset();
    });

    // listen for addProject submit, run formHandler.js function
    submitAddProject.addEventListener("click", projectFormSubmission);

    // load any saved projects in projectStorage as cards, even on refresh
    projectStorage.forEach(createProjectCard);

    // listen for project card clicks, run projectCardHandler.js function
    // ensures that when a modal is open, clicking outside will not collapse the expanded project card
    contentArea.addEventListener("click", (event) => {
        const anyModalOpen = document.querySelector("dialog[open]");
        if (!anyModalOpen) {
            toggleExpandProjectCard(event);
        }
    });



    // open input modal when clicking "+ New Task"
    // #addTaskButton is dynamically added via the DOM when a project expands, must delegate the listener
    document.addEventListener("click", (event) => {
        if (event.target && event.target.id === "addTaskButton") {
            addTaskDialog.showModal();
        }
    });

    // prevents clicks inside the modal from reaching the project card
    addTaskDialog.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // close input modal
    closeAddTask.addEventListener("click", () => {
        addTaskDialog.close();
    });

    // reset the form when closing modal
    addTaskDialog.addEventListener("close", () => {
        if (addTaskForm) addTaskForm.reset();
    });

    // listen for addTask submit, run formHandler.js function
    submitAddTask.addEventListener("click", taskFormSubmission);

    // listen for "+ New List" click inside new task modal
    addTaskListButton.addEventListener("click", showTaskListInput);
    // re-hide task list input field after close or submit
    resetTaskListInput();
    handleTaskListSubmission();
    
});