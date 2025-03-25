document.addEventListener("DOMContentLoaded", () => {

const dialog = document.querySelector("dialog");
const addProjectButton = document.querySelector("#addProjectButton");
const closeAddProjectModal = dialog.querySelector("#closeButton");
const inputs = dialog.querySelectorAll("input");
const selectDropDown = dialog.querySelector("#priority");

// open input modal on button click
addProjectButton.addEventListener("click", () => {
    dialog.showModal();
});

// close input modal on button click
closeAddProjectModal.addEventListener("click", () => {
    dialog.close();
});

// whenever the .close() method is run, clear the input fields, reset priority
dialog.addEventListener("close", () => {
    inputs.forEach(input => {
        input.value = "";
        selectDropDown.selectedIndex = 0;
    })
});




});