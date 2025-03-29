import { toggleExpandProjectCard } from "./projectCardHandler.js";

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
            <button id="deleteProject">x</button>
        </div>
        <div class="projectCardBody">
            <p>${description}</p>
            <p><strong>Due Date:</strong> ${dueDate}</p>
            <p><strong>Priority:</strong> ${priority}</p>
        </div>
    `;

    // delete card
    card.querySelector("#deleteProject").addEventListener("click", (event) => {
        // prevent event bubbling to parent elements (stops event propagation so clicking delete
        // doesn’t trigger unwanted side effects)
        event.stopPropagation();

        // if the deleted card is expanded, remove modal effect
        if (card.classList.contains("expanded")) {
            document.body.classList.remove("modalOpen");
            document.removeEventListener("click", toggleExpandProjectCard.closeOnOutsideClick);
        }

        card.remove();
        // optionally, also remove from `projectStorage`
    });

    domContent.appendChild(card);
}