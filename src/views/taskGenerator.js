import { createTaskList } from "../controllers/taskListController.js";
import { removeTaskItemFromProject, removeTaskListFromProject } from "../controllers/projectController.js";

export function createTaskItemElement(taskItem) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("taskItem");
    taskElement.dataset.taskItemId = taskItem.id;
    taskElement.dataset.priority = taskItem.priority;
    
    // create delete button for task deletion
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteTaskButton");
    deleteButton.textContent = "x";

    // prevent click from toggling the dropdown
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        // call the controller.js function to delete this task
        const projectId = taskItem.projectId;
        removeTaskItemFromProject(projectId, taskItem.id);

        // remove from DOM
        taskElement.remove();
    });

    // create checkbox for task completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("taskCheckbox");
    // reflect current checkbox state
    checkbox.checked = taskItem.checkbox;

    // prevent checkbox click from toggling dropdown
    checkbox.addEventListener("click", (e) => {
        // stop bubbling to taskHeader click
        e.stopPropagation();
        // directly toggle here instead of old internal TaskItem.js method because you are no longer passing a class instance of TaskItem into createTaskItemElement, but instead a plain object (possibly from localStorage, a JSON parse, or constructed differently)
        taskItem.checkbox = !taskItem.checkbox;
        checkbox.checked = taskItem.checkbox;
        // add class "completed" to checked box
        taskElement.classList.toggle("completed", taskItem.checkbox);
    });

     // create taskContent container
     const taskContent = document.createElement("div");
     taskContent.classList.add("taskContent");

    // task header (always visible, colored)
    const taskHeader = document.createElement("div");
    taskHeader.classList.add("taskHeader");
    
    const titleSpan = document.createElement("span");
    titleSpan.classList.add("taskTitle");
    titleSpan.textContent = taskItem.title;

    // an arrow indicating if the drawer is open or closed
    const arrow = document.createElement("span");
    arrow.classList.add("taskArrow");
    // right-pointing triangle (▶)
    arrow.innerHTML = "&#9654;";
    
    taskHeader.appendChild(titleSpan);
    taskHeader.appendChild(arrow);

    // hidden details drawer (initially collapsed)
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("taskDetails");
    taskDetails.innerHTML = `
        <span class="settingsIcon">⚙</span>
        <p><strong>Description:</strong> ${taskItem.description}</p>
        <p><strong>Due Date:</strong> ${taskItem.dueDate}</p>
        <p><strong>Priority:</strong> ${taskItem.priority}</p>
        <p><strong>Notes:</strong> ${taskItem.notes}</p>
    `;
    
    taskContent.appendChild(taskHeader);
    taskContent.appendChild(taskDetails);
    // delete button and checkbox outside content
    taskElement.appendChild(deleteButton);
    taskElement.appendChild(checkbox);
    // taskContent holds header/details
    taskElement.appendChild(taskContent);

     // click expands/collapses the drawer
     taskHeader.addEventListener("click", () => {
        taskElement.classList.toggle("expanded");
    });

    // select cog button
    const settingsIcon = taskDetails.querySelector(".settingsIcon");

    // click on cog opens editing dialog modal
    settingsIcon.addEventListener("click", (e) => {
        // prevent expanding/collapsing
        e.stopPropagation();

        // fill in current task details as placeholder text
        document.querySelector("#editTaskTitle").value = taskItem.title;
        document.querySelector("#editTaskDescription").value = taskItem.description;
        document.querySelector("#editTaskDueDate").value = taskItem.dueDate;
        document.querySelector("#editTaskPriority").value = taskItem.priority;
        document.querySelector("#editTaskNotes").value = taskItem.notes || "";
      
        // store reference to task object or element if needed for submission
        editTaskDialog.dataset.taskId = taskItem.id;
      
        // show the modal
        document.querySelector("#editTaskDialog").showModal();
      });
    
    return taskElement;
}

export function createTaskListElement(taskListId, taskListTitle) {
    // create the task list container
    const taskListContainer = document.createElement("div");
    taskListContainer.classList.add("taskList");
    taskListContainer.dataset.taskListId = taskListId;

    // create the clickable header wrapper
    const taskListHeader = document.createElement("div");
    taskListHeader.classList.add("taskListHeader");

    // create delete button for the task list
    const deleteListButton = document.createElement("button");
    deleteListButton.classList.add("deleteTaskListButton");
    deleteListButton.textContent = "x";

    // prevent click from toggling the dropdown
    deleteListButton.addEventListener("click", (e) => {
        e.stopPropagation();
        // confirm before delete
        const confirmed = confirm("Delete this task list and all its tasks?");
        if (!confirmed) return;

        // call the controller.js function to delete this task
        removeTaskListFromProject(taskListId);

        // remove from DOM
        taskListContainer.remove();
    });

    // create an arrow indicating open/closed
    const arrow = document.createElement("span");
    arrow.classList.add("taskArrow");
    // right-pointing triangle (▶)
    arrow.innerHTML = "&#9654;";

    // create the title element
    const title = document.createElement("h5");
    title.textContent = taskListTitle;

    taskListHeader.appendChild(deleteListButton);
    taskListHeader.appendChild(arrow);
    taskListHeader.appendChild(title);
    taskListContainer.appendChild(taskListHeader);

    // create the ul of tasks and hide it initially
    const taskListUL = document.createElement("ul");
    taskListUL.classList.add("taskListItems");
    taskListUL.classList.add("hidden");
    taskListContainer.appendChild(taskListUL);

    // toggle expansion on click
    taskListHeader.addEventListener("click", () => {
        taskListContainer.classList.toggle("expanded");
        taskListUL.classList.toggle("hidden");
});

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

export function updateTaskById(taskId, updatedTask) {
    // find the task element in projectStorage
    const taskElement = document.querySelector(`.taskItem[data-task-item-id="${taskId}"]`);
    if (!taskElement) {
        console.error(`Task with ID ${taskId} not found in the DOM.`);
        return;
    }

      // !!!!! Optional: Update the underlying data model here, if you're storing tasks in memory !!!!!

    // replace the task DOM with an updated one
    const projectId = taskElement.closest(".projectCard").dataset.projectId;
    const taskListElement = taskElement.closest(".taskList");
    const taskListId = taskListElement ? taskListElement.dataset.taskListId : null;
    const taskListTitle = taskListElement ? taskListElement.querySelector("h5").textContent : null;

    // remove the old element
    taskElement.remove();

    // rebuild the updated task object
    const updatedTaskItem = {
        id: taskId,
        projectId: projectId,
        // or retain previous state
        checkbox: false,
        // pull data from appUI.js variable
        ...updatedTask,
    };

    // add the updated task back into the UI
    addTaskToUI(updatedTaskItem, projectId, taskListId, taskListTitle);
}