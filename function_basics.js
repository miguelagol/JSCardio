// Functions
/*  function name(parameters, delimited, by, comma) {
        // The body of the functions
    }
*/
// Function Declaration
// a function, declared as a separate statement, in the main code flow.
function showMessage() {
   console.log('Hello everyone!');
}

showMessage(); // Hello everyone!

// Function Expression
// a function, created inside an expression or inside another syntax construct. Here, the function is created at the right side of the “assignment expression” =:
let sayHi = function() {
   console.log('Hello everyone!');
}; // it must be ; here, because is variable

sayHi(); // Hello everyone!
console.log(sayHi); // [Function: sayHi]

let func = sayHi; // without paretheses!
// (If there were, then func = sayHi() would write the result of the call sayHi() into func, not the function sayHi itself)

func(); // Hello everyone!

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Local variables
function showMessage1() {
   let message = "Hello, I'm JavaScript!"; // it's a local variable
   console.log(message);
}

showMessage1();

console.log(message); // Error: message is not defined

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Outer variables - Global
// Global variables are visible from any function (unless shadowed by locals).
let name = 'John'; // it's a outer variable
function showMessage2() {
   console.log(`Hello, ${name}`);
}

showMessage2();

function changeName() {
   name = 'Bob'; // changed the outer variable

   let message = 'Hello, ' + name;
   console.log(message);
}

console.log(name); // John (before the function call)

changeName(); // Hello, Bob

console.log(name); // Bob (the value was modified by the function)

//--------------------REMEMBER--------------------
// The outer variable is only used if there’s no local one. So an occasional modification may happen if we forget let.

let userName = 'John';

function showMessage3() {
   let userName = 'Bob'; // declare a local variable

   let message = 'Hello, ' + userName;
   console.log(message);
}

showMessage3(); // Hello, Bob (the function will create and use its own userName)

console.log(userName); // John (unchanged, the function did not access the outer variable)

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Parameters - function arguments
function showMessage4(from, text) {
   // arguments: from, text
   console.log(from + ': ' + text);
}

showMessage4('Ann', 'Hello!'); // Ann: Hello!
showMessage4('Ann', "What's up?"); // Ann: What's up?

function showMessage5(from, text) {
   from = '*' + from + '*';
   console.log(from + ': ' + text);
}

let from = 'Ann';

showMessage5(from, 'Hello'); // *Ann*: Hello

console.log(from); // Ann (the value of "from" is the same, the function modified a local copy of parameters)

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Default values
// If a parameter is not provided, then its value becomes undefined.
function showMessage6(from, text) {
   console.log(from + ': ' + text);
}

showMessage6('Ann'); // Ann: undefined

function showMessage7(from, text = 'no text given') {
   console.log(from + ': ' + text);
}

showMessage7('Ann'); // Ann: no text given

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Returning a value
// A function can return a value back into the calling code as the result.
function sum(a, b) {
   return a + b;
}

let result = sum(1, 2);
console.log(result); // 3

// There may be many occurrences of return in a single function.
function checkAge(age) {
   if (age > 18) {
      return true;
   } else {
      return confirm('Got a permission from the parents?');
   }
}

let age = prompt('How old are you?', 18);

if (checkAge(age)) {
   alert('Access granted');
} else {
   alert('Access denied');
}

// It is possible to use return without a value.
function showMovie(age) {
   if (!checkAge(age)) {
      return;
   }

   alert('Showing you the movie'); // if checkAge(age) returns false, then showMovie won’t proceed to the alert
   // ...
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Naming a function
// Functions are actions. So their name is usually a verb.

/*  Function starting with:
    - "get…" – return a value,
    - "calc…" – calculate something,
    - "create…" – create something,
    - "check…" – check something and return a boolean, etc.
*/
/*  showMessage(..)     // shows a message
    getAge(..)          // returns the age (gets it somehow)
    calcSum(..)         // calculates a sum and returns the result
    createForm(..)      // creates a form (and usually returns it)
    checkPermission(..) // checks a permission, returns true/false
*/
// One function – one action

function showPrimes(n) {
   for (let i = 2; i < n; i++) {
      if (!isPrime(i)) continue;
      console.log(i);
   }
}

function isPrime(n) {
   for (let i = 2; i < n; i++) {
      if (n % i == 0) return false;
   }
   return true;
}
showPrimes(22);

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Callback functions
function ask(question, yes, no) {
   if (confirm(question)) yes();
   else no();
}

function showOk() {
   alert('You agreed.');
}

function showCancel() {
   alert('You canceled the execution.');
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask('Do you agree?', showOk, showCancel);

// the same as:
function ask2(question, yes, no) {
   if (confirm(question)) yes();
   else no();
}

ask2(
   'Do you agree?',
   function() {
      alert('You agreed.');
   },
   function() {
      alert('You canceled the execution.');
   },
);
//--------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------REMEMBER-------------------
/*  A Function Expression is created when the execution reaches it and is usable from then on.
    Once the execution flow passes to the right side of the assignment let sayHi = function… – here we go, the function is created and can be used (assigned, called etc) from now on.

    A Function Declaration is usable in the whole script/code block.
    When JavaScript prepares to run the script or a code block, it first looks for Function Declarations in it and creates the functions.
    As a result, a function declared as a Function Declaration can be called earlier than it is defined.
*/
sayHi('John'); // Hello, John

function sayHi(name) {
   console.log(`Hello, ${name}`);
}

// vs
sayHi('John'); // Error: sayHi is not defined

let sayHi = function(name) {
   // (*) no magic any more
   console.log(`Hello, ${name}`);
};

//--------------------REMEMBER-------------------
// When a Function Declaration is made within a code block, it is visible everywhere inside that block. But not outside of it.

let age = prompt('What is your age?', 18);

if (age < 18) {
   welcome(); // Hello! | for age = 16
   function welcome() {
      alert('Hello!');
   }
   welcome(); // Hello! | for age = 16
} else {
   function welcome() {
      alert('Greetings!');
   }
}

welcome(); // Error: welcome is not defined

// fix it
let age = prompt('What is your age?', 18);
let welcome;
if (age < 18) {
   welcome = function() {
      alert('Hello!');
   };
   welcome(); // Hello!
} else {
   welcome = function() {
      alert('Greetings!');
   };
}

welcome(); // Hello! / Greetings!

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Arrow functions
// let func = (arg1, arg2, ...argN) => expression
/*  …This creates a function func that has arguments arg1..argN,
    evaluates the expression on the right side with their use and returns its result.
    
--------------------REMEMBER--------------------    
    With arrow functions, if your function has a “concise body” (a fancy way for saying one line function),
    then you can omit the “return” keyword and the value will be returned automatically (or implicitly).

    The second major benefit as to why arrow functions are great, they don’t create their own context.
    What that means is that typically the this keyword Just Works™ without you having to worry about 
    what context a specific function is going to be invoked in. 
*/

let sum = (a, b) => a + b;

/*  The arrow function is a shorter form of:

    let sum = function(a, b) {
        return a + b;
    };
*/

console.log(sum(1, 2)); // 3

// If we have only one argument, then parentheses can be omitted
let double = n => n * 2;

console.log(double(3)); // 6

// If there are no arguments, parentheses should be empty (but they should be present)
let sayHi = () => console.log('Hello!');

sayHi(); // Hello!

let age = prompt('What is your age?', 18);

let welcome = age < 18 ? () => alert('Hello') : () => alert('Greetings!');

welcome(); // ok now

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Multiline arrow functions
let sum = (a, b) => {
   // the curly brace opens a multiline function
   let result = a + b;
   return result; // if we use curly braces, use return to get results
};

console.log(sum(1, 2)); // 3

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Rewrite the function using '?' or '||'
/*  function checkAge(age) {
        if (age > 18) {
            return true;
        } else {
            return confirm('Do you have your parents permission to access this page?');
        }
    }
*/
function checkAge(age) {
   return age > 18
      ? true
      : confirm('Do you have your parents permission to access this page?');
}

function checkAge2(age) {
   return (
      age > 18 ||
      confirm('Do you have your parents permission to access this page?')
   );
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Function min(a, b)
function min(a, b) {
   if (a < b) {
      return a;
   } else return b;
}

console.log(min(11, 19));
console.log(min(11, 7));
console.log(min(1, -3));

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Function pow(x,n)
function pow(x, n) {
   let result = 1;
   for (let i = 1; i <= n; i++) {
      result *= x;
   }
   return result;
}

console.log(pow(3, 2));

let x = prompt('x?', '');
let n = prompt('n?', '');

if (n < 0) {
   alert('Please use an integer greather than 0');
} else {
   alert(pow(x, n));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Rewrite with arrow functions
/*  function ask(question, yes, no) {
        if (confirm(question)) yes()
        else no();
    }
  
    ask("Do you agree?",
        function() { alert("You agreed."); },
        function() { alert("You canceled the execution."); } ); 
*/
let ask = confirm('Do you agree?')
   ? () => alert('You agreed.')
   : () => alert('You canceled the execution.');

ask();
