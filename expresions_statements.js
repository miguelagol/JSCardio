/* 
There are two major syntactic categories in Javascript:
    1. Statements
        These are all javascript statements:
            - if
            - if-else
            - while
            - do-while
            - for
            - switch
            - for-in
            - with (deprecated)
            - debugger
            - variable declaration
    2. Expressions
        - Expressions produce value
        - Expressions don’t necessarily change state
*/

//---------------------------------------------------------------------------------------------------------------------------------------------

// Expresions
// Expressions are Javascript code snippets that result in a single value.
2 + (2 * 3) / 2

(Math.random() * (100 - 20)) + 20

functionCall()

1 + 1, 2 + 2, 3 + 3

true && functionCall()

true && declaredVariable

//---------------------------------------------------------------------------------------------------------------------------------------------

// Statements
// Statements perform actions
//--------------------REMEMBER--------------------
/*  In javascript, statements can never be used where a value is expected.
    So they cannot be used as function arguments, right-hand side of assignments, operators operand, return values…
*/

//---------------------------------------------------------------------------------------------------------------------------------------------

// A function declaration is a statement
function foo(func) {
   return func.name;
}

// A function expression is an expression, what you call an anonymous function
console.log(foo(function() {}));

// A named function expression is an expression
console.log(foo(function myName() {}));

/* -  Whenever you declare a function where Javascript is expecting a value, it will attempt to treat it as a value,
      if it can’t use it as a value, an error will be thrown. 
   -  Whereas declaring a function at the global level of a script, module, or top level of a block statement
      (that is, where it is not expecting a value), will result in a function declaration.
*/
if (true) {
   function foo() {} // top level of block, declaration
}

function foo() {} //global level, declaration

function foo() {
   function bar() {} //top level of block, declaration
}

function foo() {
   return function bar() {}; // named function expression
}

foo(function() {}); // anonymous function expression

function foo() {
   return function bar() {
      function baz() {} // top level of block, declaration
   };
}

// SyntaxError: function statement requires a name
// function () {}

// if (true){
//    function () {} //SyntaxError: function statement requires a name
// }

//---------------------------------------------------------------------------------------------------------------------------------------------

// Converting Expressions to Statements: Expression Statements
// You can convert expressions to expression statement, just by adding a semi-colon to the end of the line
2 + 2 // expression
2 + 2; // expression statement
// foo(2+2;) // SyntaxError

//---------------------------------------------------------------------------------------------------------------------------------------------

// Semi-colon vs Comma operator
// With semi-colon, you can keep multiple statements on the same line
const a; function foo () {}; const b = 2;

// The comma operator allows you to chain multiple expression, returning only the last expression
console.log((1 + 2, 3, 4)); //4

console.log((2, 9 / 3, function() {})); // function (){}

console.log((3, true ? 2 + 2 : 1 + 1)) // 4

//---------------------------------------------------------------------------------------------------------------------------------------------

// IIFEs (Immediately Invoked Function Expressions)
// An anonymous function can be an expression, if we use it where Javascript is expecting a value

// is invalid
// function () {};
// is valid
(function() {});

// If putting a anonymous function inside a parentheses immediately returns the same anonymous function, that means we can call it straight away
(function() {
   console.log('Immediately invoke anonymous function call');
})(); // "immediately invoke anonymous function call"

console.log(
   (function() {
      return 3;
   })()
);// 3

(function(a) {
    console.log(a);
})("I'm an argument"); // I'm an argument
