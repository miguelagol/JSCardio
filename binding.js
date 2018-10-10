/*  The “this” keyword allows you to decide which object should be focal when invoking a function or a method.
    The only way you can tell what the this keyword is referencing is by looking at where the function using the this keyword was invoked.
*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Call
// function.call(thisArg, arg1, arg2, ...)
// “call” is a method on every function that allows you to invoke the function specifying in what context the function will be invoked.

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Apply
// function.apply(thisArg, [argsArray])
let numbers = [5, 6, 2, 3, 7];

var max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

var min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Bind
// function.bind(thisArg[, arg1[, arg2[, ...]]])
let checkBind = {
    x: 42,
    getX: function () {
        return this.x;
    }
}

let unboundGetX = checkBind.getX;
console.log(unboundGetX()); // undefined (The function gets invoked at the global scope)

let boundGetX = unboundGetX.bind(checkBind);
console.log(boundGetX()); // 42

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Binding
/*  1.  Implicit Binding
    2.  Explicit Binding
    3.  new Binding
    4.  Lexical Binding
    5.  window Binding
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
        }
    }
}

/*  In order to figure out what the this keyword is referencing, first, look to the left of the dot when the function is invoked.
    If there is a “dot”, look to the left of that dot to find the object that the this keyword is referencing.
*/
user.greet() // Hello, my name is Tyler
user.mother.greet() // Hello, my name is Stacey

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Explicit Binding
function greet() {
    console.log(`Hello, my name is ${this.name}`);
}

const user = {
    name: 'Tyler',
    age: 27,
}

//  the first argument you pass to call will be what the this keyword inside that function is referencing.
greet.call(user); // Hello, my name is Tyler


function greet2(l1, l2, l3) {
    console.log(`Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`);
}

const languages = ['JavaScript', 'CSS', 'HTML'];

greet2.call(user, languages[0], languages[1], languages[2]); // Hello, my name is Tyler and I know JavaScript, CSS, and HTML
greet2.apply(user, languages); // Hello, my name is Tyler and I know JavaScript, CSS, and HTML

//  .bind is the exact same as .call but instead of immediately invoking the function, it’ll return a new function that you can invoke at a later time
const newFn = greet2.bind(user, languages[0], languages[1], languages[2]);
newFn() // Hello, my name is Tyler and I know JavaScript, CSS, and HTML

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// new Binding
function User(name, age) {

    /* const this = Object.create(User.prototype)   //  JavaScript creates a new object called `this` which delegates to the User's prototype on failed lookups. If a function is called with the new keyword,
                                                        then it's this new object that interpretor created that the this keyword is referencing. */
    this.name = name,
        this.age = age

    // return this
}

const me = new User('Tyler', 27);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Lexical Binding
const user = {
    name: 'Tyler',
    age: 27,
    languages: ['JavaScript', 'Ruby', 'Python'],
    greet() {
        const hello = `Hello, my name is ${this.name} and I know`

        const langs = this.languages.reduce(function (str, lang, i) {
            if (i === this.languages.length - 1) {
                return `${str} and ${lang}.`
            }

            return `${str} ${lang},`
        }.bind(this), "")               // We need to specify that we want the anonymous function we pass to .reduce to be invoked in the context of user.

        console.log(hello + langs)
    }
};

user.greet()

// vs arrow function

const user2 = {
    name: 'Tyler',
    age: 27,
    languages: ['JavaScript', 'Ruby', 'Python'],
    greet() {
        const hello = `Hello, my name is ${this.name} and I know`

        const langs = this.languages.reduce((str, lang, i) => {
            if (i === this.languages.length - 1) {
                return `${str} and ${lang}.`
            }

            return `${str} ${lang},`
        }, "")

        console.log(hello + langs)
    }
};

user2.greet()

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// window/global Binding
function sayAge() {
    console.log(`My age is ${this.age}`)
}

const user = {
    name: 'Tyler',
    age: 27
}

sayAge();

global.age = 21;
sayAge()

/*  As of ES5, if you have “strict mode” enabled, JavaScript will do the right thing and instead of defaulting to the window object will just keep “this” as undefined.

    'use strict'

    window.age = 27

    function sayAge () {
        console.log(`My age is ${this.age}`)
    }

    sayAge() // TypeError: Cannot read property 'age' of undefined
*/