/* --------------------REMEMBER--------------------
There are 7 basic types in JavaScript.
    - number - for numbers of any kind: integer or floating-point.
    - string - for strings. A string may have one or more characters, there’s no separate single-character type.
    - boolean - for true/false.
    - null - for unknown values – a standalone type that has a single value null.
    - undefined - for unassigned values – a standalone type that has a single value undefined.
    - object - for more complex data structures.
    - symbol - for unique identifiers.
*/

// NUMBER
let n = 27;
n = 15.42;

// Besides regular numbers, there are so-called “special numeric values” which also belong to that type: Infinity, -Infinity and NaN.

console.log(1 / 0); // Infinity
console.log('not a number' / 3 + 4); // NaN

//------------------------------------------------------------------------------------------------------------------------------------------------------

// STRING
// In JavaScript, there are 3 types of quotes.

let str = "Hello"; // Double quotes
let str2 = 'Hello'; // Single quotes
let str3 = `Hello`; // Backticks - They allow us to embed variables and expressions into a string by wrapping them in ${…}

// embed a variiable
console.log(`Hi, Hey, ${str}`); // Hi, Hey, Hello

// embed an expresion
console.log(`The result is ${1 + 2}`); // The result is 3

console.log("The result is ${1+2}"); // The result is ${1+2}

//------------------------------------------------------------------------------------------------------------------------------------------------------

// BOOLEAN
// The boolean type has only two values: true and false

let nameFieldChecked = true;
let ageFieldChecked = false;

//------------------------------------------------------------------------------------------------------------------------------------------------------

// NULL value
// It’s just a special value which has the sense of “nothing”, “empty” or “value unknown”

let age = null;

//------------------------------------------------------------------------------------------------------------------------------------------------------

// UNDEFINED value
// The meaning of undefined is “value is not assigned”

let x;
console.log(x); // undefined

//------------------------------------------------------------------------------------------------------------------------------------------------------

// The TYPEOF operator
/*  
The typeof operator returns the type of the argument.
It supports two forms of syntax:
    - As an operator: typeof x.
    - Function style: typeof(x).
*/

console.log(typeof 6); // number
console.log(typeof "6"); // string
console.log(typeof "John"); // string
console.log(typeof 0); // number
console.log(typeof null); // object !!! - This is an officially recognized ERROR of typeof
console.log(typeof undefined); // undefined
console.log(typeof true); // boolean
console.log(typeof Symbol("id")); // symbol
console.log(typeof Math); // object


/* --------------------REMEMBER--------------------
The typeof operator allows us to see which type is stored in the variable.
    - Two forms: typeof x or typeof(x).
    - Returns a string with the name of the type, like "string".
    - For null returns "object" – that’s an error in the language, it’s not an object in fact.
*/

//------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - What is the output of the script?
let name = "John";

console.log(`Hello ${1}`); // Hello 1
console.log(`Hello ${"name"}`); // Hello name
console.log(`Hello ${name}`); // Hello John