import { projectFormSubmission } from "./formHandler.js";

document.addEventListener("DOMContentLoaded", () => {

const dialog = document.querySelector("dialog");
const openAddProject = document.querySelector("#openAddProject");
const closeAddProject = dialog.querySelector("#closeAddProject");
const submitAddProject = dialog.querySelector("#submitAddProject");
const inputs = dialog.querySelectorAll("input");
const selectDropDown = dialog.querySelector("#priority");

// open input modal on button click
openAddProject.addEventListener("click", () => {
    dialog.showModal();
});

// close input modal on button click
closeAddProject.addEventListener("click", () => {
    dialog.close();
});

// whenever the .close() method is run, clear the input fields, reset priority
dialog.addEventListener("close", () => {
    inputs.forEach(input => {
        input.value = "";
    });
    selectDropDown.selectedIndex = 0;
});

// listen for submit, normally .addEventListener("click", projectFormSubmission) would suffice, but
// because we want to share the "dialog" DOM querySelection with the function in addition to the click event,
// we can structure it like so to send both...
submitAddProject.addEventListener("click", (event) => projectFormSubmission(event, dialog));


});