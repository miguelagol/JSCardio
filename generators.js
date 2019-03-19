// Generators

/* Regular functions return only one, single value (or nothing).
   Generators can return (“yield”) multiple values,
   possibly an infinite number of values, one after another, on-demand.
*/

// Generator function
// syntax construct: function*
function* generateSequence() {
   yield 1;
   yield 2;
   return 3;
}

// When generateSequence() is called, it does not execute the code.
// Instead, it returns a special object, called “generator”.
let generator = generateSequence();

// The generator object can be perceived as a 'frozen function call'
// Upon creation, the code execution is paused at the very beginning

// The main method of a generator is next()
// When called, it resumes execution till the nearest yield <value> statement
// Then the execution pauses, and the value is returned to the outer code
function* generateSequence() {
   yield 1;
   yield 2;
   return 3;
}

let generator = generateSequence();

let one = generator.next();

console.log(JSON.stringify(one)); // {"value":1,"done":false}
/* The result of next() is always an object
      -  value: the yielded value
      -  done: false if the code is not finished yet, otherwise true
*/

let two = generator.next();

console.log(JSON.stringify(two)); // {"value":2,"done":false}

let three = generator.next();

console.log(JSON.stringify(three)) // {"value":3,"done":true}

// If we make the new call generator.next() they return the same object: {done, true}
// There’s no way to “roll back” a generator. But we can create another one by calling generateSequence().

//--------------------REMEMBER--------------------
/* The most important thing to understand is that generator functions, unlike regular function, do not run the code.
   They serve as “generator factories”. Running function* returns a generator, and then we ask it for values.
*/

/* function* f(…) or function *f(…)?
   Both syntaxes are correct, but usually the first syntax is preferred, as the star * denotes that it’s a generator function,
   it describes the kind, not the name, so it should stick with the function keyword.
*/

//-----------------------------------------------------------------------------------------

// Generators are iterable

//-----------------------------------------------------------------------------------------

// Using generators instead of iterables

//-----------------------------------------------------------------------------------------

// Converting Symbol.iterator to generator

//-----------------------------------------------------------------------------------------

// Generator composition

//-----------------------------------------------------------------------------------------

// “yield” is a two-way road

//-----------------------------------------------------------------------------------------

// generator.throw

//-----------------------------------------------------------------------------------------------------------------------------------------

