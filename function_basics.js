// Functions
// In JavaScript, functions are objects.
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
// a function, created inside an expression or inside another syntax construct. Here, the function is created
// at the right side of the “assignment expression” =:
let sayHi = function() {
   console.log('Hello everyone!');
}; // it must be ; here, because is variable

sayHi(); // Hello everyone!

console.log(sayHi); // [Function: sayHi]

let func = sayHi; // without paretheses!
// (If there were, then func = sayHi() would write the result of the call sayHi() into func, not the function sayHi itself)

func(); // Hello everyone!

let func2 = sayHi();

console.log(func2); // Hello everyone!      undefined

func2(); // Error: func2 is not a function

//-----------------------------------------------------------------------------------------------------------------------------------------

// Local variables
function showMessage1() {
   let message = "Hello, I'm JavaScript!"; // it's a local variable
   console.log(message);
}

showMessage1(); // Hello, I'm JavaScript!

console.log(message); // Error: message is not defined

//-----------------------------------------------------------------------------------------------------------------------------------------

// Outer variables - Global
// Global variables are visible from any function (unless shadowed by locals).
let name = 'John'; // it's a outer variable
function showMessage2() {
   console.log(`Hello, ${name}`);
}

showMessage2(); // Hello, John

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

//-----------------------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------------------

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

showPrimes(5); // 2, 3

//------------------------------------------------------------------------------------------

// 'name' property
// a function’s name is accessible as the “name” property
function sayHi() {
   alert('Hi');
}

console.log(sayHi.name); // sayHi

// It also assigns the correct name to functions that are used in assignments
let sayHi2 = function() {
   alert('Hi');
};

console.log(sayHi2.name); // sayHi2

// It also works if the assignment is done via a default value
function f(sayHi3 = function() {}) {
   console.log(sayHi3.name);
}

f(); // sayHi3

// In the specification, this feature is called a “contextual name”.
// If the function does not provide one, then in an assignment it is figured out from the context.

// Object methods have names too
let user = {
   sayHi() {},
   sayBye: function() {},
};

console.log(user.sayHi.name); // sayHi
console.log(user.sayBye.name); // sayBye

// There are cases when there’s no way to figure out the right name
let arr = [function() {}];

console.log(arr[0].name); // '' (empty string)

//-----------------------------------------------------------------------------------------------------------------------------------------

// 'length' property
// built-in property “length” returns the number of function parameters
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

console.log(f1.length); // 1
console.log(f2.length); // 2
console.log(many.length); // 2 (est parameters are not counted)

function ask(question, ...handlers) {
   let isYes = confirm(question);

   // for positive answer, both handlers are called
   // for negative answer, only the second one
   for (let handler of handlers) {
      if (handler.length == 0) {
         if (isYes) handler();
      } else {
         handler(isYes);
      }
   }
}

// Once a user provides their answer, the function calls the handlers. We can pass two kinds of handlers:
//    - A zero-argument function, which is only called when the user gives a positive answer.
//    - A function with arguments, which is called in either case and returns an answer.
ask('Question?', () => alert('You said yes'), result => alert(result));

// This is a particular case of so-called polymorphism – treating arguments differently depending on their type or,
// in our case depending on the length.

//-----------------------------------------------------------------------------------------------------------------------------------------

// Custom properties
// We can add properties of our own
function sayHi() {
   console.log('Hi');

   sayHi.counter++;
}

sayHi.counter = 0; // initial value

sayHi();
sayHi();

console.log(`Called ${sayHi.counter} times`); // Called 2 times

//--------------------REMEMBER-------------------
// A property is not a variable
// A property assigned to a function like sayHi.counter = 0 does not define a local variable counter inside it.
// In other words, a property counter and a variable let counter are two unrelated things.

// Function properties can replace closures sometimes.
function makeCounter() {
   // instead of:
   // let count = 0

   function counter() {
      return counter.count++;
   }

   counter.count = 0;

   return counter;
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1

// Be careful
// The count is now stored in the function directly, not in its outer Lexical Environment.

// If you use a closure...
// the value of count lives in an outer variable, then external code is unable to access it.
// Only nested functions may modify it.
function makeCounter() {
   let count = 0;

   return function() {
      return count++;
   };
}

let counter = makeCounter();

// But if you don't use closure...
// And if it’s bound to a function, then such a thing is possible:
function makeCounter() {
   function counter() {
      return counter.count++;
   }

   counter.count = 0;

   return counter;
}

let counter = makeCounter();
counter.count = 15;

console.log(counter()); // 15...

//-----------------------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------------------

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
sayHi2('John'); // Error: sayHi2 is not defined

let sayHi2 = function(name) {
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

//-----------------------------------------------------------------------------------------------------------------------------------------

// Named Function Expression (NFE)
// Function Expressions that have a name

// ordinary Function Expression
let sayHello = function(who) {
   console.log(`Hello, ${who}`);
};

// NFE
let sayHello = function func(who) {
   console.log(`Hello, ${who}`);
};

sayHello('Jack'); // Hello, Jack

/* There are two special things about the name func:
      - It allows the function to reference itself internally.
      - It is not visible outside of the function.
*/
let sayHello = function func(who) {
   if (who) {
      console.log(`Hello, ${who}`);
   } else {
      func('Guest'); // use func to re-call itself
   }
};

sayHello('Ann'); // Hello, Ann
sayHello(); // Hello, Guest

// but
func(); // Error: func is not defined

// Why do we use func?
// Because he value of sayHello may change
let sayHello = function(who) {
   if (who) {
      console.log(`Hello, ${who}`);
   } else {
      sayHello('Guest');
   }
};

let welcome = sayHello;
sayHello = null;

welcome(); // Error: sayHello is not a function

//-----------------------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------------------

// Multiline arrow functions
let sum = (a, b) => {
   // the curly brace opens a multiline function
   let result = a + b;
   return result; // if we use curly braces, use return to get results
};

console.log(sum(1, 2)); // 3

//-----------------------------------------------------------------------------------------------------------------------------------------

// The 'new Function'
// let func = new Function ([arg1[, arg2[, ...argN]],] function body)
// names for function parameters go first and the body is last
// All arguments are strings
let sum = new Function('a', 'b', 'return a+b');

console.log(sum(1, 2)); // 3

// if there are no arguments, then there's only single argument, the body function
let sayHi = new Function('console.log("Hello")');

sayHi(); // Hello

// The major difference from other ways we’ve seen is that the function is created literally from a string, that is passed at run time
// new Function allows to turn any string into a function. For example, we can receive a new function from a server and then execute it
let str = '... receive the code from a server dynamically ...';

let func = new Function(str);
func();

//------------------------------------------------------------------------------------------

// Closure
/* Usually, a function remembers where it was born in the special property [[Environment]].
   It references the Lexical Environment from where it’s created.

But when a function is created using new Function, its [[Environment]] references not the current Lexical Environment,
but instead the global one.
*/
function getFunc() {
   let value = 'test';

   let func = new Function('console.log(value)');

   return func;
}

getFunc()(); // Error: value is not defined

function getNewFunc() {
   let value = 'test';

   let func = function() {
      console.log(value);
   };

   return func;
}

getNewFunc()(); // test

//-----------------------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Function min(a, b)
function min(a, b) {
   if (a < b) {
      return a;
   } else return b;
}

console.log(min(11, 19));
console.log(min(11, 7));
console.log(min(1, -3));

//-----------------------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Set and decrease for counter
function makeCounter(...handlers) {
   function counter() {
      return counter.count++;
   }
   counter.count = 0;

   return counter;
}

let countIt = makeCounter();

countIt.set = function(value) {
   return (countIt.count = value);
};

countIt.decrease = function() {
   return (countIt.count -= 1);
};

console.log(countIt()); // 0
console.log(countIt()); // 1

console.log(countIt.set(23)); // 23
console.log(countIt.decrease()); // 22

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Sum with an arbitrary amount of brackets

function sum(value) {
   var result = value;

   function func(value2) {
      result += value2;
      return func;
   }

   func.toString = function() {
      return result;
   };

   return func;
}

console.log(sum(1)(2)); // 1 + 2
console.log(sum(1)(2)(3)); // 1 + 2 + 3
console.log(sum(5)(-1)(2));
console.log(sum(6)(-1)(-2)(-3));
console.log(sum(0)(1)(2)(3)(4)(5));
