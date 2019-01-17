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
// The new Lexical Environment gets the enclosing one as the outer reference, so phrase can be found.
// But all variables and Function Expressions declared inside if reside in that Lexical Environment and can’t be seen from the outside.
let phrase = 'Hello';

if (true) {
   let user = 'Jack';

   console.log(`${phrase}, ${user}`); // Hello, Jack
}

console.log(user); // Error: user is not defined

//--------------------------------------------------------------------------------------------

// for, while
// For a loop, every iteration has a separate Lexical Environment.
for (let i = 0; i < 10; i++) {
   // each loop has its own Lexical Environment
}
// That’s actually an exception, because let i is visually outside of {...}.
// But in fact each run of the loop has its own Lexical Environment with the current i in it.

console.log(i); // Error: i is not defined

//--------------------------------------------------------------------------------------------

// code blocks
{
   // do some job with local variables
   let message = 'Hello';

   console.log(message); // Hello
}

console.log(message); // Error: message is not defined

//--------------------------------------------------------------------------------------------

// IIFE
// In old scripts, one can find so-called “immediately-invoked function expressions”
// a Function Expression is created and immediately called.
(function() {
   let message = 'Hello';

   console.log(message); // Hello
})();
// The Function Expression is wrapped with parenthesis (function {...}),
// because when JavaScript meets "function" in the main code flow, it understands it as the start of a Function Declaration.
// But a Function Declaration must have a name

// So, parenthesis are needed to show JavaScript that the function is created in the context of another expression,
// and hence it’s a Function Expression. It needs no name and can be called immediately.
// There are other ways to tell JavaScript that we mean Function Expression:

(function() {
   console.log('Brackets around the function');
})();

(function() {
   console.log('Brackets around the whole thing');
})();

!(function() {
   console.log('Bitwise NOT operator starts the expression');
})();

+(function() {
   console.log('Unary plus starts the expression');
})();

//------------------------------------------------------------------------------------------------------------------------

// Garbage Collection

//  - Lexical Environment is cleaned up after the function run
function func() {
   let value = 123;
   let value2 = 456;
}

func(); // after func() finishes that Lexical Environment becomes unreachable, so it’s deleted from the memory.

//  - If there’s a nested function that is still reachable after the end of func,
//    then its [[Environment]] reference keeps the outer lexical environment alive as well:
function func() {
   let value = 123;

   function func2() {
      console.log(value);
   }

   return func2;
}

let func2 = func(); // g is reachable, and keeps the outer lexical environment in memory

func2(); // 123

//  -  if f() is called many times, and resulting functions are saved, then the corresponding Lexical Environment objects will also be retained in memory
function func() {
   let value = Math.random();

   return function() {
      console.log(value);
   };
}

// 3 functions in array, every one of them links to Lexical Environment from the corresponding f() run
let arr = [func(), func(), func()];

//  - A Lexical Environment object dies when it becomes unreachable: when no nested functions remain that reference it.
function func() {
   let value = 123;

   function func2() {
      console.log(value);
   }

   return func2;
}

let func2 = func(); // while func2 is alive there corresponding Lexical Environment lives

func2 = null; // ...and now the memory is cleaned up

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
('use strict');
let phrase = 'Hello';

if (true) {
   let user = 'John';

   function sayHi2() {
      console.log(`${phrase}, ${user}`);
   }
}

sayHi2(); //  Hello, John
//            Error: sayHi is not defined, in strict mode

//------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Sum with closures
function sum(a) {
   return function(b) {
      console.log(a + b);
   };
}
sum(1)(2); // 3
sum(5)(-1); // 4

//------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Filter through function
function inBetween(a, b) {
   return function(item) {
      return a <= item && item <= b;
   };
}

function inArray(array) {
   return function(item) {
      for (let arg of array) {
         if (arg === item) {
            return item;
         }
      }
   };
}

function inArray2(array) {
   return function(item) {
      return array.includes(item);
   };
}
let arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr.filter(inBetween(3, 6))); // [3, 4, 5, 6]

console.log(arr.filter(inArray([1, 2, 10]))); // [1, 2]

console.log(arr.filter(inArray2([1, 3, 7, 10]))); // [1, 3, 7]

//------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Sort by field

function byField(field) {
   switch (field) {
      case 'name':
         return function(a, b) {
            return a.name > b.name ? 1 : -1;
         };
      case 'surname':
         return function(a, b) {
            return a.surname > b.surname ? 1 : -1;
         };
      case 'age':
         return function(a, b) {
            return a.age > b.age ? 1 : -1;
         };
   }
}

function byField2(field) {
   return function(a, b) {
      return a[field] > b[field] ? 1 : -1;
   };
}
let users = [
   { name: 'John', age: 20, surname: 'Johnson' },
   { name: 'Pete', age: 18, surname: 'Hathaway' },
   { name: 'Ann', age: 19, surname: 'Peterson' },
];

console.log(users.sort(byField('name')));
console.log(users.sort(byField('age')));
console.log(users.sort(byField('surname')));

console.log(users.sort(byField2('name')));
console.log(users.sort(byField2('age')));
console.log(users.sort(byField2('surname')));

//------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Army of functions
function makeArmy() {
   let shooters = [];

   for (let i =0; i < 10; i++){
      let shooter = function() {
         console.log(i); // should show its number
      };
      shooters.push(shooter);
   }

   return shooters;
}

let army = makeArmy();

army[0]();
army[5]();
