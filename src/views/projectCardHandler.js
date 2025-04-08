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
         // show the minimize button when expanded
        const minimizeButton = card.querySelector("#minimizeProject");
        if (minimizeButton) minimizeButton.classList.remove("hidden");

        // show the task section when expanded
        const taskSection = card.querySelector(".taskSection");
        if (taskSection) taskSection.classList.remove("hidden");

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
        
        // close card on outside click
        setTimeout(() => {
            document.addEventListener("click", closeOnOutsideClick);
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

        // remove the placeholder
        const placeholder = document.querySelector(".projectCardPlaceholder");
        if (placeholder) placeholder.remove();

        // remove modal effects
        card.classList.remove("expanded");
        document.body.classList.remove("modalOpen");
        document.removeEventListener("click", closeOnOutsideClick);
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

    function deleteCard(card) {
        // remove the placeholder if the card was expanded
        const placeholder = document.querySelector(".projectCardPlaceholder");
        if (placeholder) placeholder.remove();

        // remove modal effects if card was expanded
        if (card.classList.contains("expanded")) {
            card.classList.remove("expanded");
            document.body.classList.remove("modalOpen");
            document.removeEventListener("click", closeOnOutsideClick);
        }
        
        card.remove();
    }
}