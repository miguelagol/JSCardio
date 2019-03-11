// Callbacks
// Many actions in JavaScript are asynchronous.
function loadScript(src) {
   let script = document.createElement('script');
   script.src = src;
   document.head.append(script);
}
// When this function adds the <script src="…"> to the document, the browser loads and executes it.
// We can use it like this
loadScript('/my/script.js'); // the script has "function newFunction() {…}"
// The function is called “asynchronously,” because the action (script loading) finishes not now, but later.
// The code below loadScript doesn't wait for the script loading to finish

// we’d like to run the new function which is inside the script
newFunction(); // that wouldn't work, no such function!

// So let's add a callback function
function loadScript(src, callback) {
   let script = document.createElement('script');
   script.src = src;

   script.onload = () => callback(script);

   document.head.append(script);
}

// if we want to call new functions from the script, we should write that in the callback
// That’s called a “callback-based” style of asynchronous programming.
loadScript(
   'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
   // the callback runs after the script is loaded
   script => {
      alert(`Cool, the ${script.src} is loaded`);
      alert(_); // function declared in the loaded script
   },
);

//-----------------------------------------------------------------------------------------

// Callback in callback
// How to load two scripts sequentially?
// Solution for few actions
loadScript('/my/script.js', function(script) {
   alert(`Cool, the ${script.src} is loaded, let's load one more`);

   loadScript('/my/script2.js', function(script) {
      alert(`Cool, the second script is loaded, let's load one more`);

      loadScript('/my/script3.js', function(script) {
         // ...continue after all scripts are loaded
      });
   });
});

//-----------------------------------------------------------------------------------------

// Handling errors
function loadScript(src, callback) {
   let script = document.createElement('script');

   script.src = src;

   script.onload = () => callback(null, script);
   script.onerror = () => callback(new Error(`Script load error for ${src}`));

   document.head.append(script);
}

// the “error-first callback” style
loadScript('/my/script.js', function(error, script) {
   if (error) {
      // handle error
   } else {
      // script loaded successfully
   }
});

//-----------------------------------------------------------------------------------------

// Pyramid of Doom / Callback Hell
// The “pyramid” of nested calls grows to the right with every asynchronous action.
// This way of coding isn’t very good
loadScript('1.js', function(error, script) {
   if (error) {
      handleError(error);
   } else {
      // ...
      loadScript('2.js', function(error, script) {
         if (error) {
            handleError(error);
         } else {
            // ...
            loadScript('3.js', function(error, script) {
               if (error) {
                  handleError(error);
               } else {
                  // ...continue after all scripts are loaded (*)
               }
            });
         }
      });
   }
});

// We can try to alleviate the problem by making every action a standalone function
loadScript('1.js', step1);

function step1(error, script) {
   if (error) {
      handleError(error);
   } else {
      // ...
      loadScript('2.js', step2);
   }
}

function step2(error, script) {
   if (error) {
      handleError(error);
   } else {
      // ...
      loadScript('3.js', step3);
   }
}

function step3(error, script) {
   if (error) {
      handleError(error);
   } else {
      // ...continue after all scripts are loaded (*)
   }
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// Promise Object
/* Syntax:
   let promise = new Promise(function(resolve, reject) {
      // executor (the producing code)
   });
*/
/* The function passed to new Promise is called the executor. When the promise is created, this executor function runs automatically.
   It contains the producing code, that should eventually produce a result.

   The resulting promise object has internal properties:
    - state — initially “pending”, then changes to either “fulfilled” or “rejected”,
    - result — an arbitrary value of your choosing, initially undefined.

  When the executor finishes the job, it should call one of the functions that it gets as arguments:
    - resolve(value) — to indicate that the job finished successfully:
        sets state to "fulfilled",
        sets result to value.
    - reject(error) — to indicate that an error occurred:
        sets state to "rejected",
        sets result to error.
*/
// Fulfilled promise
let promise = new Promise(function(resolve, reject) {
   // The executor receives two arguments: resolve and reject — these functions are pre-defined by the JavaScript engine.
   // We should write the executor to call them when ready.
   setTimeout(() => resolve('done!'), 1000);
}); // calls resolve('done') ->  state: 'fulfilled'  result: 'done'

// Rejected promise
let promise = new Promise(function(resolve, reject) {
   setTimeout(() => reject(new Error('Whooops!'), 1000));
}); // calls reject(error) ->   state: 'rejected'   result: error

/* The executor should do a job (something that takes time usually) and then call resolve or reject to change the state
   of the corresponding Promise object.
   The Promise that is either resolved or rejected is called “settled”, as opposed to a “pending” Promise.
*/

//--------------------REMEMBER--------------------
//  - There can be only a single result or an error
//    The promise's state change is final. Alll further calls of resolve and reject are ignored
let promise = new Promise(function(resolve, reject) {
   resolve('done');
   reject(new Error('...')); // ignored
   setTimeout(() => resolve('...')); // ignored
});

//  - Reject with Error objects
//    In case something goes wrong, we can call reject with any type of argument (just like resolve).
//    But it is recommended to use Error objects (or objects that inherit from Error).

//  - Immediately calling resolve/reject
//    In practice, an executor usually does something asynchronously and calls resolve/reject after some time, but it doesn’t have to
let promise = new Promise(function(resolve, reject) {
   // not taking our time to do the job
   resolve(123);
});

//  - The state and result are internal

//-----------------------------------------------------------------------------------------

// Consumers: then, catch, finally
/* A Promise object serves as a link between the executor (the “producing code”)
   and the consuming functions, which will receive the result or error.
   Consuming functions can be registered (subscribed) using methods .then, .catch and .finally.
*/

// then
/* promise.then(
      functiom(result) { // handle a successful result},
      function(error) { // handle an error}
   );
*/
/* The first argument of .then is a function that:
      -  runs when the Promise is resolved, and
      -  receives the result.
   The second argument of .then is a function that:
      -  runs when the Promise is rejected, and
      -  receives the error.
*/
let promise = new Promise(function(resolve, reject) {
   setTimeout(() => resolve('done!'), 1000);
});

promise.then(
   result => console.log(result), // done!
   error => console.log(error),
);

let promise2 = new Promise(function(resolve, reject) {
   setTimeout(() => reject(new Error('Whoops!')), 1000);
});

promise2.then(
   result => console.log(result),
   error => console.log(error), // Error: Whoops!
);

// If we’re interested only in successful completions, then we can provide only one function argument to .then
let promise = new Promise(function(resolve, reject) {
   setTimeout(() => resolve('done!'), 1000);
});

promise.then(console.log); // done!

//---------------------------------------------------------

// catch
/* If we’re interested only in errors, then we can use null as the first argument:
   .then(null, errorHandlingFunction).
   Or we can use .catch(errorHandlingFunction)
*/
let promise = new Promise(function(resolve, reject) {
   setTimeout(() => reject(new Error('Whoops!')), 1000);
});

// promise.then(null, console.log)
promise.catch(console.log); // Error: Whoops!

//---------------------------------------------------------

// finally
/* The call .finally(f) is similar to .then(f, f) in the sense that it always runs
   when the promise is settled: be it resolve or reject.
*/
/* new Promise((resolve, reject) => {
      // do something that takes time, and then call resolve/reject
   })
      // runs when the promise is settled, doesn't matter successfully or not
      .finally(() => stop loading indicator)
      .then(result => show result, err => show error)
*/
// A finally handler has no arguments and passes through result and errors to thr next handler
new Promise((resolve, reject) => {
   setTimeout(() => resolve('result'), 1000);
})
   .finally(() => console.log('Promise ready')) // Promise ready
   .then(result => console.log(result)); // result

new Promise((resolve, reject) => {
   setTimeout(() => reject(new Error('Whooops!')), 1000);
})
   .finally(() => console.log('Promise ready')) // Promise ready
   .catch(error => console.log(error)); // Error: Whooops!

// On settled promises handlers runs immediately
/* If a promise is pending, .then/catch/finally handlers wait for the result.
   Otherwise, if a promise has already settled, they execute immediately
*/
let promise = new Promise(resolve => resolve('done!'));

promise.then(console.log); // done!

// Example: loadScript
// callback variant
/* function loadScript(src, callback) {
      let script = document.createElement('script');
      script.src = src;

      script.onload = () => callback(null, script);
      script.onerror = () => callback(new Error(`Script load error ` + src));

      document.head.append(script);
   }
*/
function loadScript(src) {
   return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.src = src;

      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error('Script load error: ' + src));

      document.head.append(script);
   });
}

let promise = loadScript(
   'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js',
);

promise.then(
   script => console.log(`${script.src} is loaded!`),
   error => console.log(`Error: ${error.message}`),
);

promise.then(script => console.log('One more handler to do something else!'));

/* 
   Promises	                                                   Callbacks
   Promises allow us to do things in the natural order.        We must have a callback function at our disposal when calling 
   First, we run loadScript(script), and .then we write        loadScript(script, callback). We must know what to do with the result
   what to do with the result.	                              before loadScript is called.

   We can call .then on a Promise as many times as we want.    There can be only one callback.
   Each time, we’re adding a new “fan”,
   a new subscribing function, to the “subscription list”.
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Animated circle with callback
{
   /* 
<style>
   .circle {
      transition-property: width, height, margin-left, margin-top;
      transition-duration: 2s;
      position: fixed;
      transform: translateX(-50%) translateY(-50%);
      background-color: red;
      border-radius: 50%;
   }

   .message-ball {
      font-size: 20px;
      line-height: 200px;
      text-align: center;
   }
</style>
*/
}

<button onclick="go()">Let's animate</button>;

function go() {
   showCircle(150, 150, 100, div => {
      div.classList.add('message-ball');
      div.append('Hello, world!');
   });
}

function showCircle(cx, cy, radius, callback) {
   let circle = document.createElement('div');
   circle.style.height = 0;
   circle.style.width = 0;
   circle.style.left = cx + 'px';
   circle.style.top = cy + 'px';
   circle.className = 'circle';
   document.body.append(circle);

   setTimeout(() => {
      circle.style.width = radius * 2 + 'px';
      circle.style.height = radius * 2 + 'px';

      circle.addEventListener('transitionend', function handler() {
         circle.removeEventListener('transitionend', handler);
         callback(circle);
      });
   }, 0);
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Re-solve a promise?
// What's the output of the code below?
let promise = new Promise(function(resolve, reject) {
   resolve(1);

   setTimeout(() => resolve(2), 1000);
});

promise.then(console.log); // 1

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Delay with a promise
function delay(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

delay(5000).then(() => console.log('Runs after 5 seconds'));

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Animated circle with promise

<button onclick="go()">Let's animate</button>;

function go() {
   showCircle(150, 150, 100).then(div => {
      div.classList.add('message-ball');
      div.append('Hello, world!');
   });
}

function showCircle(cx, cy, radius) {
   let circle = document.createElement('div');
   circle.style.height = 0;
   circle.style.width = 0;
   circle.style.left = cx + 'px';
   circle.style.top = cy + 'px';
   circle.className = 'circle';
   document.body.append(circle);

   return new Promise(resolve => {
      setTimeout(() => {
         circle.style.width = radius * 2 + 'px';
         circle.style.height = radius * 2 + 'px';

         circle.addEventListener('transitionend', function handler() {
            circle.removeEventListener('transitionend', handler);
            resolve(circle);
         });
      }, 0);
   });
}
