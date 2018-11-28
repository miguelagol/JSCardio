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

// The maximal number of nested calls (including the first one) is called recursion depth.
// The execution stack
// The information about a function run is stored in its executions context.
// Recursion depth equals the maximal number of context in the stack. In our case, it will be exactly n.

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Recursive traversals
let company = {
   sales: [{ name: 'John', salary: 1000 }, { name: 'Alice', salary: 600 }],
   development: {
      sites: [{ name: 'Peter', salary: 2000 }, { name: 'Alex', salary: 1800 }],
      internals: [{ name: 'Jack', salary: 1300 }]
   }
};

function sumSalaries(department) {
   if (Array.isArray(department)) {
      return department.reduce((prev, curent) => prev + curent.salary, 0);
   }
   else {
      let sum = 0;
      for (let subdep of Object.values(department)) {
         sum += sumSalaries(subdep);
      }
      return sum;
   }
}

console.log(sumSalaries(company)); // 6700

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Linked list
// if we really need fast insertion/deletion, we can choose another data structure called a linked list.
/* The linked list element is recursively defined as an object with:
      - value.
      - next property referencing the next linked list element or null if that’s the end.
*/
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

// or
let list2 = { value: 1 };
list2.next = { value: 2 };
list2.next.next = { value: 3 };
list2.next.next.next = { value: 4 };
// list2    1 next -> 2 next -> 3 next -> 4 next -> null

// The list can be easily split into multiple parts and later joined back:
let secondList = list2.next.next;
list2.next.next = null;
// list2    1 next -> 2 next
// secondList  3 next -> 4 next -> null

// to join
list2.next.next = secondList;
// list2    1 next -> 2 next -> 3 next -> 4 next -> null

// prepend a new value
list2 = { value: 'new value', next: list2 };
// list2    'new value' next -> 1 next -> 2 next -> 3 next -> 4 next -> null

// to remove a value from the middle
list2.next = list2.next.next;
// list2    'new value' next -> 2 next -> 3 next -> 4 next -> null

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
function sumTo3(n) {
   return (n * (1 + n) / 2)
}

console.log(sumTo3(100)); // 5050

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Calculate factorial
function factorial(n) { }

console.log(factorial(5)); // 120

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Fibonacci numbers
function fib(n) { }

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
function printList(list) { }

console.log(printList(list));

// variant 2 - recursion
function printList2(list) { }

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
function printReverseList(list) { }

console.log(printReverseList(list));

// variant 2 - recursion
function printReverseList2(list) { }

console.log(printReverseList2(list));
