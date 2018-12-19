// REST PARAMETERS
// collects all remaining elements into an array
function add(x, y) {
   return x + y;
}

// In Javascript it is possible to call a function with any number of arguments. However, only the fist two arguments will be counted.
console.log(add(1, 2, 3, 4, 5)); // 3

// With rest parameters we can gather any number of arguments into an array and do what we want with them
function add2(...args) {
   let result = 0;

   for (let arg of args) {
      result += arg;
   }

   return result;
}

console.log(add2(1)); // 1
console.log(add2(1, 2)); // 3
console.log(add2(1, 2, 3, 4, 5)); // 15

//--------------------REMEMBER-------------------
// Rest parameters have to be at the last argument
/*  function f(arg1, ...rest, arg2) {
        // arg2 after ...rest ?!
        // Error: Rest parameter must be last formal parameter
    }
*/

function showName(firstName, lastName, ...titles) {
   console.log(firstName + ' ' + lastName); // Julius Caesar

   console.log(titles[0]); // Consul
   console.log(titles[1]); // Imperator
   console.log(titles.length); // 2
}

showName('Julius', 'Caesar', 'Consul', 'Imperator');

//------------------------------------------------------------------------------------------------------------------------

// Before rest parameters existed, to get all the arguments in a function we used arguments which is an array-like object.
function someFunction() {
   return arguments;
}

console.log(someFunction('joykare', 100, false)); // [Arguments] { '0': 'joykare', '1': 100, '2': false }

function showName() {
   console.log(arguments.length + ', ' + arguments[0] + ', ' + arguments[1]);
}

showName('Julius', 'Cesar'); // 2, Julius, Cesar
showName('Ilya'); // 1, Ilya, undefined

//------------------------------------------------------------------------------------------------------------------------

// Arrow functions do not have "arguments"
// As you remember, arrow functions don’t have their own this
function f() {
   // If we access the arguments object from an arrow function, it takes them from the outer “normal” function.
   let showArg = () => console.log(arguments[0]);
   showArg();
}

f(1); // 1

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// SPREAD OPERATOR
// allows iterables( arrays / objects / strings ) to be expanded into single arguments/elements

// Adding array elements to an existing array
let arr = ['Apple', 'Lemon', 'Orange'];
let newArr = ['Banana', ...arr];

console.log(newArr); // [ 'Banana', 'Apple', 'Lemon', 'Orange' ]

// or merge arrays
let arr2 = ['Pineapple', 'Mango'];
let merged = [...arr, ...arr2];

console.log(merged); // [ 'Apple', 'Lemon', 'Orange', 'Pineapple', 'Mango' ]

// Copying arrays
let arr = [1, 2, 3];
let newArr = [...arr];

console.log(newArr); // [ 1, 2, 3 ]

// Pass elements of an array to a function as separate arguments
function add(a, b, c) {
   return a + b + c;
}

let args = [1, 2, 3];

console.log(add(...args)); // 6

//------------------------------------------------------------------------------------------------------------------------

// Using a function
let arr = [3, 5, 2];

console.log(Math.max(...arr)); // 5

// we can't do that
console.log(Math.max(arr)); // NaN

// we can pass multiple iterables
let arr2 = [2, 9, -1, 0];

console.log(Math.max(...arr, ...arr2)); // 9

//------------------------------------------------------------------------------------------------------------------------

// Spread operator works with any iterable
let str = 'banana';

console.log([...str]); // [ 'b', 'a', 'n', 'a', 'n', 'a' ]

// we could also use Array.from
console.log(Array.from(str)); // [ 'b', 'a', 'n', 'a', 'n', 'a' ]

// But
//--------------------REMEMBER-------------------
/*  -   Array.from operates on both array-likes and iterables.
    -   The spread operator operates only on iterables.
*/
