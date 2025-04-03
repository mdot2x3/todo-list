export function createProjectCard(title, description, dueDate, priority, projectId) {
    // select card creation space
    const domContent = document.querySelector("#content");

    // create card
    const card = document.createElement("div");
    card.classList.add("projectCard");
    // store project id of created card in dataset
    card.dataset.projectId = projectId;

    // add project details to card
    card.innerHTML = `
        <div class="projectCardHeader">
            <h3>${title}</h3>
            <button class="hidden" id="minimizeProject">_</button>
            <button id="deleteProject">x</button>
        </div>

        <div class="projectCardBody">
            <p>${description}</p>
            <p><strong>Due Date:</strong> ${dueDate}</p>
            <p><strong>Priority:</strong> ${priority}</p>
        </div>

        <div class="taskSection hidden">
            <button id="addTaskButton">+ New Task</button>
            <div class="unassignedTasks hidden">
                <h4>Unassigned Tasks</h4>
                <ul class="unassignedTaskGroup"></ul>
            </div>
            <div class="taskListContainer hidden">
                <h4>Task List</h4>
                <ul class="taskListGroup"></ul>
            </div>
        </div>
    `;
    
    domContent.appendChild(card);
}