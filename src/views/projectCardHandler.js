export function toggleExpandProjectCard(event) {
    const clickedCard = event.target.closest(".projectCard");
    const isDeleteButton = event.target.id === "deleteProject";

    // ignore clicks on the delete button
    if (!clickedCard || isDeleteButton) return;

    if (clickedCard.classList.contains("expanded")) {
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
        
        // close card on outside click
        setTimeout(() => {
            document.addEventListener("click", closeOnOutsideClick);
        }, 10);
    }

    function shrinkCard(card) {
        // remove the placeholder
        const placeholder = document.querySelector(".projectCardPlaceholder");
        if (placeholder) placeholder.remove();

        card.classList.remove("expanded");
        document.body.classList.remove("modalOpen");
        document.removeEventListener("click", closeOnOutsideClick);
    }

    function closeOnOutsideClick(event) {
        const theExpandedCard = document.querySelector(".expanded");

        if (theExpandedCard && !theExpandedCard.contains(event.target)) {
            shrinkCard(theExpandedCard);
        }
    }
}