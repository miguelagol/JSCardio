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

// Expresions
// Expressions are Javascript code snippets that result in a single value. 
2 + 2 * 3 / 2

(Math.random() * (100 - 20)) + 20

functionCall()

1+1, 2+2, 3+3

true && functionCall()

true && declaredVariable

// Statements
// Statements perform actions
//--------------------REMEMBER--------------------
/*  In javascript, statements can never be used where a value is expected.
    So they cannot be used as function arguments, right-hand side of assignments, operators operand, return values…
*/

// A function declaration is a statement
function foo(func) {
   return func.name;
}

// A function expression is an expression, what you call an anonymous function
console.log(foo(function() {}));

// A named function expression is an expression
console.log(foo(function myName() {}));

if (true) {
   function foo () {} // top level of block, declaration
}

function foo () {} //global level, declaration

function foo () {
   function bar() {} //top level of block, declaration
}

function foo () {
   return function bar () {} // named function expression
}

foo(function () {}) // anonymous function expression

function foo () {
   return function bar () {
      function baz () {} // top level of block, declaration
   }
}

// SyntaxError: function statement requires a name
// function () {} 

// if (true){
//    function () {} //SyntaxError: function statement requires a name
// }

// Converting Expressions to Statements: Expression Statements
// You can convert expressions to expression statement, just by adding a semi-colon to the end of the line
2 + 2 // expression
2 + 2; // expression statement