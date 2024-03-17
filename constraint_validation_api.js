"use strict";

/*
    File:    constraint_validation_api.js
    Author:  Michael Grzesina (grzesinam)
    Course:  CWEB 190
    Date:    Winter 2023
    Purpose: Demonstrate the Constraint Validation API
*/

window.onload = init;

function init() {
    // When the submission button is clicked, check the entire form for validity
    document.getElementById("btnSubmit").onclick = checkForm;

    // any time the comments text area changes, update the character count
    document.getElementById("comments").oninput = countChars;

    // any time that the username changes, check its validity
    document.getElementById("username").oninput = checkUsername;

    // any time that the password changes, check its validity
    document.getElementById("userpassword").oninput = checkPassword;

    // any time that the password confirmation changes, check its validity
    document.getElementById("passwordconfirm").oninput = checkPassword2;

    // any time that the SIN changes, check its validity
    document.getElementById("sin").oninput = checkSIN;

    // any time that any of the color radio buttons changes, update its validity message
    // Note that any one element being set will mean the whole group is valid, but we must include
    // the test for each element to avoid extra error messages - we don't know which one will be set
    document.getElementById("redColor").onchange = checkColor;
    document.getElementById("greenColor").onchange = checkColor;
    document.getElementById("blueColor").onchange = checkColor;

    // any time that the level select box is changed, check its validity
    document.getElementById("level").oninput = checkLevel;
}


// This function isn't part of the constraint validation API, just a neat little function that
// shows how you can add character counting to a text area
function countChars() {
    let commentsField = document.getElementById("comments");
    let numChars = commentsField.value.length;

    if (numChars > 50) {
        // shouldn't get here unless maxlength attribute is not enforced by browser
        numChars = 50;
        commentsField.value = commentsField.value.slice(0, 50);
    }

    document.getElementById("charsUsed").textContent = numChars;
}


// This function tests that the username exists (since it is required) and that it matches the
// pattern attribute, setting up custom error messages if either requirement is not met
function checkUsername() {
    let usernameField = document.getElementById("username");

    if (usernameField.validity.valueMissing) { // field is empty
        usernameField.setCustomValidity("You must enter a username");
    } else if (usernameField.validity.patternMismatch) { // field doesn't match pattern
        usernameField.setCustomValidity("Username must be in the form cst### where # is a digit");
    } else {
        usernameField.setCustomValidity(""); // no errors, so remove any validity messages so validation is completed
    }
}


// This function test that the password exists, is long enough, and has at least one lowercase
// letter, setting up custom error messages if any requirement is not met
function checkPassword() {
    let passwordField = document.getElementById("userpassword");

    if (passwordField.validity.valueMissing) { // field is empty
        passwordField.setCustomValidity("You must enter a password");
    } else if (passwordField.validity.tooShort) { // field does not meet minlength requirement
        passwordField.setCustomValidity("Password must be at least 3 characters in length");
    } else if (!/[a-z]/.test(passwordField.value)) { // check regular expression for lowercase letter - if not, error
        passwordField.setCustomValidity("Password must contain at least one lowercase letter");
        // could add similar tests for uppercase letter, digit
    } else {
        passwordField.setCustomValidity(""); // no errors, so remove any validity messages so validation is completed
    }
}


// This function tests that the confirmation password matches the original password
function checkPassword2() {
    let password2Field = document.getElementById("passwordconfirm");

    if (password2Field.validity.valueMissing) { // field is empty
        password2Field.setCustomValidity("You must enter your password again for verification purposes");
    } else if (password2Field.value !== document.getElementById("userpassword").value) {
        password2Field.setCustomValidity("The original and confirmation passwords must match");
    } else {
        password2Field.setCustomValidity(""); // no errors, so remove any validity messages so validation is completed
    }
}


// This function tests that the SIN is valid (matches both pattern and mathematical requirements)
function checkSIN() {
    let sinField = document.getElementById("sin");

    // Note that we do not check the .validity.valueMissing property, since this field is not required
    if (sinField.validity.patternMismatch) {
        sinField.setCustomValidity("SIN must be made up of 9 digits");
    } else if (sinField.value !== "" && !checkLuhnSIN(sinField.value)) { // check if SIN meets mathematical requirements
        sinField.setCustomValidity("This is not a valid SIN - please correct it");
    } else {
        sinField.setCustomValidity(""); // no errors, so remove any validity messages so validation is completed
    }
}


// This function tests that whether value passed in meets the mathematical requirements for a SIN
// See https://en.wikipedia.org/wiki/Social_Insurance_Number#Validation
function checkLuhnSIN(value) {
    let number = 0;
    let multiplier = 1;
    let digitString = "";

    for (let i = 0; i < value.length; i++) {
        digitString += Number(value.charAt(i)) * multiplier;
        multiplier = (multiplier === 1) ? 2 : 1;
    }

    for (let i = 0; i < digitString.length; i++) {
        number += Number(digitString.charAt(i));
    }

    return number % 10 === 0;
}


// This function tests whether a color button has been selected as required
function checkColor() {
    let redColorButton = document.getElementById("redColor");

    // We only need to check one radio button to see if any of the group of radio buttons has been selected
    if (redColorButton.validity.valueMissing) {
        redColorButton.setCustomValidity("You must choose a color");
    } else {
        redColorButton.setCustomValidity(""); // no errors, so remove any validity messages so validation is completed
    }
}


// This function tests whether a drop-down option for the level has been selected as required
// Note that the first option "--Select your level--" has a value of "" so it registers as not selected
function checkLevel() {
    let levelField = document.getElementById("level");

    if (levelField.validity.valueMissing) {
        levelField.setCustomValidity("You must choose a level");
    } else {
        levelField.setCustomValidity(""); // no errors, so remove any validity messages so validation is completed
    }
}


// This function tests that all of the fields are valid before allowing the form to be submitted
// using the functions previously set up
function checkForm() {
    checkUsername();
    checkPassword();
    checkPassword2();
    checkSIN();
    checkColor();
    checkLevel();
}
