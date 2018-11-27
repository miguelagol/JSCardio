/*  When a function solves a task, in the process it can call many other functions.
    A partial case of this is when a function calls itself. That’s called recursion.
*/
// Iterative thinking
function pow(x, n) {
   let result = 1;

   for (let i = 0; i < n; i++) {
      result *= x;
   }

   return result;
}

console.log(pow(2, 3)); // 8

// Recursive thinking
function pow2(x, n) {
   if (n == 1) {
      return x;
   } else {
      return x * pow2(x, n - 1);
   }
}

console.log(pow2(2, 4)); // 16

// or
function pow3(x, n) {
   return n == 1 ? x : x * pow3(x, n - 1);
}

console.log(pow3(2, 5)); // 32

