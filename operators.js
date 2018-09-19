"use strict"

// Binary +     string concatenation
// If the binary + is applied to strings, it merges (concatenates) them
let str = "My" + "String";
console.log(str); // MyString

console.log("1" + 2); // 12
console.log("2" + 1); // 21
console.log(2 + 2 + "1"); // 41

/* --------------------REMEMBER--------------------
    - If any of the operands is a string, then the other one is converted to a string too
    - Operations run from left to right. If there are two numbers followed by a string, the numbers will be added before being converted to a string
*/

/*  String concatenation and conversion is a special feature of the binary plus +. 
    Other arithmetic operators work only with numbers. They always convert their operands to numbers. */
console.log(2 - "1"); // 1
console.log("6" / "2"); // 3


// TASK 1 - What are results of these expressions?
console.log("" + 1 + 0); // "10"
console.log("" - 1 + 0); // -1
console.log(true + false); // 1
console.log(6 / "3"); // 2
console.log("2" * "3"); // 6
console.log(4 + 5 + "px"); // "9px"
console.log("4" + "5"); // "45"
console.log("$" + 4 + 5); // "$45"
console.log("4" - 2); // 2
console.log("4px" - 2); // NaN
console.log(7 / 0); // Infinity
console.log("  -9\n" + 5);
/* 
"  -9
5"
*/
console.log("  -9\n" - 5); // -14
console.log(null + 1); // 1
console.log(undefined + 1); // NaN

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Unary +      Numeric conversion
/*  The unary plus or, in other words, the plus operator + applied to a single value, doesn’t do anything with numbers,
    but if the operand is not a number, then it is converted into it. */

// No effect on numbers
let x = 1;
console.log(+x); // 1

let y = -2;
console.log(+y); // -2

// Converts non-numbers
console.log(+true); // 1
console.log(+"");   // 0

let apple = "2";
let orange = "3";

console.log(apple + orange); // "23"    binary + concatenate strings
console.log(+apple + +orange); // 5     both values converted to numbers before the binary plus

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Assignment =
// The assignment operator "=" returns a value
let a = 1;
let b = 2;

let c = 3 - (a = b + 1);

console.log(a); // 3
console.log(c); // 0

// TASK 2
// What are the values of a and x after the code below?
let a = 2;

let x = 1 + (a *= 2);

console.log(x); // 5

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Remainder %
// The result of a % b is the remainder of the integer division of a by b
console.log(8 % 2); // 0
console.log(5 % 2); // 1

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Exponentation **
// For a natural number b, the result of a ** b is a multiplied by itself b times
console.log(3 ** 5); // 243
console.log(4 ** 2); // 16
console.log(4 ** (1 / 2)); // 2

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Increment ++ / Decrement --

// Increment ++ increases a variable by 1
let counter = 2;
counter++;
console.log(counter); // 3

// Decrement -- decreases a variable by 1
let counter2 = 3;
counter2--;
console.log(counter2); // 2

/*  Operators ++ and -- can be placed both after and before the variable.
    - When the operator goes after the variable, it is called a “postfix form”: counter++.
    - The “prefix form” is when the operator stands before the variable: ++counter.
*/
let preCounter = 1;
let a = ++preCounter; // the prefix call ++counter increments counter and returns the new value that is 2

console.log(a); // 2

let postCounter = 1;
let b = postCounter++; // the postfix form counter++ also increments counter, but returns the old value (prior to increment)

console.log(b); // 1

// TASK 3
// What are the final values of all variables a, b, c and d after the code below?
let a = 1, b = 1;

let c = ++a; // 2
let d = b++; // 1
console.log(c, d); // 2 1

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Bitwise operators (Rarely used)
/*  The list of operators:
    - AND ( & )
    - OR ( | )
    - XOR ( ^ )
    - NOT ( ~ )
    - LEFT SHIFT ( << )
    - RIGHT SHIFT ( >> )
    - ZERO-FILL RIGHT SHIFT ( >>> ) */

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Modify-in-place

let n = 2;
n += 5;
console.log(n); // 7    same as: n = n + 5

let m = 4;
m *= 2 + 3;
console.log(m); // 20

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Comma ,
// The comma operator allows us to evaluate several expressions, dividing them with a comma ,.
// Each of them is evaluated, but the result of only the last one is returned.
let a = (1 + 2, 3 + 4);
console.log(a); // 7 (the result of 3 + 4)