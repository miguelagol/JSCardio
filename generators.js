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

// Generator composition is a special feature of generators that allows to transparently “embed” generators in each other.

/* generateSequence(start, end) generate a sequence of:
      - digits 0..9 (character codes 48…57),
      - followed by alphabet letters a..z (character codes 65…90)
      - followed by uppercased letters A..Z (character codes 97…122)
*/
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
    // 0...9
    yield* generateSequence(48, 57);

    // A...Z
    yield* generateSequence(65, 90);

    // a...z
    yield* generateSequence(97, 122);
}

let string = '';

for (let code of generatePasswordCodes()) {
    string += String.fromCharCode(code);
}

console.log(string); // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

// The special yield* directive is responsible for the composition.
// It delegates the execution to another generator.
// It runs generators and transparently forwards their yields outside, as if they were done by the calling generator itself.

// the same as
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
    for (let i = 48; i <= 57; i++) yield i;

    for (let i = 65; i <= 90; i++) yield i;

    for (let i = 97; i <= 122; i++) yield i;
}

let string = '';

for (let code of generatePasswordCodes()) {
    string += String.fromCharCode(code);
}

console.log(string); // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

//-----------------------------------------------------------------------------------------

// “yield” is a two-way road
// Yield not only returns the result outside, but also can pass the value inside the generator.

// To do so, we should call generator.next(arg), with an argument. That argument becomes the result of yield.
function* gen() {
    // Pass a question to the outer code and wait for an answer
    let result = yield '2 + 2?';

    console.log(result);
}

let generator = gen();

let question = generator.next().value;

console.log(question); // 2 + 2?

generator.next(4); // 4

/* The first call generator.next() is always without an argument.
   It starts the execution and returns the result of the first yield (“2+2?”). At this point the generator pauses the execution.
   Then the result of yield gets into the question variable in the calling code.
   On generator.next(4), the generator resumes, and 4 gets in as the result: let result = 4.
*/

function* gen2() {
    let ask1 = yield '2 + 2?';

    console.log(ask1); // 4

    let ask2 = yield '3 * 3?';

    console.log(ask2); // 9
}

let generator2 = gen2();

console.log(generator2.next().value); // "2 + 2?"

console.log(generator2.next(4).value); // "3 * 3?"

console.log(generator2.next(9).done); // true

/* 1. The first .next() starts the execution… It reaches the first yield.
   2. The result is returned to the outer code.
   3. The second .next(4) passes 4 back to the generator as the result of the first yield, and resumes the execution.
   4. …It reaches the second yield, that becomes the result of the generator call.
   5. The third next(9) passes 9 into the generator as the result of the second yield
      and resumes the execution that reaches the end of the function, so done: true.
*/

//-----------------------------------------------------------------------------------------

// generator.throw
// Generator can also initiate (throw) an error there. That’s natural, as an error is a kind of result.
// To pass an error into a yield, we should call generator.throw(err). In that case, the err is thrown in the line with that yield.
function* gen() {
    try {
        let result = yield '2 + 2?';
        console.log('The execution does not reach here, because the exception is thrown above');
    } catch (e) {
        console.log(e); // shows the error
    }
}

let generator = gen();

let question = generator.next().value;

generator.throw(new Error('The answer is not found in my database')); // Error: The answer is not found in my database

function* generate() {
    let result = yield '2 + 2?';
}

let generator = generate();

let question = generator.next().value;

try {
    generator.throw(new Error('The answer is not found in my database'));
} catch (e) {
    console.log(e); // Error: The answer is not found in my database
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// Async iteration
// Asynchronous iterators allow to iterate over data that comes asynchronously, on-demand.

// Regular iterable object
let range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        return {
            current: this.from,
            last: this.to,

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

for (let value of range) {
    console.log(value); // 1  2  3  4  5
}

//--------------------REMEMBER--------------------
/* To make the object iterable asynchronously:
      1. We need to use Symbol.asyncIterator instead of Symbol.iterator.
      2. next() should return a promise.
      3. To iterate over such an object, we should use for await (let item of iterable) loop.
*/
let asyncRange = {
    from: 1,
    to: 5,

    [Symbol.asyncIterator]() {
        return {
            current: this.from,
            last: this.to,

            // The next() method doesn’t have to be async, it may be a regular method returning a promise, but async allows to use await inside
            async next() {
                // (automatically wrapped into a promise by async)

                await new Promise(resolve => setTimeout(resolve, 1000));

                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            },
        };
    },
};

// It calls range[Symbol.asyncIterator]() once, and then its next() for values.
(async () => {
    for await (let value of asyncRange) {
        console.log(value);
    }
})();

/* 	                                    Iterators	      Async iterators
Object method to provide iteraterable	   Symbol.iterator	Symbol.asyncIterator
next() return value is	                  any value	      Promise
to loop, use	                           for..of	         for await..of
*/

//--------------------REMEMBER--------------------
// The spread operator doesn’t work asynchronously

//-----------------------------------------------------------------------------------------

// Async generators

// Regular generator
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (let value of generateSequence(1, 5)) {
    console.log(value); // 1  2  3  4  5
}

// async generator
async function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

(async () => {
    let generator = generateSequence(1, 5);

    for await (let value of generator) {
        console.log(value);
    }
})(); // 1  2  3  4  5

// Technically, another the difference of an async generator is that
// its generator.next() method is now asynchronous also, it returns promises.
// Instead of result = generator.next() for a regular, non-async generator, values can be obtained like this:
result = await generator.next(); // result = {value: ..., done: true/false}

//-----------------------------------------------------------------------------------------

// Iterables via async generators

// When we'd like to make an object iterable, we should add Symbol.iterator to it
// A common practice for Symbol.iterator is to return a generator, rather than a plain object with next

// Iterable generator
let range = {
    from: 1,
    to: 5,

    *[Symbol.iterator]() {
        for (let value = this.from; value <= this.to; value++) {
            yield value;
        }
    },
};

for (let value of range) {
    console.log(value); // 1, 2, 3, 4, 5
}

// If we'd like to add async actions into the generator, then we should replace Symbol.iterator with async Symbol.asyncIterator
let asyncRange = {
    from: 1,
    to: 5,

    async *[Symbol.asyncIterator]() {
        for (let value = this.from; value <= this.to; value++) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            yield value;
        }
    },
};

(async () => {
    for await (let value of asyncRange) {
        console.log(value);
    }
})(); // 1  2  3  4  5

//-----------------------------------------------------------------------------------------

// Real-life example
async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;

    while (url) {
        const response = await fetch(url, {
            // We should make a request to URL in the form https://api.github.com/repos/<repo>/commits.
            headers: { 'User-Agent': 'Our script' }, // github requires user-agent header
        });

        const body = await response.json();
        // It responds with a JSON of 30 commits, and also provides a link to the next page in the Link header.

        let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
        nextPage = nextPage && nextPage[1];

        url = nextPage;

        for (let commit of body) {
            yield commit;
        }
    }
}

(async () => {
    let count = 0;
    let repo = 'iliakan/javascript-tutorial-en';

    for await (const commit of fetchCommits(repo)) {
        console.log(commit.author.login);

        if (++count == 100) {
            break;
        }
    }
})();

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Pseudo-random generator
/* When we need random data (text, numbers etc), in Javascript, we could use Math.random(). 
   But if something goes wrong, we’d like to be able to repeat the test, using exactly the same data.
   For that, so called “seeded pseudo-random generators” are used. They take a “seed”, the first value,
   and then generate next ones using a formula. So that the same seed yields the same sequence,
   and hence the whole flow is easily reproducible. We only need to remember the seed to repeat it.
*/
function* pseudoRandom(seed) {
    let value = seed;

    for (let i = 0; i < 5; i++) {
        value = (value * 16807) % 2147483647;
        yield value;
    }
}

let generator = pseudoRandom(1);

console.log(generator.next().value); // 16807
console.log(generator.next().value); // 282475249
console.log(generator.next().value); // 1622650073

function* pseudoRandom2(seed) {
    let value = seed;

    while (true) {
        value = (value * 16807) % 2147483647;
        yield value;
    }
}

let generator2 = pseudoRandom2(1);

console.log(generator2.next().value); // 16807
console.log(generator2.next().value); // 282475249
console.log(generator2.next().value); // 1622650073
