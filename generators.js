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

console.log(JSON.stringify(three)); // {"value":3,"done":true}

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
function* generateSequence() {
   yield 1;
   yield 2;
   return 3;
}

let generator = generateSequence();

for (let value of generator) {
   console.log(value); // 1, 2
}

// It doesn’t show 3!
// for..of iteration ignores the last value, when done: true
// if we want all results to be shown, we must return them with yield
function* generateSequence() {
   yield 1;
   yield 2;
   yield 3;
}

let generator = generateSequence();

for (let value of generator) {
   console.log(value); // 1, 2, 3
}

// We can call iterable functionality
function* generateSequence() {
   yield 1;
   yield 2;
   yield 3;
}

let sequence = [0, ...generateSequence()];

console.log(sequence); // [ 0, 1, 2, 3 ]

//-----------------------------------------------------------------------------------------

// Using generators instead of iterables

// iterables version
let range = {
   from: 1,
   to: 5,

   // for..of calls this method once in the very beginning
   [Symbol.iterator]() {
      // it returns the iterator object
      return {
         current: this.from,
         last: this.to,

         // next() is called on each iteration by the for..of loop
         next() {
            if (this.current <= this.last) {
               return { done: false, value: this.current++ };
            } else {
               return { done: true };
            }
         },
      };
   },
};

console.log([...range]); // [ 1, 2, 3, 4, 5 ]

// generators version
function* generateSequence(start, end) {
   for (let i = start; i <= end; i++) {
      yield i;
   }
}

let sequence = [...generateSequence(1, 5)];

console.log(sequence); // [ 1, 2, 3, 4, 5 ]

//-----------------------------------------------------------------------------------------

// Converting Symbol.iterator to generator
let range = {
   from: 1,
   to: 5,

   *[Symbol.iterator]() {
      // a shorthand for [Symbol.iterator]: function*()
      for (let value = this.from; value <= this.to; value++) {
         yield value;
      }
   },
};

console.log([...range]); // [ 1, 2, 3, 4, 5 ]
// The range object is now iterable

/* That works pretty well, because when range[Symbol.iterator] is called:
   -  it returns an object (now a generator)
   -  that has .next() method
   -  that returns values in the form {value: ..., done: true/false}
*/

//-----------------------------------------------------------------------------------------

// Generator composition

//-----------------------------------------------------------------------------------------

// “yield” is a two-way road

//-----------------------------------------------------------------------------------------

// generator.throw

//-----------------------------------------------------------------------------------------------------------------------------------------
