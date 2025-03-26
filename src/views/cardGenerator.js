export function createProjectCard(title, description, dueDate, priority) {
    // select card creation space
    const domContent = document.querySelector("#content");

    // create card
    const card = document.createElement("div");
    card.classList.add("projectCard");

    // add project details to card
    card.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <button id="deleteProject">Delete</button>
    `;

    // delete card
    card.querySelector("#deleteProject").addEventListener("click", () => {
        card.remove();
        // optionally, also remove from `projectStorage`
    });

    domContent.appendChild(card);
}