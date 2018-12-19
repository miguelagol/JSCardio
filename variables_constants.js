'use strict';
// The "use strict" directive switches the engine to the “modern” mode, changing the behavior of some built-in features
// When it is located on the top of the script, then the whole script works the “modern” way.

/* To comment a block press CTRL + SHIFT + A 
    Be carefull: Nested comments are not supported
*/
// To comment a line press CTRL + /

// VARIABLES - let
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

//------------------------------------------------------------------------------------------------------------------------------------------------------

// Variables - var
// "var” has no block scope
if (true) {
   var varTest = true;
   let letTest = false;
}

// var ignores code blocks, so we’ve got a global varTest
console.log(varTest); // true (the variable var lives after if)
console.log(letTest); // Error: letTest is not defined

// The same things for loops
for (var i = 0; i < 10; i++) {}

console.log(i); // 10

// If a code block is inside a function, then var becomes a function-level variable
function sayHi() {
   if (true) {
      var phrase = 'Hello';
   }
   console.log(phrase);
}

sayHi(); // Hello
console.log(phrase); // Error: phrase is not defined

//------------------------------------------------------------------------------------------------

// “var” are processed at the function start
// var variables are defined from the beginning of the function, no matter where the definition is
function sayHi() {
   phrase = 'Hello 1';

   console.log(phrase);

   var phrase;
}

sayHi(); // Hello 1

// the same as
function sayHi2() {
   var phrase;

   phrase = 'Hello 2';

   console.log(phrase);
}

sayHi2(); // Hello 2

// or even this (code blocks are ignored!!!)
function sayHi3() {
   phrase = 'Hello 3';

   if (false) {
      var phrase;
   }

   console.log(phrase);
}

sayHi3(); // Hello 3

// We can also call such behavior “hoisting” (raising), because all var are “hoisted” (raised) to the top of the function.

//--------------------REMEMBER--------------------
// Declarations are hoisted, but assignments are not.

function sayHi() {
   console.log(phrase);

   var phrase = 'Hello';
}

sayHi(); // undefined

// The declaration is processed at the start of function execution (“hoisted”), but the assignment always works at the place where it appears
function sayHi() {
   var phrase; // declaration works at the start...

   console.log(phrase);

   phrase = 'Hello'; // ... assignment - when the execution reaches it
}

sayHi(); // undefined

//--------------------REMEMBER--------------------
/*  - Variables var have no block scope, they are visible minimum at the function level.
    - Variable declarations are processed at function start.
*/

function sayHi() {
   phrase = 'Hello'; // is an implicit declaration, which is an error in strict mode, but works fine otherwise. It's functionally equivalent to `var phrase = "Hello";`

   if (false) {
      let phrase; // `let phrase` declares a new variable _in it's own scope_ (the if block)
   }

   console.log(phrase);
}

sayHi(); // Hello

function sayHi() {
   phrase = 'Hello';

   let phrase;

   console.log(phrase);
}

sayHi(); // Error: phrase is not defined
