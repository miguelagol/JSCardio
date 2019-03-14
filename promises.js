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

// Promise chaining
// The idea is that the result is passed through the chain of .then handlers.

new Promise(function(resolve, reject) {
   setTimeout(() => resolve(1), 1000);
})
   .then(function(result) {
      console.log(result); // 1
      return result * 2;
   })
   .then(function(result) {
      console.log(result); // 2
      return result * 2;
   })
   .then(function(result) {
      console.log(result); // 4
      return result * 2;
   });
// The whole thing works, because a call to promise.then returns a promise, so that we can call the next .then on it.

// technically we can also add many .then to a single promise but this is not chaining
let promise = new Promise(function(resolve, reject) {
   setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
   console.log(result); // 1
   return result * 2;
});

promise.then(function(result) {
   console.log(result); // 1
   return result * 2;
});

promise.then(function(result) {
   console.log(result); // 1
   return result * 2;
});
// There are just several handlers to one promise. They don’t pass the result to each other, instead they process it idependantly.

//--------------------REMEMBER--------------------
// Any time .then or .catch is invoked, it's going to wrap whatever these functions return in a new promise
function getPromise() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve();
      }, 2000);
   });
}

function logA() {
   console.log('A');
}

function logB() {
   console.log('B');
}

function logCandThrow() {
   console.log('C');

   throw new Error();
}

function logError() {
   console.log('Error');
}

getPromise()
   .then(logA)
   .then(logB)
   .then(logCandThrow)
   .catch(logError); // A  B  C  Error

//-----------------------------------------------------------------------------------------

// Returning promises
/* Normally, a value returned by a .then handler is immediately passed to the next handler.
   But there’s an exception.

   If the returned value is a promise, then the further execution is suspended until it settles.
   After that, the result of that promise is given to the next .then handler.
*/
new Promise(function(resolve, reject) {
   setTimeout(() => resolve(1), 1000);
})
   .then(function(result) {
      console.log(result); // 1

      return new Promise((resolve, reject) => {
         setTimeout(() => resolve(result * 2), 1000);
      });
   })
   .then(function(result) {
      console.log(result); // 2

      return new Promise((resolve, reject) => {
         setTimeout(() => resolve(result * 2), 1000);
      });
   })
   .then(function(result) {
      console.log(result); // 4
   });
// Returning promises allows us to build chains of asynchronous actions.

// Example: loadScript
/* loadScript('/article/promise-chaining/one.js')
      .then(function(script) {
         return loadScript('/article/promise-chaining/two.js');
      })
      .then(function(script) {
         return loadScript('/article/promise-chaining/three.js');
      })
      .then(function(script) {
         // use function declared in scripts
         one();
         two();
         three();
   });
*/
// shorter code
loadScript('/article/promise-chaining/one.js')
   .then(script => loadScript('/article/promise-chaining/two.js'))
   .then(script => loadScript('/article/promise-chaining/three.js'))
   .then(script => {
      one();
      two();
      three();
   });

//--------------------REMEMBER--------------------
// Thenables
/* .then may return an arbitrary “thenable” object, and it will be treated the same way as a promise.
   A “thenable” object is any object with a method .then.
*/
class Thenable {
   constructor(num) {
      this.num = num;
   }
   then(resolve, reject) {
      console.log(resolve);
      setTimeout(() => resolve(this.num * 2), 1000);
   }
}

new Promise(resolve => resolve(1))
   .then(result => {
      return new Thenable(result);
      /* JavaScript checks the object returned by .then handler:
         if it has a callable method named then, then it calls that method
         providing native functions resolve, reject as arguments (similar to executor)
         and waits until one of them is called.
      */
   })
   .then(console.log); // [Function]     2
// This feature allows to integrate custom objects with promise chains without having to inherit from Promise.

//-----------------------------------------------------------------------------------------------------------------------------------------

// fetch
// The basic usage
let promise = fetch(url);
/* This makes a network request to the url and returns a promise.
   The promise resolves with a response object when the remote server responds with headers, but before the full response is downloaded.
   To read the full response, we should call a method response.text():
      it returns a promise that resolves when the full text downloaded from the remote sever, with that text as a result. 
*/
fetch('/article/promise-chaining/user.json')
   // .then runs when the remote server responds
   .then(function(response) {
      // response.text() returns a new promise that resolves with the full response text
      // when we finish downloading it
      return response.text;
   })
   .then(function(text) {
      console.log(text); // {"name": "iliakan", isAdmin: true}
   });

// response.json()
// this method reads the remote data and parses it as JSON
fetch('/article/promise-chaining/user.json')
   .then(response => response.json())
   .then(user => console.log(user.name)); // iliakan

// show the avatar
// Make a request for user.json
fetch('/article/promise-chaining/user.json')
   // Load it as json
   .then(response => response.json())
   // Make a request to github
   .then(user => fetch(`https://api.github.com/users/${user.name}`))
   // Load the response as json
   .then(response => response.json())
   // Show the avatar image
   .then(githubUser => {
      let img = document.createElement('img');
      img.src = githubUser.avatar_url;
      document.body.append(img);

      setTimeout(() => img.remove(), 3000);
   });

// As of now, there’s no way to do something after the avatar has finished showing and gets removed.
// To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing.
fetch('/article/promise-chaining/user.json')
   // Load it as json
   .then(response => response.json())
   // Make a request to github
   .then(user => fetch(`https://api.github.com/users/${user.name}`))
   // Load the response as json
   .then(response => response.json())
   // Show the avatar image
   .then(
      githubUser =>
         new Promise(function(resolve, reject) {
            let img = document.createElement('img');
            img.src = githubUser.avatar_url;
            document.body.append(img);

            setTimeout(() => {
               img.remove();
               resolve(githubUser);
            }, 3000);
         }),
   )
   .then(githubUser => console.log(`Finished showing ${githubUser.name}`));

// we can split the code into reusable functions
function loadJson(url) {
   return fetch(url).then(response => response.json());
}

function loadGithubUser(name) {
   return fetch(`https://api.github.com/users/${name}`).then(response =>
      response.json(),
   );
}

function showAvatar(githubUser) {
   return new Promise(function(resolve, reject) {
      let img = document.createElement('img');
      img.src = githubUser.avatar_url;
      document.body.append(img);

      setTimeout(() => {
         img.remove();
         resolve(githubUser);
      }, 3000);
   });
}

loadJson('/article/promise-chaining/user.json')
   .then(user => loadGithubUser(user.name))
   .then(showAvatar)
   .then(githubUser => console.log(`Finished showing ${githubUser.name}`));

/* The promise returned by fetch rejects when it’s impossible to make a request.
    For instance, a remote server is not available, or the URL is malformed.
    But if the remote server responds with error 404, or even error 500, then it’s considered a valid response.
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// Error handling with promises
/* Asynchronous actions may sometimes fail: in case of an error the corresponding promise becomes rejected.
   Promise chaining is great at that aspect. When a promise rejects, the control jumps to the closest rejection handler down the chain.
*/
fetch('https://no-such-server.blabla') // rejects
   .then(response => response.json())
   .catch(error => console.log(error)); // TypeError: Failed to fetch

// The easiest way to catch all errors is to append .catch to the end of chain
fetch('/article/promise-chaining/user.json')
   .then(response => response.json())
   .then(user => fetch(`https://api.github.com/users/${user.name}`))
   .then(response => response.json())
   .then(
      githubUser =>
         new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = githubUser.avatar_url;
            img.className = 'promise-avatar-example';
            document.body.append(img);

            setTimeout(() => {
               img.remove();
               resolve(githubUser);
            }, 3000);
         }),
   )
   .catch(error => console.log(error.message)); // .catch doesn’t trigger at all, because there are no errors.

//-----------------------------------------------------------------------------------------

// implicit try...catch
// The code of a promise executor and promise handlers has an "invisible try..catch" around it.
// If an error happens, it gets caught and treated as a rejection.
new Promise((resolve, reject) => {
   throw new Error('Whooops!');
}).catch(console.log); // Error: Whooops!

// the same as
new Promise((resolve, reject) => {
   reject(new Error('Whooops!'));
}).catch(console.log); // Error: Whooops!

// That’s so not only in the executor, but in handlers as well.
// If we throw inside .then handler, that means a rejected promise, so the control jumps to the nearest error handler.
new Promise((resolve, reject) => {
   resolve('ok');
})
   .then(result => {
      throw new Error('Whooops!');
   })
   .catch(console.log); // Error: Whooops!
// That’s so not only for throw, but for any errors, including programming errors as well
// As a side effect, the final .catch not only catches explicit rejections, but also occasional errors in the handlers above.

//-----------------------------------------------------------------------------------------

// Rethrowing
// .catch behaves like try..catch. We may have as many .then as we want, and then use a single .catch at the end
// to handle errors in all of them.
// If we throw inside .catch, then the control goes to the next closest error handler.
// And if we handle the error and finish normally, then it continues to the closest successful .then handler.
new Promise((resolve, reject) => {
   throw new Error('Whooops!');
})
   .catch(function(error) {
      console.log('The error is handled, continue normally'); // The error is handled, continue normally
   })
   .then(() => console.log('Next successful handler runs')); // Next successful handler runs

// If the handler catches the error and just can’t handle it, it throws it again
new Promise((resolve, reject) => {
   throw new Error('Whooops!');
})
   .catch(function(error) {
      if (error instanceof URIError) {
         // handle it
      } else {
         console.log("Can't handle such error"); // Can't handle such error
         throw error;
      }
   })
   .then(function() {
      // never runs here
   })
   .catch(error => {
      console.log(`The unknown error has occurred: ${error}`); // The unknown error has occurred: Error: Whooops!
   });

//-----------------------------------------------------------------------------------------

// Fetch error handling example
fetch('no-such-user.json')
   .then(response => response.json())
   .then(user => fetch(`https://api.github.com/users/${user.name}`))
   .then(response => response.json())
   .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
// As of now, the code tries to load the response as JSON no matter what and dies with a syntax error
// the error just falls through the chain, without details: what failed and where

class HttpError extends Error {
   constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
   }
}

function loadJSON(url) {
   return fetch(url).then(response => {
      if (response.status == 200) {
         return response.json();
      } else {
         throw new HttpError(response);
      }
   });
}

loadJSON('no-such-user.json').catch(console.log); // HttpError2: 404 for http://javascript.info/no-such-user.json

// second example
function demoGithubUser() {
   let name = prompt('Enter a name?', 'iliakan');

   return loadJSON(`https://api.github.com/users/${name}`)
      .then(user => {
         console.log(`Full name: ${user.name}`);
         return user;
      })
      .catch(error => {
         if (error instanceof HttpError && error.response.status == 404) {
            console.log('No such user, please reenter.');
            return demoGithubUser();
         } else {
            throw error;
         }
      });
}

demoGithubUser();

//-----------------------------------------------------------------------------------------

// Unhandled rejections
// If we just forget to append an error handler to the end of the chain
new Promise(function() {
   noSuchFunction();
}).then(() => {
   // zero or many promise handlers
}); // without .catch at the end!
// In case of an error, the promise state becomes “rejected”, and the execution should jump to the closest rejection handler.
// So the error gets “stuck”.
// Most JavaScript engines track such situations and generate a global error in that case. We can see it in the console.

// In the browser we can catch such errors using the event unhandledrejection
window.addEventListener('unhandledrejection', function(event) {
   console.log(event.promise); // Promise {<rejected>: Error: Whoops! at <anonymous>:7:10 at new Promise (<anonymous>) at <anonymous>:6:1}
   console.log(event.reason); // Error: Whoops!
});

new Promise(function() {
   throw new Error('Whoops!');
});

//-----------------------------------------------------------------------------------------

//  if we have load-indication, then .finally is a great handler to stop it when the fetch is complete
function demoGithubUser() {
   let name = prompt('Enter a name?', 'iliakan');

   document.body.style.opacity = 0.3; // we indicate loading by dimming the document

   return loadJSON(`https://api.github.com/users/${name}`)
      .finally(() => {
         // When the promise is settled, be it a successful fetch or an error, finally triggers and stops the indication.
         document.body.style.opacity = '';
         return new Promise(resolve => setTimeout(resolve, 0));
      })
      .then(user => {
         console.log(`Full name: ${user.name}`);
         return user;
      })
      .catch(error => {
         if (error instanceof HttpError && error.response.status == 404) {
            console.log('No such user, please reenter.');
            return demoGithubUser();
         } else {
            throw error;
         }
      });
}

demoGithubUser();
// There’s a little browser trick with returning a zero-timeout promise from finally. That’s because some browsers (like Chrome)
// need “a bit time” outside promise handlers to paint document changes. So it ensures that the indication is visually stopped
// before going further on the chain.

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

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Promise: then versus catch
// Are these code fragments equal?
promise.then(f1).catch(f2);
promise.then(f1, f2);

// no, they are not the equal
/* The difference is that if an error happens in f1, then it is handled by .catch (first code piece).
   That's because an error is passed down the chain, and in the second code piece there's no chain below f1.
   .then passes results/errors to the next .then/catch. So in the first example, there’s a catch below,
   and in the second one – there isn’t, so the error is unhandled.
*/

function onSuccess() {
   console.log('Success!');
}

function onError() {
   console.log('Error!');
}

let promiseSuc = new Promise((resolve, reject) => {
   setTimeout(() => {
      resolve();
   }, 3000);
});

promiseSuc.then(onSuccess); // Success!      second (after 3 seconds)

let promiseEr = new Promise((resolve, reject) => {
   setTimeout(() => {
      reject();
   }, 2000);
});

promiseEr.catch(onError); // Error!    first (after 2 seconds)

// or
promiseEr.then(onSuccess, onError); // Error!

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Error in setTimeout
// Will the .caucgh trigger?
new Promise(function(resolve, reject) {
   setTimeout(() => {
      throw new Error('Whooops');
   }, 1000);
}).catch(console.log);
/* There’s an "implicit try..catch" around the function code. So all synchronous errors are handled.
   But here the error is generated not while the executor is running, but later. So the promise can’t handle it.
*/
