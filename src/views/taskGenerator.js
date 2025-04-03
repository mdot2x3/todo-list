export function createTaskItemElement(taskItem) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("taskItem");
    taskElement.dataset.taskItemId = taskItem.id;
    taskElement.innerHTML = `
        <span>${taskItem.title} | Due: ${taskItem.dueDate} | Priority: ${taskItem.priority}</span>
    `;
    return taskElement;
}

export function addTaskToUI(taskItem, projectId, taskListId) {
    // locate the project card in the UI
    const projectCard = document.querySelector(`.projectCard[data-project-id="${projectId}"]`);
    if (!projectCard) return;

    // check if the task belongs to a task list or is unassigned
    if (taskListId) {
        const taskListContainer = projectCard.querySelector(`.taskListContainer[data-task-list-id="${taskListId}"]`);
        if (taskListContainer) {
            const taskListUL = taskListContainer.querySelector("ul");
            const taskElement = createTaskItemElement(taskItem);
            taskListUL.appendChild(taskElement);
        }
    } else {
        const unassignedTaskGroup = projectCard.querySelector(".unassignedTaskGroup");
        if (unassignedTaskGroup) {
            const taskElement = createTaskItemElement(taskItem);
            unassignedTaskGroup.appendChild(taskElement);
        }
        const unassignedTaskContainer = projectCard.querySelector(".unassignedTasks");
        if (unassignedTaskContainer) {
            unassignedTaskContainer.classList.remove("hidden");
        }
    }
}

export function addNewTaskList(event) {
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