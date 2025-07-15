import { projectFormSubmission, taskFormSubmission } from "./formHandler.js";
import { loadFromLocalStorage, projectStorage } from "../models/projectStorage.js";
import { createProjectCard } from "./cardGenerator.js";
import { toggleExpandProjectCard } from "./projectCardHandler.js";
import { showTaskListInput, resetTaskListInput, handleTaskListSubmission,
         populateTaskListDropdown, updateTaskById, addTaskToUI
} from "./taskGenerator.js";
import { checkIfNoProjects } from "../index.js";

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
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

    const editTaskDialog = document.querySelector("#editTaskDialog");

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

    // load any saved projects in localStorage as cards, even on refresh
    projectStorage.forEach(project => {
        createProjectCard(
            project.title,
            project.description,
            project.dueDate,
            project.priority,
            project.id
        );

        // render unassigned task items
        project.projectArrayOfTaskItems.forEach(task => {
            addTaskToUI(task, project.id, null);
        });

        // render task lists and their tasks
        project.projectArrayOfTaskLists.forEach(taskList => {
            taskList.taskListArrayOfTaskItems.forEach(task => {
                addTaskToUI(task, project.id, taskList.id, taskList.title);
            });
        });
    });

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
             // get the current project
            const projectCard = event.target.closest(".projectCard");
            const projectId = projectCard ? projectCard.dataset.projectId : null;

            if (projectId) {
                populateTaskListDropdown(projectId);
            }

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

    // prevents clicks inside the modal from reaching the project card
    editTaskDialog.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // listen for click to close edit task modal
    document.querySelector("#closeEditTask").addEventListener("click", () => {
        editTaskDialog.close();
    });
      
    // listen for click to submit edit task modal
    document.querySelector("#submitEditTask").addEventListener("click", () => {
        // grab updated values
        const updatedTask = {
            title: document.querySelector("#editTaskTitle").value,
            description: document.querySelector("#editTaskDescription").value,
            dueDate: document.querySelector("#editTaskDueDate").value,
            priority: document.querySelector("#editTaskPriority").value,
            notes: document.querySelector("#editTaskNotes").value,
        };
      
        const taskId = editTaskDialog.dataset.taskId;
      
        // run taskGenerator.js function to update task object and re-render it
        updateTaskById(taskId, updatedTask);
      
        editTaskDialog.close();
      });

      // should be at the very bottom of the DOMContentLoaded block
      checkIfNoProjects();
});