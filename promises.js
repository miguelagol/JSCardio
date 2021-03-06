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
      function(result) { // handle a successful result},
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

// HTTP response status codes
/* HTTP response status codes indicate whether a specific HTTP request has been successfully completed.
   Responses are grouped in five classes:
   informational responses, successful responses, redirects, client errors, and servers errors.
*/
// Most frequently encountered

// Information responses
/* 100   -  Continue
            This interim response indicates that everything so far is OK and
            that the client shold continue with the request or ignore it if it is already finished
*/

//--------------------------------------------------------

// Successful responses
/* 200   -  OK
            The request has succeeded. The meaning of a success varies depending on the HTTP method:
            - GET: The resource has been fetched and is transmitted in the message body.
            - HEAD: The entity headers are in the message body.
            - PUT or POST: The resource describing the result of the action is transmitted in the message body.
            - TRACE: The message body contains the request message as received by the server

   201   -  Created
            The request has succeeded and a new resource has been created as a result of it.
            This is typically the response sent after a POST request, or after some PUT requests.

   202   -  Accepted
            The request has been received but not yet acted upon.
            It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response
            indicating the outcome of processing the request. It is intended for cases where another process or server
            handles the request, or for batch processing.

   204   -  Non Content
            There is no content to send for this request, but the headers may be useful.
            The user-agent may update its cached headers for this resource with the new ones.
*/

//--------------------------------------------------------

// Redirection messages
/* 301   -  Moved Permanently
            This response code means that the URI of the requested resource has been changed.
            Probably, the new URI would be given in the response.

   304   -  Not Modified
            This is used for caching purposes.
            It tells the client that the response has not been modified,
            so the client can continue to use the same cached version of the response.
*/

//--------------------------------------------------------

// Client error responses
/* 400   -  Bad Request
            This response means that server could not understand the request due to invalid syntax.

   401   -  Unauthorized
            Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".
            That is, the client must authenticate itself to get the requested response.

   403   -  Forbidden
            The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response.
            Unlike 401, the client's identity is known to the server.

   404   -  Not Found
            The server can not find requested resource. In the browser, this means the URL is not recognized.
            In an API, this can also mean that the endpoint is valid but the resource itself does not exist.
            Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client.
*/
//--------------------------------------------------------

// Server error responses
/* 500   -  Internal Server Error
            The server has encountered a situation it doesn't know how to handle.

   502   -  Bad Gateway
            This error response means that the server, while working as a gateway to get a response needed to handle the request,
            got an invalid response.
*/

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

// Promise API (Aplication programing interface)

// There are 4 static methods in the Promise class

// Promise.resolve
// return a resolved promise with the given value
let promise = Promise.resolve(value);

// the same as
let promise = new Promise(resolve => resolve(value));

// The method is used when we already have a value, but would like to have it 'wrapped' into a promise

function loadCached(url) {
   let cache = loadCached.cache || (loadCached.cache = new Map());

   if (cache.has(url)) {
      return Promise.resolve(cache.get(url));
   }

   return fetch(url)
      .then(response => response.text())
      .then(text => {
         cache.set(url, text);
         return text;
      });
}
// We can use loadCached(url).then(...) because the function is guaranteed to return a promise

//-----------------------------------------------------------------------------------------

// Promise.reject
// create a rejected promise with the error
let promise = Promise.reject(error);

// the same as
let promise = new Promise((resolve, reject) => reject(error));

//-----------------------------------------------------------------------------------------

// Promise.all
// It takes an array of promises (technically can be any iterable, but usually an array) and returns a new promise.
// The new promise resolves when all listed promises are settled and has an array of their results.
// We use Promise.all when we want to run many promises to execute in parallel, and wait till all of them are ready
let Promise = Promise.all([...promises]);

Promise.all([
   new Promise(resolve => setTimeout(() => resolve(1), 3000)),
   new Promise(resolve => setTimeout(() => resolve(2), 2000)),
   new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]).then(console.log); // [1, 2, 3]  the relative order is the same

let urls = [
   'https://api.github.com/users/iliakan',
   'https://api.github.com/users/remy',
   'https://api.github.com/users/jeresig',
];

// map every url to the promise fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests).then(responses =>
   responses.forEach(response =>
      console.log(`${response.url}: ${response.status}`),
   ),
);
/* https://api.github.com/users/iliakan: 200
   https://api.github.com/users/remy: 200
   https://api.github.com/users/jeresig: 200
*/

// the same as (+names)
let names = ['iliakan', 'hiredgun', 'miguelagol'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
   .then(responses => {
      for (let response of responses) {
         console.log(`${response.url}: ${response.status}`);
      }

      return responses;
   })
   .then(responses => Promise.all(responses.map(response => response.json())))
   .then(users => users.forEach(user => console.log(user.name)));
/* https://api.github.com/users/iliakan: 200
   https://api.github.com/users/hiredgun: 200
   https://api.github.com/users/miguelagol: 200
   Ilya Kantor
   Konrad Turczyński
   Michalina Gołąb
*/

// If any of the promises is rejected, Promise.all immediately rejects with that error.
Promise.all([
   new Promise(resolve => setTimeout(() => resolve(1), 1000)),
   new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Whooops!')), 2000),
   ),
   new Promise(resolve => setTimeout(() => resolve(3), 3000)),
]).catch(console.log); // Error: Whooops!
// the rejection error becomes the outcome of the whole Promise.all

/* promises provide no way to “cancel” or “abort” their execution.
   So other promises continue to execute, and the eventually settle, but all their results are ignored.

   There are ways to avoid this: we can either write additional code to clearTimeout (or otherwise cancel)
   the promises in case of an error, or we can make errors show up as members in the resulting array
*/

// Promise.all(...) allows non-promise items in iterable
// If any of those objects is not a promise, it's wrapped in Promise.resolve
Promise.all([
   new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 1000);
   }),
   2, // treated as Promise.resolve(2)
   3, // treated as Promise.resolve(3)
]);

//-----------------------------------------------------------------------------------------

// Promise.race
// takes an iterable of promises, but instead of waiting for all of them to finish
// - waits for the first result (or error) and goes on with it
let promise = Promise.race(iterable);

Promise.race([
   new Promise(resolve => setTimeout(() => resolve(1), 1000)),
   new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Whooops!')), 2000),
   ),
   new Promise(resolve => setTimeout(() => resolve(3), 3000)),
]).then(console.log); // 1
// The first result/error becomes the result of the whole Promise.race.
// After the first settled promise “wins the race”, all further results/errors are ignored.

//-----------------------------------------------------------------------------------------------------------------------------------------

// Promisification
// It’s conversion of a function that accepts a callback into a function returning a promise.
// We create a wrapper-function that does the same, internally calling the original one, but returns a promise.

// with callback
function loadScript(src, callback) {
   let script = document.createElement('script');
   script.src = src;

   script.onload = () => callback(null, script);
   script.onerror = () => callback(new Error(`Script load error for ${src}`));

   document.head.append(script);
}
// usage:
// loadScript('path/script.js', (error, script) => {...})

// with promise
let loadScriptPromise = function(src) {
   return new Promise((resolve, reject) => {
      loadScript(src, (error, script) => {
         if (error) reject(error);
         else resolve(script);
      });
   });
};
// usage:
// loadScriptPromise('path/script.js').then(...)

// As we may need to promisify many functions, it makes sense to use a helper.
// Here we assume that the original function expects a callback with two arguments (err, result).
function promisify(func) {
   return function(...args) {
      // return a wrapper function
      return new Promise((resolve, reject) => {
         function callback(error, result) {
            // our customj callback for func
            if (error) {
               return reject(error);
            } else {
               resolve(result);
            }
         }

         args.push(callback); // append our custom callback to the end of arguments

         func.call(this, ...args); // call the original function
      });
   };
}

let loadScriptPromise = promisify(loadScript);
loadScriptPromise(/*...*/).then(/*...*/);

// if the original f expects a callback with more arguments...
// promisify(func, true) to get array of results
function promisify(func, manyArgs = false) {
   return function(...args) {
      return new Promise((resolve, reject) => {
         function callback(error, ...results) {
            // our custom callback for func
            if (error) {
               return reject(error);
            } else {
               // resolve with all callback results if manyArgs is specified
               resolve(manyArgs ? results : results[0]);
            }
         }

         args.push(callback);

         func.call(this, ...args);
      });
   };
}

func = promisify(func, true);
func(/*...*/).then(
   error => {
      /*...*/
   },
   arrayOfResults => {
      /*...*/
   },
);

/* There are also modules with a bit more flexible promisification functions, e.g. es6-promisify.
In Node.js, there’s a built-in util.promisify function for that.
*/

//--------------------REMEMBER--------------------
/* Promisification is a great approach, especially when you use async/await, but not a total replacement for callbacks.
   A promise may have only one result, but a callback may technically be called many times.
   So promisification is only meant for functions that call the callback once. Furhter calls will be ignored.
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// Microtasks

// Promise handlers .then/.catch/.finally are always asynchronous
// Even when a Promise is immediately resolved, the code on the line below may still execute first
let promise = Promise.resolve();

promise.then(() => console.log('Promise done'));

console.log('Code finished'); // Code finished        Promise done

/* Asynchronous tasks need proper management. For that, the standard specifies an internal queue PromiseJobs,
   more often called the “microtask queue” (v8 term).

   -  The queue is first-in-first-out: tasks that get enqueued first are run first.
   -  Execution of a task is initiated only when nothing else is running.

   When a promise is ready, its .then/catch/finally handlers are put into the queue.
   They are not executed yet. Javascript engine takes a task from the queue and executes it, when it becomes free from the current code.
*/

Promise.resolve()
   .then(() => console.log('Promise done')) // Promise done
   .then(() => console.log('Code finished')); // Code finished

// Event loop
// 'Event loop' is a process when the engine sleeps waits fot events
// When an event happens, and the engine is busy, it gets into a so-called “macrotask queue” (v8 term).
// Events from the macrotask queue are processed on “first came – first served” basis.

//--------------------REMEMBER--------------------
// Microtask queue has a higher priority than the macrotask queue.
// In other words, the engine first executes all microtasks, and then takes a macrotask.
// Promise handling always has the priority.
setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise'));

console.log('code'); // code     promise     timeout
/* 1. code shows first, it’s a regular synchronous call.
   2. promise shows second, because .then passes through the microtask queue, runs after the current code.
   3. timeout shows last, because it’s a macrotask.
*/

Promise.resolve()
   .then(() => {
      setTimeout(() => console.log('timeout'), 0); // setTimeout macrotask awaits in the less-priority macrotask queue.
   })
   .then(() => console.log('promise')); // promise    timeout

//-----------------------------------------------------------------------------------------------------------------------------------------

// Async/await

// Async funtions
// The word “async” before a function means: a function always returns a promise.
async function func() {
   return 1;
}

func().then(console.log); // 1

// the same as
async function func2() {
   return Promise.resolve(1);
}

func2().then(console.log); // 1

// Await
// Works only inside async functions
// The keyword await makes JavaScript wait until that promise settles and returns its result
let value = await promise;

async function func() {
   let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve('done!'), 1000);
   });

   let result = await promise; // wait till the promise resolves

   console.log(result);
}

func(); // done!

//--------------------REMEMBER--------------------
// Cant't use await in regular functions
function f() {
   let promise = Promise.resolve(1);
   let result = await promise; // SyntaxError: await is only valid in async function
}

async function showAvatar() {
   let response = await fetch('/article/promise-chaining/user.json');
   let user = await response.json();

   // read github user
   let githubResponse = await fetch(
      `https://api.github.com/users/${user.name}`,
   );
   let githubUser = await githubResponse.json();

   // show the avatar
   let img = document.createElement('img');
   img.src = githubUser.avatar_url;
   img.className = 'promise-avatar-example';
   document.body.append(img);

   await new Promise((resolve, reject) => setTimeout(resolve, 3000));

   img.remove();

   return githubUser;
}

showAvatar();

//--------------------REMEMBER--------------------
// await won't work in the top-level code

// await accepts thenables
//the idea is that a 3rd-party object may not be a promise, but promise-compatible: if it supports .then, that’s enough to use with await.
class Thenable {
   constructor(num) {
      this.num = num;
   }

   then(resolve, reject) {
      console.log(resolve);
      setTimeout(() => resolve(this.num * 2), 1000);
   }
}

async function func() {
   let result = await new Thenable(1);

   console.log(result);
}

func(); // [Function]    2
/* If await gets a non-promise object with .then,
   it calls that method providing native functions resolve, reject as arguments. Then await waits until one of them is called
   and then proceeds with the result.
*/

//-----------------------------------------------------------------------------------------

// Async methods
// a class method can also be async
class Waiter {
   async wait() {
      return await Promise.resolve(1);
   }
}

new Waiter().wait().then(console.log); // 1

//-----------------------------------------------------------------------------------------

// Error handling
// If a promise resolves normally, then await promise returns the result.
// But in case of a rejection, it throws the error, just as if there were a throw statement at that line.
async function f() {
   await Promise.reject(new Error('Whooops!'));
}

// the same as
async function f2() {
   throw new Error('Whooops!');
}

// In real situations, the promise may take some time before it rejects. So await will wait, and then throw an error.
async function func() {
   try {
      let response = await fetch('http://no-such-url');
   } catch (error) {
      console.log(error);
   }
}

func(); // TypeError: Failed to fetch

// We can also wrap multiple lines
async function func() {
   try {
      let response = await fetch('/no-user-here');
      let user = await response.json();
   } catch (error) {
      console.log(error);
   }
}

func(); // SyntaxError: Unexpected token < in JSON at position 0

// If we don’t have try..catch, then the promise generated by the call of the async function f() becomes rejected
async function func() {
   let response = await fetch('http://no-such-url');
}

func().catch(console.log); // TypeError: Failed to fetch

// async/await and promise.then/catch
/* When we use async/await, we rarely need .then, because await handles the waiting for us.
   And we can use a regular try..catch instead of .catch.
*/

// async/await works well with Promise.all
let results = await Promise.all([fetch(url1), fetch(url2)]);

//-----------------------------------------------------------------------------------------

// Microtask queue

// Async/await is based on promises, so it uses the same microtask queue internally, and has the similar priority over macrotasks.
async function func() {
   return 1;
}
(async () => {
   setTimeout(() => console.log('timeout'), 0);

   await func();

   console.log('await');
})(); // await    timeout

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

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Fault-tolerant Promise.all
let urls = [
   'https://api.github.com/users/iliakan',
   'https://api.github.com/users/hiredgun',
   'https://api.github.com/users/miguelagol',
   'https://no-such-url',
];

let requests = urls.map(url => fetch(url).catch(error => error));

Promise.all(requests).then(responses => {
   for (let response of responses) {
      if (response.status != 200) {
         console.log(response);
      } else {
         console.log(`${response.url}: ${response.status}`);
      }
   }
});
/* https://api.github.com/users/iliakan: 200
   https://api.github.com/users/hiredgun: 200
   https://api.github.com/users/miguelagol: 200
   TypeError: Failed to fetch
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 8 - Fault-tolerant fetch with JSON
let urls = [
   'https://api.github.com/users/iliakan',
   'https://api.github.com/users/hiredgun',
   'https://api.github.com/users/miguelagol',
   'https://no-such-url',
   '/',
];

let requests = urls.map(url => fetch(url).catch(error => error));

Promise.all(requests)
   .then(responses =>
      Promise.all(
         responses.map(response => {
            if (response instanceof Error) {
               return response;
            } else {
               return response.json().catch(error => error);
            }
         }),
      ),
   )
   .then(results => {
      for (let user of results) {
         console.log(user.name);
      }
   });
/* Ilya Kantor
   Konrad Turczyński
   Michalina Gołąb
   TypeError
   SyntaxError
*/
//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 9 - Rewrite using async/await
function loadJson(url) {
   return fetch(url).then(response => {
      if (response.status == 200) {
         return response.json();
      } else {
         throw new Error(response.status);
      }
   });
}

loadJson('no-such-user.json') // (3)
   .catch(alert); // Error: 404

async function loadJson(url) {
   let response = await fetch(url);

   if (response.status === 200) {
      let json = await response.json();
      return json;
   } else {
      throw new Error(response.status);
   }
}

loadJson('no-such-user.json').catch(console.log); // Error: 404

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 10 - Rewrite 'rethrow' async/await
class HttpError extends Error {
   constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
   }
}

function loadJson(url) {
   return fetch(url).then(response => {
      if (response.status == 200) {
         return response.json();
      } else {
         throw new HttpError(response);
      }
   });
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
   let name = prompt('Enter a name?', 'iliakan');

   return loadJson(`https://api.github.com/users/${name}`)
      .then(user => {
         alert(`Full name: ${user.name}.`);
         return user;
      })
      .catch(err => {
         if (err instanceof HttpError && err.response.status == 404) {
            alert('No such user, please reenter.');
            return demoGithubUser();
         } else {
            throw err;
         }
      });
}

demoGithubUser();

class HttpError extends Error {
   constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
   }
}

async function loadJson(url) {
   let response = await fetch(url);

   if (response.status == 200) {
      let json = await response.json();
      return json;
   } else {
      throw new HttpError(response);
   }
}

async function demoGithubUser() {
   let name = prompt('Enter a name?', 'iliakan');

   try {
      let user = await loadJson(`https://api.github.com/users/${name}`);
      alert(`Full name: ${user.name}.`);
   } catch (error) {
      if (error instanceof HttpError && error.response.status == 404) {
         alert('No such user, please reenter.');
         return demoGithubUser();
      } else {
         throw error;
      }
   }
}

demoGithubUser();

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 11 - Call async from non-async
// How to call async from function wait and use its result?
async function wait() {
   await new Promise(resolve => setTimeout(resolve, 1000));
   return 10;
}

function func() {
   wait().then(console.log);
}

func(); // 10
