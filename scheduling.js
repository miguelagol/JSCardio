// We may decide to execute a function not right now, but at a certain time later. That’s called “scheduling a call”.
/*  There are two methods for it:
    -   setTimeout allows to run a function once after the interval of time.
    -   setInterval allows to run a function regularly with the interval between the runs.
*/

// setTimeout
// let timerId = setTimeout(func|code, delay[, arg1, arg2...])
/*  func|code   - Function or a string of code to execute. Usually, that’s a function. For historical reasons, a string of code can be passed, but that’s not recommended.
    delay       - The delay before run, in milliseconds (1000 ms = 1 second).
    arg1, arg2… - Arguments for the function (not supported in IE9-)
*/
function sayHi() {
   console.log('Hello');
}

setTimeout(sayHi, 1000);

// or
function sayHi2(phrase, name) {
   console.log(phrase + ' ' + name);
}

setTimeout(sayHi2, 1000, 'Hello', 'Jack'); // don't add brackets () after the function

//----------------------------------------------------------------------------------------

// Canceling with clearTimeout
let timerId = setTimeout(() => console.log('Hi'), 1000);

console.log(timerId); // Timeout { _called: false, _idleTimeout: 1000, ...}
// in a browser (with alert) the timer identifier is a number

clearTimeout(timerId);

// the same identifier - doesn't become null after canceling
console.log(timerId); // Timeout { _called: false, _idleTimeout: 1000, ...}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
