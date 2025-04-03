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
        const unassignedTaskList = projectCard.querySelector(".unassignedTaskList");
        if (unassignedTaskList) {
            const taskElement = createTaskItemElement(taskItem);
            unassignedTaskList.appendChild(taskElement);
        }
        const unassignedTaskContainer = projectCard.querySelector(".unassignedTasks");
        if (unassignedTaskContainer) {
            unassignedTaskContainer.classList.remove("hidden");
        }
    }
}

export function createTaskItemElement(taskItem) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("taskItem");
    taskElement.dataset.taskItemId = taskItem.id;
    taskElement.innerHTML = `
        <span>${taskItem.title} | Due: ${taskItem.dueDate} | Priority: ${taskItem.priority}</span>
    `;
    return taskElement;
}