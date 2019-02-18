/*  The “this” keyword allows you to decide which object should be focal when invoking a function or a method.
    The only way you can tell what the this keyword is referencing is by looking at where the function using the this keyword was invoked.
*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Binding
/*  1.  Implicit Binding
    2.  Explicit Binding
    3.  new Binding
    4.  Lexical Binding
    5.  window Binding
*/

// Determining this
// Ask these questions in this order and stop when the first rule applies
/*  1.  Is the function called with new (new binding)?
        If so, this is the newly constructed object
    let bar = new foo()

    2.  Is the function called with call or apply (explicit binding),
        even hidden inside a bind hard biniding?
        If so, this is the explicity specified object
    let bar = foo.call(obj1)

    3.  Is the function called with a context (implicit binding),
        otherwise known as an owning or containing object?
        If so, this is that context object
    let bar = obj1.foo()

    4.  Otherwise, default the this (default binding).
        If in strict mode, pick undefined, otherwise pick the global object
    let bar = foo()
*/

// Implicit Binding
const user = {
   name: 'Tyler',
   age: 27,
   greet() {
      console.log(`Hello, my name is ${this.name}`); // user.name
   },
   mother: {
      name: 'Stacey',
      greet() {
         console.log(`Hello, my name is ${this.name}`); // user.mother.name
      },
   },
};

/*  In order to figure out what the this keyword is referencing, first, look to the left of the dot when the function is invoked.
    If there is a “dot”, look to the left of that dot to find the object that the this keyword is referencing.
*/
user.greet(); // Hello, my name is Tyler
user.mother.greet(); // Hello, my name is Stacey

function foo() {
   console.log(this.a);
}

let object1 = {
   a: 42,
   foo,
};

let object2 = {
   a: 2,
   object1,
};

object2.object1.foo(); // 42

//--------------------------------------------------------------------------------------

// Implicity Lost

function foo() {
   console.log(this.a);
}

let object = {
   a: 2,
   foo,
};

let bar = object.foo;

bar(); // undefined

function foo() {
   console.log(this.a);
}

function doFoo(fn) {
   fn(); // <-- call-site
}

let object = {
   a: 2,
   foo,
};

doFoo(object.foo); // undefined

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Explicit Binding
function greet() {
   console.log(`Hello, my name is ${this.name}`);
}

const user = {
   name: 'Tyler',
   age: 27,
};

//  the first argument you pass to call will be what the this keyword inside that function is referencing.
greet.call(user); // Hello, my name is Tyler

function greet2(l1, l2, l3) {
   console.log(
      `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`,
   );
}

const languages = ['JavaScript', 'CSS', 'HTML'];

greet2.call(user, languages[0], languages[1], languages[2]); // Hello, my name is Tyler and I know JavaScript, CSS, and HTML
greet2.apply(user, languages); // Hello, my name is Tyler and I know JavaScript, CSS, and HTML

//  .bind is the exact same as .call but instead of immediately invoking the function, it’ll return a new function that you can invoke at a later time
const newFn = greet2.bind(user, languages[0], languages[1], languages[2]);
newFn(); // Hello, my name is Tyler and I know JavaScript, CSS, and HTML

newFn.call(global); // Hello, my name is Tyler and I know JavaScript, CSS, and HTML
// newFn HARD binds greet2's "this" to user, so that it cannot be overriden

//--------------------------------------------------------------------------------------

// Call
// function.call(thisArg, arg1, arg2, ...)
// “call” is a method on every function that allows you to invoke the function specifying in what context the function will be invoked.

function identify() {
   return this.name.toUpperCase();
}

function speak() {
   var greeting = "Hello, I'm " + identify.call(this);
   console.log(greeting);
}

var me = {
   name: 'Kyle',
};

var you = {
   name: 'Reader',
};

identify.call(me);
identify.call(you);

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER

//--------------------------------------------------------------------------------------

// Apply
// function.apply(thisArg, [argsArray])
let numbers = [5, 6, 2, 3, 7];

let max = Math.max.apply(null, numbers);

console.log(max); // 7

let min = Math.min.apply(null, numbers);

console.log(min); // 2

function foo(something) {
   console.log(this.a, something);
   return this.a + something;
}

let object = {
   a: 2,
};

let bar = function() {
   return foo.apply(object, arguments);
};

let b = bar(3); // 2 3
console.log(b); // 5

//--------------------------------------------------------------------------------------

// Bind
// function.bind(thisArg[, arg1[, arg2[, ...]]])
let checkBind = {
   x: 42,
   getX: function() {
      return this.x;
   },
};

let unboundGetX = checkBind.getX;
console.log(unboundGetX()); // undefined (The function gets invoked at the global scope)

let boundGetX = unboundGetX.bind(checkBind);
console.log(boundGetX()); // 42

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// new Binding
function User(name, age) {
   /* const this = Object.create(User.prototype)   //  JavaScript creates a new object called `this` which delegates to the User's prototype on failed lookups. If a function is called with the new keyword,
                                                        then it's this new object that interpretor created that the this keyword is referencing. */
   (this.name = name), (this.age = age);

   // return this
}

const me = new User('Tyler', 27);
console.log(me.name); // Tyler

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Lexical Binding
const user = {
   name: 'Tyler',
   age: 27,
   languages: ['JavaScript', 'Ruby', 'Python'],
   greet() {
      const hello = `Hello, my name is ${this.name} and I know`;

      const langs = this.languages.reduce(
         function(str, lang, i) {
            if (i === this.languages.length - 1) {
               return `${str} and ${lang}.`;
            }

            return `${str} ${lang},`;
         }.bind(this),
         '',
      ); // We need to specify that we want the anonymous function we pass to .reduce to be invoked in the context of user.

      console.log(hello + langs);
   },
};

user.greet();

// vs arrow function

const user2 = {
   name: 'Tyler',
   age: 27,
   languages: ['JavaScript', 'Ruby', 'Python'],
   greet() {
      const hello = `Hello, my name is ${this.name} and I know`;

      const langs = this.languages.reduce((str, lang, i) => {
         if (i === this.languages.length - 1) {
            return `${str} and ${lang}.`;
         }

         return `${str} ${lang},`;
      }, '');

      console.log(hello + langs);
   },
};

user2.greet();

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Default (window/global) Binding
function sayAge() {
   console.log(`My age is ${this.age}`);
}

const user = {
   name: 'Tyler',
   age: 27,
};

sayAge(); // My age is undefined

global.age = 21;
sayAge(); // My age is 21

/*  As of ES5, if you have “strict mode” enabled, JavaScript will do the right thing and instead of defaulting to the window object will just keep “this” as undefined.

    'use strict'

    window.age = 27

    function sayAge () {
        console.log(`My age is ${this.age}`)
    }

    sayAge() // TypeError: Cannot read property 'age' of undefined
*/

function foo() {
   console.log(this.a);
}

let a = 'bar';

foo();

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Everything in order

// Which is more precedent, implict binding or explicit binding?
function foo() {
   console.log(this.a);
}

let obj1 = {
   a: 1,
   foo,
};

let obj2 = {
   a: 2,
   foo,
};

obj1.foo(); // 1
obj2.foo(); // 2

obj1.foo.call(obj2); // 2
obj2.foo.call(obj1); // 1

// What about New Binding?
function foo(something) {
   this.a = something;
}

let obj1 = {};

let bar = foo.bind(obj1);
bar(1);
console.log(obj1.a); // 1

let baz = new bar(2);
console.log(obj1.a); // 1
console.log(baz.a); // 2

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// *Ignored this
// If you pass null or undefined as a this binding parameter to call, apply or bind,
// those values are effectively ignored, and instead the default binding rule applies to the invocation.
function foo(a, b) {
   console.log('a:' + a + ' b:' + b);
}

foo.apply(null, [2, 3]); // a:2 b:3

let bar = foo.bind(null, 1);
bar(5); // a:1 b:5

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Losing 'this'
let user = {
   firstName: 'John',
   sayHi() {
      console.log(`Hello, ${this.firstName}!`);
   },
};

setTimeout(user.sayHi, 1000); // Hello, undefined!

// the same as
let func = user.sayHi;
setTimeout(func, 1000); // Hello, undefined!

// The method setTimeout in-browser is a little special: it sets this=window for the function call (for Node.JS, this becomes the timer object)

//--------------------------------------------------------------------------------------

// Solution 1: a wrapper
let user = {
   firstName: 'John',
   sayHi() {
      console.log(`Hello, ${this.firstName}!`);
   },
};

setTimeout(() => user.sayHi(), 1000); // Hello, John!

// It's ok but there is a slight vulnerability
// What if before setTimeout triggers (there’s one second delay!) user changes value
let user = {
   firstName: 'John',
   sayHi() {
      console.log(`Hello, ${this.firstName}!`);
   },
};

// it will call the wrong object!
setTimeout(() => user.sayHi(), 1000); // Another user in setTimeout

user = {
   sayHi() {
      console.log('Another user in setTimeout');
   },
};

//--------------------------------------------------------------------------------------

// Solution 2: bind
let user = {
   firstName: 'Jack',
};

function func(phrase) {
   console.log(phrase + ' ' + this.firstName);
}

let funcUser = func.bind(user);
funcUser('Hello, '); // Hello, Jack

// work with object methods
let user = {
   firstName: 'Jack',
   say(phrase) {
      console.log(`${phrase}, ${this.firstName}!`);
   },
};

let say = user.say.bind(user);

say('Hello'); // Hello, Jack!
say('Bye'); // Bye, Jack!

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Bound function as a method
// What will be the output?
function f() {
   console.log(this); // ?
}

let user = {
   g: f.bind(null),
};

user.g(); // global object

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Second bind
// What will be the output?
function f() {
   console.log(this.name);
}

f = f.bind({ name: 'John' }).bind({ name: 'Ann' });

f(); // John

// The exotic bound function object returned by f.bind(...) remembers the context (and arguments if provided) only at creation time.
// A function cannot be re-bound.

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Function property after bind
function sayHi() {
   console.log(this.name);
}
sayHi.test = 5;

let bound = sayHi.bind({
   name: 'John',
});

console.log(bound.test); // undefined

// The result of bind is another object. It does not have the test property.

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Ask losing this
function askPassword(ok, fail) {
   let password = prompt('Password?', '');
   if (password == 'rockstar') ok();
   else fail();
}

let user = {
   name: 'John',

   loginOk() {
      alert(`${this.name} logged in`);
   },

   loginFail() {
      alert(`${this.name} failed to log in`);
   },
};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

