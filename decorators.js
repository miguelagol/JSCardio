// Transparent caching
// We have a function slow(x) which is CPU-heavy, but its results are stable (for the same x it always returns the same result)
// If the function is called often, we may want to cache (remember) the results for different x to avoid spending extra-time on recalculations.
function slow(x) {
   console.log(`Function slow called with ${x}`);
   return x;
}

// cachingDecorator is a decorator: a special function that takes another function and alters its behavior.
// The idea is that we can call cachingDecorator for any function, and it will return the caching wrapper. 
function cachingDecorator(func) {
   let cache = new Map();

   return function (x) { // function wrapper
      if (cache.has(x)) { // if the result is in the map
         return cache.get(x); // return it
      }

      let result = func(x); // otherwise call func

      cache.set(x, result); // and cache (rememeber) the result
      return result;
   };
}
slow = cachingDecorator(slow);

// slow(1) is cached
console.log(slow(1)); // Function slow called with 1,    1
// the same (the result is already in the map)
console.log("Again " + slow(1)); // Again 1

// slow(2) is cached
console.log(slow(2)); // Function slow called with 2,    2
// the same (the result is already in the map)
console.log("Again " + slow(2)); // Again 2

/* There are several benefits of using a separate cachingDecorator instead of altering the code of slow itself:
      - The cachingDecorator is reusable. We can apply it to another function.   
      - The caching logic is separate, it did not increase the complexity of slow itself (if there were any).
      - We can combine multiple decorators if needed (other decorators will follow).
*/

//------------------------------------------------------------------------------------------------------------------------------------------

// Using “func.call” for the context
// The caching decorator mentioned above is not suited to work with object methods.
// There’s a special built-in function method func.call(context, …args) that allows to do that.
let worker = {
   someMethod() {
      return 1;
   },

   slow(x) {
      console.log(`Function slow called with ${x}`);
      return x * this.someMethod();
   },
};

function cachingDecorator(func) {
   let cache = new Map();

   return function (x) {
      if (cache.has(x)) {
         return cache.get(x);
      }

      let result = func.call(this, x);

      cache.set(x, result);
      return result;
   };
}

worker.slow = cachingDecorator(worker.slow);

console.log(worker.slow(2)); // Function slow called with 2    2

// without func.call() there will be error
// if
function cachingDecorator(func) {
   // ... 
   let result = func(x);
}
// then
console.log(worker.slow(2)); // Function slow called with 2    Error: this.someMethod is not a function
// The reason of error is that the wrapper calls the original function as func(x).
// And, when called like that, the function gets this = undefined.

//------------------------------------------------------------------------------------------------------------------------------------------

// Going multi-argument with “func.apply”
// to cache the multi-argument method we can use func.apply(this, [args])
// These two calls are almost equivalent:
let args = [1, 2, 3];

func.call(context, ...args); // pass an array as list with spread operator
func.apply(context, args);   // is same as using apply

/* If we look more closely, there’s a minor difference between such uses of call and apply.
      - The spread operator ... allows to pass iterable args as the list to call.
      - The apply accepts only array-like args.
*/

// call forwarding
// The wrapper passes everything it gets: the context this and arguments to anotherFunction and returns back its result.
let wrapper = function () {
   return anotherFunction.apply(this, arguments);
};


let worker = {
   slow(min, max) {
      console.log(`Function slow called with ${min}, ${max}`);
      return min + max;
   },
};

function cachingDecorator(func, hash) {
   let cache = new Map();

   return function () {
      let key = hash(arguments);

      if (cache.has(key)) {
         return cache.get(key);
      }

      let result = func.apply(this, arguments);

      cache.set(key, result);
      return result;
   };
}

function hash(args) {
   return args[0] + ', ' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

console.log(worker.slow(2, 10)); // Function slow called with 2, 10     12
console.log("Again: " + worker.slow(2, 10)); // Again: 12

//------------------------------------------------------------------------------------------------------------------------------------------

//  Borrowing a method
function hash() {
   console.log([].join.call(arguments));
}

hash(1, 2); // 1,2

