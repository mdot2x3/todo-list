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
        card.classList.add("expanded");
        document.body.classList.add("modalOpen");

        // close card on outside click
        setTimeout(() => {
            document.addEventListener("click", closeOnOutsideClick);
        }, 10);
    }

    function shrinkCard(card) {
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