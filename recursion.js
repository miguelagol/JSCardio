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

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Sum all numbers till the given one
// variant 1 - for loop
function sumTo(n) {
   let result = 0;

   for (let i = n; i >= 1; i--) {
      result += i;
   }

   return result;
}

console.log(sumTo(100)); // 5050

// variant 2 - recursion
function sumTo2(n) {
   return n > 1 ? n + sumTo2(n - 1) : n;
}

console.log(sumTo2(100)); // 5050

// variant 3 - arithmetic progression formula
function sumTo3(n) {}

console.log(sumTo3(100)); // 5050

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Calculate factorial
function factorial(n) {}

console.log(factorial(5)); // 120

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Fibonacci numbers
function fib(n) {}

console.log(fib(3)); // 2
console.log(fib(7)); // 13
console.log(fib(77)); // 5527939700884757

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Output a single-linked list
let list = {
   value: 1,
   next: {
      value: 2,
      next: {
         value: 3,
         next: {
            value: 4,
            next: null,
         },
      },
   },
};

// variant 1 - for loop
function printList(list) {}

console.log(printList(list));

// variant 2 - recursion
function printList2(list) {}

console.log(printList2(list));

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Output a single-linked in the reverse order
let list = {
   value: 1,
   next: {
      value: 2,
      next: {
         value: 3,
         next: {
            value: 4,
            next: null,
         },
      },
   },
};

// variant 1 - for loop
function printReverseList(list) {}

console.log(printReverseList(list));

// variant 2 - recursion
function printReverseList2(list) {}

console.log(printReverseList2(list));
