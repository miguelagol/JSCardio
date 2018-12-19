// Lexical Environment
/* Lexical environment object consists of two parts:
      - Environment Record - an object that has all local variables as its properties (and some other information like the value of this)
      - A reference to the outer lexical environment, usually the one associated with the code lexically right outside of it
        (outside of the current curly brackets)
*/

// Global Lexical Environment - associated with the whole script
// only one lexical environment
let phrase = 'Hello';

console.log(phrase); // Hello

//                   Changes Lexical Environment
// execution start   <empty>
let phrase2; //      phrase2: undefined
phrase2 = 'Hi'; //   phrase2: Hi
phrase2 = 'Bye'; //  phrase2: Bye

//--------------------REMEMBER-------------------
/*    -  A variable is a property of a special internal object, associated with the currently executing block/function/script.
      -  Working with variables is actually working with the properties of that object.
*/

//------------------------------------------------------------------------------------------------------------------------

// Function declaration
// Function Declarations are processed not when the execution reaches them, but when a Lexical Environment is created.
// For the global Lexical Environment, it means the moment when the script is started.
// That is why we can call a function declaration before it is defined.

//                         Changes Lexical Environment
// execution start         say: function
let phrase = 'Hello'; //   phrase: Hello

function say() {
   //                      say: function
   console.log(phrase); // phrase: Hello
}

//------------------------------------------------------------------------------------------------------------------------

// Inner and outer Lexical Environment
// When a function runs, a new function Lexical Environment is created automatically.

//                                        Lexical Environment     New Lexical Environment
// execution start                        say: function
let phrase = 'Hello'; //                  phrase: Hello
//                                        outer                   inner (the Inner Lexical Environment has the outer reference)
function say(name) {
   //                                     say: function           name: Pete
   console.log(`${phrase}, ${name}`); //  phrase: Hello
}

say('Pete');

/*    When code wants to access a variable – it is first searched for in the inner Lexical Environment, then in the outer one,
      then the more outer one and so on until the end of the chain.
      If a variable is not found anywhere, that’s an error in strict mode.
      Without use strict, an assignment to an undefined variable creates a new global variable, for backwards compatibility.
*/

//--------------------REMEMBER-------------------
// A function gets outer variables as they are now; it uses the most recent values.

let foo = 'blach';

function x() {
   const foo = 'fooo';
   return function y() {
      return 'Misio ma ' + foo + ' lat';
   };
}
console.log(x()());
