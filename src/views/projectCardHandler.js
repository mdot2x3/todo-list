import { deleteProject } from "../controllers/projectController.js";
import { checkIfNoProjects } from "../index.js";

export function toggleExpandProjectCard(event) {
    const clickedCard = event.target.closest(".projectCard");
    const isDeleteButton = event.target.id === "deleteProject";
    const isMinimizeButton = event.target.id === "minimizeProject";
    const isExpanded = clickedCard && clickedCard.classList.contains("expanded");

    // ignore all clicks outside the card
    if (!clickedCard) return;

    // if delete button is clicked, delete the card
    if (isDeleteButton) {
        deleteCard(clickedCard);
        return;
    }
    // if minimize button is clicked, shrink the card
    if (isMinimizeButton) {
        shrinkCard(clickedCard);
        return;
    }

    // if the card is expanded and clicked inside, do nothing
    if (isExpanded && !isMinimizeButton && !isDeleteButton) {
        return;
    }
    // otherwise, toggle the card (expand or shrink)
    if (isExpanded) {
        shrinkCard(clickedCard);
    } else {
        expandCard(clickedCard);
    }

    function expandCard(card) {
        // create a placeholder div to occupy the original space
        const placeholder = document.createElement("div");
        placeholder.classList.add("projectCardPlaceholder");
        // ensure the placeholder takes up the exact same space as the original card
        // returns the visible width/height of the card, including padding, excluding margins and scrollbars
        placeholder.style.width = `${card.offsetWidth}px`;
        placeholder.style.height = `${card.offsetHeight}px`;

        // insert the placeholder before the card
        // card.parentNode gets the parent container(#content)
        // insertBefore(newElement, referenceElement), inserts newElement before referenceElement
        card.parentNode.insertBefore(placeholder, card);

        // move the card to expanded positioning
        card.classList.add("expanded");
        document.body.classList.add("modalOpen");
        // stores a reference to the placeholder element inside the card for later removal
        card.dataset.placeholderId = placeholder;
        
        // note: the following two sections need to be here at the bottom (unlike in shrinkCard below)
        // in order to eliminate the neighboring cards stretching and resizing issue that existed
        // show the minimize button when expanded
        const minimizeButton = card.querySelector("#minimizeProject");
        if (minimizeButton) minimizeButton.classList.remove("hidden");

        // show the task section when expanded
        const taskSection = card.querySelector(".taskSection");
        if (taskSection) taskSection.classList.remove("hidden");

        // close card on outside click and escape key click
        setTimeout(() => {
            document.addEventListener("click", closeOnOutsideClick);
            document.addEventListener("keydown", closeOnEscape);
        }, 10);
    }

    function shrinkCard(card) {
        // hide the minimize button when shrinking
        const minimizeButton = card.querySelector("#minimizeProject");
        if (minimizeButton) minimizeButton.classList.add("hidden");

        // hide the task section when shrinking
        const taskSection = card.querySelector(".taskSection");
        if (taskSection) taskSection.classList.add("hidden");

         // collapse all expanded task items
        const expandedTasks = card.querySelectorAll(".taskItem.expanded");
        expandedTasks.forEach(task => {
            task.classList.remove("expanded");
        });
        
        // collapse all expanded task lists
        const expandedTaskLists = card.querySelectorAll(".taskList.expanded");
        expandedTaskLists.forEach(taskList => {
            taskList.classList.remove("expanded");
            const taskListUL = taskList.querySelector(".taskListItems");
            if (taskListUL) taskListUL.classList.add("hidden");
        });

        // trigger shrink animation
        card.classList.add("shrinking");

        // wait for animation to finish
        setTimeout(() => {
            card.classList.remove("shrinking", "expanded");
            document.body.classList.remove("modalOpen");

            // remove the placeholder
            const placeholder = document.querySelector(".projectCardPlaceholder");
            if (placeholder) placeholder.remove();

            // remove modal effects
            card.classList.remove("expanded");
            document.body.classList.remove("modalOpen");

            // remove listeners
            document.removeEventListener("click", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        }, 250);
    }

    function closeOnOutsideClick(event) {
        const theExpandedCard = document.querySelector(".expanded");

        // if there is no expanded card, do nothing
        if (!theExpandedCard) return;

        // if the clicked target is outside the expanded card, shrink it
        if (!theExpandedCard.contains(event.target)) {
            shrinkCard(theExpandedCard);
        }
    }

    function closeOnEscape(event) {
        if (event.key !== "Escape") return;

        // check if any <dialog> is open
        const openDialog = document.querySelector("dialog[open]");
        if (openDialog) {
            // let the dialog handle its own escape logic
            return;
        }

        // otherwise, close the expanded project card
        const expandedCard = document.querySelector(".projectCard.expanded");
        if (expandedCard) {
            shrinkCard(expandedCard);
        }
    }

    function deleteCard(card) {
        // confirm before delete
        const confirmed = confirm("Are you sure you want to delete this project and all its tasks?");
        if (!confirmed) return;

        // remove the placeholder if the card was expanded
        const placeholder = document.querySelector(".projectCardPlaceholder");
        if (placeholder) placeholder.remove();

        // remove modal effects if card was expanded
        if (card.classList.contains("expanded")) {
            card.classList.remove("expanded");
            document.body.classList.remove("modalOpen");
            document.removeEventListener("click", closeOnOutsideClick);
        }
        
        // deletes from storage and saves update to localStorage
        const projectId = card.dataset.projectId;
        deleteProject(projectId);

        // remove from DOM
        card.remove();

        checkIfNoProjects();
    }
}