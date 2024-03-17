"use strict";

/*
    File:    simpleform.js
    Author:  Michael Grzesina (grzesinam)
    Course:  CWEB 190
    Date:    Winter 2023
    Purpose: Display information about the state of the form and its elements
*/

window.onload = init;

function init() {
    document.getElementById("simpleFormID").onsubmit = handleSubmission;
}

function handleSubmission(event) {
    event.preventDefault();
    let outputString = "";
    let currentElement = null;
    let selectedOption;

    currentElement = document.getElementById("name");
    outputString += "Current value of the name text input: " + currentElement.value + "\n";
    outputString += "Default value of the name text input: " + currentElement.defaultValue + "\n";

    currentElement = document.getElementById("size");
    outputString += "Number of options in the select box: " + currentElement.length + "\n";
    selectedOption = currentElement.selectedIndex;
    outputString += "Number of selected option in select box: " + selectedOption + "\n";

    if (selectedOption !== -1) {
        outputString += "Text of selected option: " + currentElement.options[selectedOption].text + "\n";
        outputString += "Value of selected option: " + currentElement.options[selectedOption].value + "\n";
    } else {
        outputString += "No size selected\n";
    }

    outputString += "Selected colour: ";
    if (document.getElementById("colourRed").checked) {
        outputString += "Red";
    } else if (document.getElementById("colourGreen").checked) {
        outputString += "Green";
    } else if (document.getElementById("colourBlue").checked) {
        outputString += "Blue";
    } else {
        outputString += "none";
    }
    outputString += "\n";

    outputString += "Default colour: ";
    if (document.getElementById("colourRed").defaultChecked) {
        outputString += "Red";
    } else if (document.getElementById("colourGreen").defaultChecked) {
        outputString += "Green";
    } else if (document.getElementById("colourBlue").defaultChecked) {
        outputString += "Blue";
    } else {
        outputString += "none";
    }
    outputString += "\n";

    currentElement = document.getElementById("forChild");
    outputString += "For child checked: " + currentElement.checked + "\n";
    outputString += "For child checked by default: " + currentElement.defaultChecked + "\n";

    window.alert(outputString);
    console.log(outputString);
}