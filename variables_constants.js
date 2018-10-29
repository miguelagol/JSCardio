'use strict';
// The "use strict" directive switches the engine to the “modern” mode, changing the behavior of some built-in features
// When it is located on the top of the script, then the whole script works the “modern” way.

/* To comment a block press CTRL + SHIFT + A 
    Be carefull: Nested comments are not supported
*/
// To comment a line press CTRL + /

// VARIABLES
// A variable is a “named storage” for data. To create a variable in JavaScript, we need to use the let keyword.
let message;
message = 'Hello World'; // store the string

// We can merge this into a single line
// let message = 'Hello!'; // define the variable and assign the value

let hello;

// copy 'Hello world' from hello into message
hello = message;

// now two variables hold the same data
console.log(hello); // Hello world!
console.log(message); // Hello world!

/*  -------------------------REMEMBER-------------------------
    - Case matters - Variables named hello and HelLO – are two different variables
    - Reserved names - There is a list of reserved words, which cannot be used as variable names, because they are used by the language itself.
    - Variable naming - The name must contain only letters, digits, symbols $ and _. The first character must not be a digit.
*/

//------------------------------------------------------------------------------------------------------------------------------------------------------

// CONSTANTS
// To declare a constant (unchanging) variable, one can use const instead of let
const myBirthday = '23.11.1990';

// myBirthday = "01.01.2001"; // error, can't reassign the constant!

/* There is a widespread practice to use constants as aliases for difficult-to-remember values that are known prior to execution.
Such constants are named using capital letters and underscores. */
const COLOR_RED = '#F00';
