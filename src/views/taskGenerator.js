import { createTaskList, removeTaskItemFromTaskList } from "../controllers/taskListController.js";
import { removeTaskItemFromProject, removeTaskListFromProject } from "../controllers/projectController.js";
import { saveToLocalStorage, projectStorage } from "../models/projectStorage.js";

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
        let projectId = taskItem.projectId;

        // fallback; if not defined (from localStorage object), recover from DOM
        if (!projectId) {
            const taskElement = e.target.closest(".taskItem");
            const projectCard = taskElement.closest(".projectCard");
            if (projectCard) {
                projectId = projectCard?.dataset?.projectId;
                // recover and set
                taskItem.projectId = projectId;
            }
        }
        if (!projectId) {
            console.error("Missing projectId for taskItem during delete.");
            return;
        }

        if (taskItem.taskListId && taskItem.taskListId !== "none") {
            // call the controller.js function to delete this task
            // assigned to task list
            removeTaskItemFromTaskList(taskItem.taskListId, taskItem.id);
        } else {
            // unassigned task
            removeTaskItemFromProject(projectId, taskItem.id);
        }

        saveToLocalStorage();

        // remove from DOM
        taskElement.remove();

        // update the task progress count
        updateTaskProgressStatus(taskItem.taskListId);

        // check if any tasks exist, otherwise remove section header
        updateUnassignedTasksVisibility(projectId);
    });

    // create checkbox for task completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("taskCheckbox");
    // reflect current checkbox state
    checkbox.checked = taskItem.checkbox;

    // make sure that if a task is checked, it will have styling applied even after page reload
    if (taskItem.checkbox) {
        taskElement.classList.add("completed");
    }

    // prevent checkbox click from toggling dropdown
    checkbox.addEventListener("click", (e) => {
        // stop bubbling to taskHeader click
        e.stopPropagation();
        // directly toggle here instead of old internal TaskItem.js method because you are no longer passing a class instance of TaskItem into createTaskItemElement, but instead a plain object (possibly from localStorage, a JSON parse, or constructed differently)
        taskItem.checkbox = !taskItem.checkbox;
        checkbox.checked = taskItem.checkbox;
        // add class "completed" to checked box
        taskElement.classList.toggle("completed", taskItem.checkbox);

        // update the task progress count
        updateTaskProgressStatus(taskItem.taskListId);

        saveToLocalStorage();
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

    // make sure date is formatted and ignores timezone offset
    function formatDate(input) {
        if (!input || typeof input !== "string") return input;

        // expect input format "YYYY-MM-DD"
        const [year, month, day] = input.split("-");
        if (!year || !month || !day) return input;

        // create a Date object in local time (note: month is 0-based)
        const date = new Date(Number(year), Number(month) - 1, Number(day));

        const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
        const formattedDay = String(date.getDate()).padStart(2, "0");
        const formattedYear = date.getFullYear();

        return `${formattedMonth}/${formattedDay}/${formattedYear}`;
        }
    const formattedDueDate = formatDate(taskItem.dueDate);

    // hidden details drawer (initially collapsed)
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("taskDetails");
    taskDetails.innerHTML = `
        <span class="settingsIcon">⚙</span>
        <div class="detailRow">
        <i class="fa-solid fa-align-left"></i>
        <div><span class="label">Description:</span><span class="value">${taskItem.description}</span></div>
        </div>
        <div class="detailRow">
            <i class="fa-solid fa-calendar-days"></i>
            <div><span class="label">Due Date:</span><span class="value">${formattedDueDate}</span></div>
        </div>
        <div class="detailRow">
            <i class="fa-solid fa-flag"></i>
            <div><span class="label">Priority:</span>
                <span class="priorityTag ${`priority-${taskItem.priority.toLowerCase()}`}">${taskItem.priority}</span>
            </div>
        </div>
        <div class="detailRow">
            <i class="fa-solid fa-note-sticky"></i>
            <div><span class="label">Notes:</span><span class="value">${taskItem.notes}</span></div>
        </div>
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
        const confirmed = confirm("Delete this task list and all its associated tasks?");
        if (!confirmed) return;

        const taskListId = taskListContainer.dataset.taskListId;

        // find the related project
        const projectCard = taskListContainer.closest(".projectCard");
        const projectId = projectCard.dataset.projectId;
        const project = projectStorage.find(p => p.id === projectId);
        const taskList = project?.getTaskListById(taskListId);

        if (taskList) {
            // call the controller.js function to delete this task
            // pass full object
            removeTaskListFromProject(taskList);
            saveToLocalStorage();
        } else {
            console.warn(`Could not find task list with ID ${taskListId} for deletion.`);
        }

        // remove from DOM
        taskListContainer.remove();

        // check if any task lists exist, otherwise remove section header
        updateTaskListVisibility(projectId);
    });

    // create an arrow indicating open/closed
    const arrow = document.createElement("span");
    arrow.classList.add("taskArrow");
    // right-pointing triangle (▶)
    arrow.innerHTML = "&#9654;";

    // create the title element
    const title = document.createElement("h5");
    title.textContent = taskListTitle;

    // create task progress tracker
    const taskProgress = document.createElement("div");
    taskProgress.classList.add("taskProgressCounter");
    taskProgress.dataset.taskListId = taskListId;
    taskProgress.textContent = "Tasks Remaining: 0 of 0";

    taskListHeader.appendChild(deleteListButton);
    taskListHeader.appendChild(arrow);
    taskListHeader.appendChild(title);
    taskListHeader.appendChild(taskProgress);
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

        // update task progress after appending
        updateTaskProgressStatus(taskListId);
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

    // hide input field when dialog closes
    addTaskDialog.addEventListener("close", () => {
        taskListInputDiv.classList.add("hidden");
    });

    // hide input field when submitting task
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

        // immediately render it in the UI
        renderEmptyTaskList(projectId, newTaskList.id, newTaskList.title);

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

function updateTaskProgressStatus(taskListId) {
    const taskListContainer = document.querySelector(`.taskList[data-task-list-id="${taskListId}"]`);
    if (!taskListContainer) return;

    const tasks = taskListContainer.querySelectorAll("li.taskItem");
    const completedTasks = taskListContainer.querySelectorAll("li.taskItem.completed");

    const taskProgress = taskListContainer.querySelector(".taskProgressCounter");
    if (taskProgress) {
        taskProgress.textContent = `Tasks Remaining: ${tasks.length - completedTasks.length} of ${tasks.length}`;
    }
}

export function updateUnassignedTasksVisibility(projectId) {
  const projectCard = document.querySelector(`.projectCard[data-project-id="${projectId}"]`);
  if (!projectCard) return;

  const unassignedList = projectCard.querySelector(".unassignedTaskGroup");
  const unassignedSection = projectCard.querySelector(".unassignedTasks");

  const hasTasks = unassignedList && unassignedList.querySelectorAll("li").length > 0;

  // toggle the entire section
  unassignedSection.classList.toggle("hidden", !hasTasks);
}

export function updateTaskListVisibility(projectId) {
  const projectCard = document.querySelector(`.projectCard[data-project-id="${projectId}"]`);
  if (!projectCard) return;

  const taskListContainer = projectCard.querySelector(".taskListContainer");
  const hasTaskLists = taskListContainer && taskListContainer.querySelectorAll(".taskList").length > 0;

  taskListContainer.classList.toggle("hidden", !hasTaskLists);
}

export function renderEmptyTaskList(projectId, taskListId, taskListTitle) {
    const projectCard = document.querySelector(`.projectCard[data-project-id="${projectId}"]`);
    if (!projectCard) return;

    const taskListContainer = projectCard.querySelector(".taskListContainer");

    // only add it if it doesn't already exist
    if (!taskListContainer.querySelector(`.taskList[data-task-list-id="${taskListId}"]`)) {
        const taskListElement = createTaskListElement(taskListId, taskListTitle);
        taskListContainer.classList.remove("hidden");
        taskListContainer.appendChild(taskListElement);
    }
}