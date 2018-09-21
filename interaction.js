// Alert
// alert(message);
// This shows a message and pauses the script execution until the user presses “OK”
let variable = "Hello"
alert(variable); // or alert("Hello");

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Prompt
/*  result = prompt(title[, default]);
    Shows a modal window with a text message, an input field for the visitor and buttons OK/CANCEL
    Title - the text to show to the visitor
    Default - an optional second parameter, the initial value for the input
    The call to prompt returns the text from the field or null if the input was canceled.
*/
let age = prompt("How old are you?", 100);
alert(`You are ${age} years old!`);

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Confirm
/*  result = confirm(question);
    Shows a modal window with a question and two buttons: OK and CANCEL
    The result is true if OK is pressed and false otherwise
*/
let isBoss = confirm('Are you the boss?');
alert(isBoss);