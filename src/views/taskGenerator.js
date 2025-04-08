import { createTaskList } from "../controllers/taskListController.js";

export function createTaskItemElement(taskItem) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("taskItem");
    taskElement.dataset.taskItemId = taskItem.id;
    taskElement.dataset.priority = taskItem.priority;
    
    // task header (always visible, colored)
    const taskHeader = document.createElement("div");
    taskHeader.classList.add("taskHeader");
    taskHeader.textContent = taskItem.title;
    
    // an arrow indicating if the drawer is open or closed
    const arrow = document.createElement("span");
    arrow.classList.add("taskArrow");
    // right-pointing triangle (▶)
    arrow.innerHTML = "&#9654;";

    // hidden details drawer (initially collapsed)
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("taskDetails");
    taskDetails.innerHTML = `
        <p><strong>Description:</strong> ${taskItem.description}</p>
        <p><strong>Due Date:</strong> ${taskItem.dueDate}</p>
        <p><strong>Priority:</strong> ${taskItem.priority}</p>
        <p><strong>Notes:</strong> ${taskItem.notes}</p>
    `;

    taskElement.appendChild(taskHeader);
    taskHeader.appendChild(arrow);
    taskElement.appendChild(taskDetails);

     // click expands/collapses the drawer
     taskHeader.addEventListener("click", () => {
        taskElement.classList.toggle("expanded");
    });
    
    return taskElement;
}

export function createTaskListElement(taskListId, taskListTitle) {
    // create the task list container
    const taskListContainer = document.createElement("div");
    taskListContainer.classList.add("taskList");
    taskListContainer.dataset.taskListId = taskListId;

    // create the task list header and add it to the container
    const taskListHeader = document.createElement("h5");
    taskListHeader.textContent = taskListTitle;
    taskListContainer.appendChild(taskListHeader);

    // create the task list's UL for the tasks
    const taskListUL = document.createElement("ul");
    taskListContainer.appendChild(taskListUL);

    return taskListContainer;
}

export function addTaskToUI(taskItem, projectId, taskListId, taskListTitle) {
    const projectCard = document.querySelector(`.projectCard[data-project-id="${projectId}"]`);
    if (!projectCard) return;

    const taskElement = createTaskItemElement(taskItem);

    if (taskListId && taskListId !== "none") {
        // look for existing taskList container
        let taskListContainer = projectCard.querySelector(`.taskList[data-task-list-id="${taskListId}"]`);

        if (!taskListContainer) {
            // create and append it if it doesn't exist yet
            taskListContainer = createTaskListElement(taskListId, taskListTitle);
            const listSection = projectCard.querySelector(".taskListContainer");
            listSection.classList.remove("hidden");
            listSection.appendChild(taskListContainer);
        }

        const taskListUL = taskListContainer.querySelector("ul");
        taskListUL.appendChild(taskElement);
    } else {
        // if no list selected or 'None' was selected
        const unassignedTaskGroup = projectCard.querySelector(".unassignedTaskGroup");
        const unassignedTaskContainer = projectCard.querySelector(".unassignedTasks");

        if (unassignedTaskGroup && unassignedTaskContainer) {
            unassignedTaskGroup.appendChild(taskElement);
            unassignedTaskContainer.classList.remove("hidden");
        }
    }
}

export function showTaskListInput(event) {
    // prevent submit, page reload
    event.preventDefault();

    const taskListInputDiv = document.querySelector(".taskListInputDiv");
    if (taskListInputDiv) {
        taskListInputDiv.classList.remove("hidden");
    }
}

export function resetTaskListInput() {
    const addTaskDialog = document.querySelector("#addTaskDialog");
    const addTaskForm = addTaskDialog.querySelector("#addTaskForm");
    const taskListInputDiv = addTaskDialog.querySelector(".taskListInputDiv");

    if (!taskListInputDiv) return;

    // Hide input field when dialog closes
    addTaskDialog.addEventListener("close", () => {
        taskListInputDiv.classList.add("hidden");
    });

    // Hide input field when submitting task
    addTaskForm.addEventListener("submit", () => {
        taskListInputDiv.classList.add("hidden");
    });
}

export function populateTaskListDropdown(projectId) {
    const dropdown = document.querySelector("#taskListSelection");

    // clear all existing options
    dropdown.innerHTML = "";

    // always add the default "None" option
    const defaultOption = document.createElement("option");
    defaultOption.value = "none";
    defaultOption.textContent = "None (standalone task)";
    dropdown.appendChild(defaultOption);

    // find all task lists for the current project
    const projectCard = document.querySelector(`.projectCard[data-project-id="${projectId}"]`);
    const taskListElements = projectCard.querySelectorAll(".taskList");

    taskListElements.forEach(taskList => {
        const option = document.createElement("option");
        option.value = taskList.dataset.taskListId;
        option.textContent = taskList.querySelector("h5").textContent;
        dropdown.appendChild(option);
    });
}


export function handleTaskListSubmission() {
    const submitTaskListButton = document.querySelector("#submitTaskList");

    submitTaskListButton.addEventListener("click", (event) => {
        event.preventDefault();

        const taskListInput = document.querySelector("#taskListInput");
        const dropdown = document.querySelector("#taskListSelection");
        const title = taskListInput.value.trim();

        // validate
        if (title === "") {
            alert("Please enter a valid Task List name.");
            return;
        }

        // get current project
        const projectCard = document.querySelector(".projectCard.expanded");
        const projectId = projectCard ? projectCard.dataset.projectId : null;

        if (!projectId) {
            console.error("No project selected to add a Task List.");
            return;
        }

        // create and store task list
        const newTaskList = createTaskList(title, projectId);
        console.log("Task List Created:", newTaskList);

        // create <option> in dropdown
        const option = document.createElement("option");
        option.value = newTaskList.id;
        option.textContent = newTaskList.title;
        option.selected = true;

        dropdown.appendChild(option);

        // reset UI
        taskListInput.value = "";
        document.querySelector(".taskListInputDiv").classList.add("hidden");
    });
}
