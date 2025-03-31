export function createProjectCard(title, description, dueDate, priority) {
    // select card creation space
    const domContent = document.querySelector("#content");

    // create card
    const card = document.createElement("div");
    card.classList.add("projectCard");

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
    `;
    
    domContent.appendChild(card);
}