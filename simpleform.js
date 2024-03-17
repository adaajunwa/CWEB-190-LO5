"use strict";

window.onload = init;

function init() {
    document.getElementById("simpleFormID").onsubmit = handleSubmission;
    document.getElementById("name").oninput = handleName;
}


function handleSubmission(event) {
    //window.alert("Form submission activated");
    const formElements = document.getElementById("simpleFormID").elements;
    let outputString = "";

    for (let i = 0; i < formElements.length; i++) {
        outputString += i + ": " + formElements[i].name + " - " + formElements[i].type
                + " has a value of " + formElements[i].value + "\n";
    }

    console.log(outputString);
    //window.alert(outputString);
    handleName();

    event.preventDefault();
    //return false;
}


function handleName() {
    let nameBox = document.getElementById("name");
    if (nameBox.value.trim() === "") {
        // window.alert("Invalid name");
        document.getElementById("error").innerHTML = "Invalid name";
        nameBox.style.backgroundColor = "tomato";
    } else {
        document.getElementById("error").innerHTML = "";
        nameBox.style.backgroundColor = "";
        //window.alert(`The name entered, ${nameBox.value.trim()}, is valid`);
    }
}
