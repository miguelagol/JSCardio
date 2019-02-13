// We may decide to execute a function not right now, but at a certain time later.
// That’s called “scheduling a call”.
/*  There are two methods for it:
    -   setTimeout allows to run a function once after the interval of time.
    -   setInterval allows to run a function regularly with the interval between the runs.
*/

// setTimeout
// let timerId = setTimeout(func|code, delay[, arg1, arg2...])
/*  func|code   - Function or a string of code to execute. Usually, that’s a function.
                  For historical reasons, a string of code can be passed, but that’s not recommended.
    delay       - The delay before run, in milliseconds (1000 ms = 1 second).
    arg1, arg2… - Arguments for the function (not supported in IE9-)
*/
function sayHi() {
   console.log('Hello');
}

setTimeout(sayHi, 1000); // Hello

// or with arguments
function sayHi2(phrase, name) {
   console.log(phrase + ' ' + name);
}

setTimeout(sayHi2, 1000, 'Hello', 'Jack'); // Hello Jack

// pass a function but don't run it
// don't add brackets () after the function)
setTimeout(sayHi(), 1000); // TypeError [ERR_INVALID_CALLBACK]: Callback must be a function

//----------------------------------------------------------------------------------------

// Canceling with clearTimeout
// A call to setTimeout returns a “timer identifier” timerId that we can use to cancel the execution.
// let timerId = setTimeout(...);
// clearTimeout(timerId);

let timerId = setTimeout(() => console.log('Hi'), 1000);

console.log(timerId); // Timeout { _called: false, _idleTimeout: 1000, ...} Hi
// in a browser (with alert) the timer identifier is a number

clearTimeout(timerId);

// the same identifier - doesn't become null after canceling
console.log(timerId); // Timeout { _called: false, _idleTimeout: 1000, ...}

//------------------------------------------------------------------------------------------------------------------------------------------

// setInterval
// let timerId = setInterval(func|code, delay[, arg1, arg2...])
// setInterval runs the function not only once, but regularly after the given interval of time
let timerId = setInterval(() => console.log('tick'), 1000);

setTimeout(() => {
   clearInterval(timerId);
   console.log('stop');
}, 3500); //   tick    tick    tick  stop

// In browsers IE and Firefox the internal timer continues “ticking” while showing alert/confirm/prompt,
// but in Chrome, Opera and Safari the internal timer becomes “frozen”.

//------------------------------------------------------------------------------------------------------------------------------------------

// Recursive setTimeout
// There is second way of running something regularly

// instead of:
// let timerId = setInterval(() => console.log('tick'), 2000);

let timerId = setTimeout(function tick() {
   console.log('tick');
   timerId = setTimeout(tick, 2000);
}, 2000);

let clear = setTimeout(() => clearTimeout(timerId), 8500);

// The recursive setTimeout is a more flexible method than setInterval.
// This way the next call may be scheduled differently, depending on the results of the current one.
// Recursive setTimeout guarantees the fixed delay between the executions, setInterval – does not.
// That’s because a new call is planned at the end of the previous one.

//------------------------------------------------------------------------------------------------------------------------------------------

// setTimeout(…,0)
// There’s a special use case: setTimeout(func, 0).
// This schedules the execution of func as soon as possible.
// But scheduler will invoke it only after the current code is complete.
setTimeout(() => console.log('World'), 0); // So the function is scheduled to run “right after” the current code.
//In other words, asynchronously.
console.log('Hello'); // Hello World

//------------------------------------------------------------------------------------------------------------------------------------------

// Splitting CPU-hungry tasks
let i = 0;
let start = Date.now();

function count() {
   // do a heavy job
   for (let j = 0; j < 1e9; j++) {
      i++;
   }

   console.log("Done in " + (Date.now() - start) + 'ms');
}

count();

// Let’s split the job using the nested setTimeout
let i = 0;
let start = Date.now();

function count() {
   // do a piece of the heavy job
   do {
      i++;
   } while (i % 1e9 != 0);

   if (i == 1e9) {
      console.log("Done in " + (Date.now() - start) + 'ms');
   } else {
      setTimeout(count, 0)
   }
}

count();

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Output every second
// setInteval
function printNumbers(from, to) {
   let i = from;
   let count = setInterval(print, 1000);

   function print() {
      console.log(i);
      i++;
      if (i > to) clearInterval(count);
   }
}

printNumbers(3, 10);

// recursive setTimeout
function printNumbers(from, to) {
   let i = from;
   let count = setTimeout(function print() {
      console.log(i);
      i++;
      count = setTimeout(print, 1000)
      if (i > to) clearTimeout(count);
   }, 1000);
}

printNumbers(3, 12);

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Rewrite setTimeout with setInterval
// setTimeout
let i = 0;
let start = Date.now();

function count() {
   if (i == 1000000000) {
      console.log("Done in " + (Date.now() - start) + 'ms');
   } else {
      setTimeout(count, 0);
   }

   // a piece of heavy job
   for (let j = 0; j < 1000000; j++) {
      i++;
   }
}

count();

// setInterval
let i = 0;
let start = Date.now();
let timer = setInterval(count, 0);

function count() {
   for (let j = 0; j < 1000000; j++) {
      i++;
   }
   if (i == 1000000000) {
      console.log("Done in " + (Date.now() - start) + 'ms');
      clearInterval(timer);
   }
}

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - What will setTimeout show?
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// assume that the time to execute this function is >100ms
for (let j = 0; j < 100000000; j++) {
   i++;
}

// Any setTimeout will run only after the current code has finished.
// The i will be the last one: 100000000.
