// Lexical Environment
/* Lexical environment object consists of two parts:
      - Environment Record - an object that has all local variables as its properties (and some other information
        like the value of this)
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
/*  A function gets outer variables as they are now; it uses the most recent values.
    
    One call – one Lexical Environment
    A new function Lexical Environment is created each time a function runs.
    And if a function is called multiple times, then each invocation will have its own Lexical Environment,
    with local variables and parameters specific for that very run.
*/
//------------------------------------------------------------------------------------------------------------------------

// Nested function
// A function is called “nested” when it is created inside another function.
function sayHiBye(firstName, lastName) {
   // helper nested function to use below
   function getFullName() {
      return firstName + ' ' + lastName;
   }

   console.log('Hello, ' + getFullName());
   console.log('Bye, ' + getFullName());
}

// or

// At that starting moment there is only makeCounter function,
// because it’s a Function Declaration. It did not run yet.

// All functions “on birth” receive a hidden property [[Environment]] with a reference to the Lexical Environment
// of their creation.
// Here, makeCounter is created in the global Lexical Environment, so [[Environment]] keeps a reference to it.
// In other words, a function is “imprinted” with a reference to the Lexical Environment where it was born.
// And [[Environment]] is the hidden function property that has that reference.
function makeCounter() {
   let count = 0;

   return function() {
      return count++;
   };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

// For every call to makeCounter() a new function Lexical Environment is created, with its own counter.
// So the resulting counter functions are independent.
let counter2 = makeCounter();

console.log(counter2()); // 0

//--------------------REMEMBER-------------------
/*  A closure is a function that remembers its outer variables and can access them.
    That is: they automatically remember where they were created using a hidden [[Environment]] property,
    and all of them can access outer variables.
    all functions in JavaScript are closures
*/

//------------------------------------------------------------------------------------------------------------------------

// Code blocks and loops, IIFE
// Lexical Environments also exist for code blocks {...}

// if
let phrase = 'Hello';

if (true) {
   let user = 'Jack';

   console.log(`${phrase}, ${user}`); // Hello, Jack
}

console.log(user); // Error: user is not defined

// for, while
// For a loop, every iteration has a separate Lexical Environment.
for (let i = 0; i < 10; i++) {
   // each loop has its own Lexical Environment
}

console.log(i); // Error: i is not defined

// code blocks
{
   // do some job with local variables
   let message = 'Hello';

   console.log(message); // Hello
}

console.log(message); // Error: message is not defined

// IIFE
// In old scripts, one can find so-called “immediately-invoked function expressions”
// a Function Expression is created and immediately called.
(function() {
   let message = 'Hello';

   console.log(message); // Hello
})();

/* function() {
  let  message = 'Hello';

  console.log(message); // Hello
}(); */

//------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Are counters independent?
function makeCounter() {
   let count = 0;

   return function() {
      return count++;
   };
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1

console.log(counter2()); // ?
console.log(counter2()); // ?

// Yes
// 0, 1

//------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Counter object - Will it work? What will it show?
function Counter() {
   let count = 0;

   this.up = function() {
      return ++count;
   };
   this.down = function() {
      return --count;
   };
}

let counter = new Counter();

console.log(counter.up()); // ?
console.log(counter.up()); // ?
console.log(counter.down()); // ?

// yes
// 1, 2, 1

//------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Function in if - What will be result of the call at the last line?
let phrase = 'Hello';

if (true) {
   let user = 'John';

   function sayHi2() {
      console.log(`${phrase}, ${user}`);
   }
}

sayHi2(); // ?
console.log(user);

// Error: ?

//------------------------------------------------------------------------------------------------------------------------

// TASK 4 -

//------------------------------------------------------------------------------------------------------------------------

// TASK 5 -

let foo = 'blach';

function x() {
   const foo = 'fooo';
   return function y() {
      return 'Misio ma ' + foo + ' lat';
   };
}
console.log(x()());
