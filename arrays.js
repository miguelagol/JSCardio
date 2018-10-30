// Declaration
let arr = new Array();
let arr = [];

let array = ['one', 'two', 'three'];

// array elements are numbered, starting with 0
// Get an element
console.log(array[0]); // one
console.log(array[2]); // three
console.log(array[4]); // undefined

// Replace an element
array[1] = 'four';
console.log(array); // [ 'one', 'four', 'three' ]

// Add an element
array[3] = 'five';
console.log(array); // [ 'one', 'four', 'three', 'five' ]

// Delete an element
delete array[3]; // delete obj.key removes a value by the key
console.log(array); // [ 'one', 'four', 'three', <1 empty item> ]

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// .length
// array.length returns the total count of the elements in the array
let array = ['one', 'two', 'three'];
console.log(array.length); // 3

// To be precise, it is actually not the count of values in the array, but the greatest numeric index plus one.
/*  -------------------------REMEMBER-------------------------
    Don't make a holes in array
*/
let array2 = [1, 3];

array2[99] = 'dfsg';
console.log(array2.length); // 100

let arr = [];

arr[9] = 5; // create 9 empty items and then 5
arr.name = 'array';
console.log(arr); // [ <9 empty items>, 5, name: 'array' ]

// Be careful, .length property is writable
let arr2 = [1, 2, 3, 4, 5];
arr2.length = 2;
console.log(arr2); // [ 1, 2 ]
arr2.length = 5;
console.log(arr2[2]); // undefined

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// An array can store elements of any types
let array2 = [
   'user',
   { name: 'John' },
   true,
   function() {
      console.log('Hello');
   },
];

console.log(array2[1].name); // John
array2[3](); // Hello

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// new Array()          rarely used
let arr = new Array('apple', 'orange', 'lemon');

/*  -------------------------REMEMBER-------------------------
    If new Array is called with a single argument which is a number,
    then it creates an array without items but with the given length
*/
let arr2 = new Array(3);

console.log(arr2[0]); // undefined      (new Array(number) has all elements undefined)
console.log(arr2.length); // 3

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// The data structure is deque ( queue + stack )

// Queue methods
// The first pushed item is received first, that’s also called FIFO (First-In-First-Out) principle.
// .push
// array.push(element) appends an element to the end
let arr = ['Apple', 'Orange', 'Pear'];
arr.push('Lemon'); // the same as: arr[arr.length] = 'Lemon'
console.log(arr); // [ 'Apple', 'Orange', 'Pear', 'Lemon' ]

// .shift
// array.shift() get an element from the beggining (2nd element becomes the 1st)
arr.shift();
console.log(arr); // [ 'Orange', 'Pear', 'Lemon' ]

// .unshift
// array.unshift(element) add an element to the beginning of the array
arr.unshift('Pineaple', 'Banana');
console.log(arr); // [ 'Pineaple', 'Banana', 'Orange', 'Pear', 'Lemon' ]

// Stack methods
// The latest pushed item is received first, that’s also called LIFO (Last-In-First-Out) principle.
// .push
// array.push(element) adds an element to the end
arr.push('Apple');
console.log(arr); // [ 'Pineaple', 'Banana', 'Orange', 'Pear', 'Lemon', 'Apple' ]

// .pop
// array.pop() takes an element from the end
arr.pop();
console.log(arr); // [ 'Pineaple', 'Banana', 'Orange', 'Pear', 'Lemon' ]

/*  -------------------------REMEMBER-------------------------
    Methods push/pop run fust, while shift/unshift are slow.
    The shift operation must do 3 things:
        - remove the element with index 0
        - move all elements to the left (renumbered them from 1 to 0, from 2 to 1...)
        - update the length property
*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Copy by reference
let fruits = ['Apple'];
let array = fruits; // copy by reference

array.push('Lemon');
console.log(fruits); // [ 'Apple', 'Lemon' ]

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Loops

// for..of
let numbers = ['one', 'two', 'three'];
for (let num of numbers) {
   console.log(num);
} // one, two, three

/* -------------------------REMEMBER-------------------------
    We shouldn't use for..in for arrays
        let numbers = ['one', 'two', 'three'];
        for (let key in numbers) {
            console.log(numbers[key]);
        }
    
    The loop for..in iterates over all properties, not only the numeric ones.
    The for..in loop is optimized for generic objects, not arrays, and thus is 10-100 times slower.
 */

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Array methods

// .splice
// array.splice(index[, deleteCount, elem1, ..., elemN])
// It starts from the position index: removes deleteCount elements and then inserts elem1, ..., elemN at their place.
// Returns the array of removed elements.
let arr = ['I', 'study', 'JavaScript', 'right', 'now'];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", 'dance');
console.log(arr); // [ 'Let\'s', 'dance', 'right', 'now' ]

arr.splice(2, 0, 'cuban', 'salsa');
console.log(arr); // [ 'Let\'s', 'dance', 'cuban', 'salsa', 'right', 'now' ]

let removed = arr.splice(0, 2);
console.log(removed); // [ 'Let\'s', 'dance' ]     <-- array of removed elements
console.log(arr);
// negative indexes are allowed
let arr2 = [1, 2, 5];

arr2.splice(-1, 0, 3, 4);
console.log(arr2); // [ 1, 2, 3, 4, 5 ]

//--------------------------------------------------------------------------------------

// .slice
// array.slice(start, end) it returns a new array where it copies all items start index "start" to "end" (NOT INCLUDING END)
let str = 'test';
let arr = ['t', 'e', 's', 't'];

console.log(str.slice(1, 3)); // es
console.log(arr.slice(1, 3)); // [ 'e', 's' ]

// negative indexes are allowed
console.log(arr.slice(-2)); // [ 's', 't' ]

//--------------------------------------------------------------------------------------

// .concat
// array.concat(argument1 [, argument2]) joins the array with other arrays and/or items
// It accepts any number of arguments – either arrays or values
let arr = [1, 2];

console.log(arr.concat([3, 4])); // [ 1, 2, 3, 4 ]
console.log(arr.concat([3, 4], 5)); // [ 1, 2, 3, 4, 5 ]
console.log(arr.concat([3, 4], [5, 6])); // [ 1, 2, 3, 4, 5, 6 ]

// Normally, it only copies elements from arrays. Other objects, even if they look like arrays, added as a whole
let arrayLike = {
   0: 'something',
   length: 1,
};

console.log(arr.concat(arrayLike)); // [ 1, 2, { '0': 'something', length: 1 } ]

// If an argument is an array or has Symbol.isConcatSpreadable property, then all its elements are copied.
let arrayLike2 = {
   0: 'something',
   1: 'else',
   [Symbol.isConcatSpreadable]: true,
   length: 2,
};

console.log(arr.concat(arrayLike2)); // [ 1, 2, 'something', 'else' ]

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Searching in array

// .indexOf
// array.indexOf(item, from) looks for item starting from index from, and returns the index where it was found, otherwise -1
let arr = [0, 1, false, 0];

console.log(arr.indexOf(0)); // 0
console.log(arr.indexOf(0, 1)); // 3
console.log(arr.indexOf(false)); // 2
console.log(arr.indexOf(null)); // -1

// .lastIndexOf
// array.lastIndexOf(item, from) the same as .indexOf but looks from right to left
console.log(arr.lastIndexOf(0)); // 3
console.log(arr.lastIndexOf(0, 1)); // 0

// .includes
// array.includes(item from) looks for item starting from index from, returns true if found
// If we want to check for inclusion, and don’t want to know the exact index, then .includes is preferred
console.log(arr.includes(0)); // true
console.log(arr.includes(false)); // true
console.log(arr.includes(null)); // false

// .includes correctly handles NaN
const arr2 = [NaN];
console.log(arr2.includes(NaN)); // true

console.log(arr2.indexOf(NaN)); // -1 (because of === comparison)

//--------------------------------------------------------------------------------------

// .find
/*  let result = array.find(function(item, index, array) {
        // should return true if the item is what we are looking for
    });
*/
// The function is called repetitively for each element of the array
// If it returns true, the search is stopped, the item is returned. If nothing found, undefined is returned.
let users = [
   { id: 1, name: 'John' },
   { id: 2, name: 'Pete' },
   { id: 3, name: 'Mary' },
];

let user = users.find(item => item.id == 2);

console.log(user.name); // Pete

// .findIndex
//  it returns the index where the element was found instead of the element itself.
let user2 = users.findIndex(item => item.id == 2);
console.log(user2); // 1

//--------------------------------------------------------------------------------------

// .filter
/*  let results = array.filter(function(item, index, array) {
        // should return true if the item passes the filter
    });
*/
// returns an array of matching elements:
let users = [
   { id: 1, name: 'John' },
   { id: 2, name: 'Pete' },
   { id: 3, name: 'Mary' },
];

let someUsers = users.filter(item => item.id < 3);

console.log(someUsers.length); // 2
console.log(someUsers); // [ { id: 1, name: 'John' }, { id: 2, name: 'Pete' } ]

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Transform an array

// .map
/*  let result = arr.map(function(item, index, array) {
        // returns the new value instead of item
    })
*/
// It calls the function for each element of the array and returns the array of results.
let lengths = ['Bilbo', 'Gandalf', 'Nazgul'].map(item => item.length);
console.log(lengths); // [ 5, 7, 6 ]

//--------------------------------------------------------------------------------------

// .sort(fn)
// sorts the array in place
let arr = [1, 2, 15];

// the method reorders the content of arr (and returns it)
arr.sort();

console.log(arr); // 1, 15, 2

//--------------------------------------------------------------------------------------

// .split/  .join

//--------------------------------------------------------------------------------------

// .reduce/  .reduceRight

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - What is this code going to show?
let fruits = ['Apples', 'Pear', 'Orange'];

// push a new value into the "copy"
let shoppingCart = fruits;
shoppingCart.push('Banana');

// what's in fruits?
console.log(fruits.length); // 4

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Array operations
let styles = ['Jazz', 'Blues'];
console.log(styles); // [ 'Jazz', 'Blues' ]

styles[2] = 'Rock-n-Roll';
console.log(styles); // [ 'Jazz', 'Blues', 'Rock-n-Roll' ]

function replaceMiddle(array) {
   if (array.length % 2 !== 0) {
      array[(array.length - 1) / 2] = 'Classics';
   }
}

replaceMiddle(styles);
console.log(styles); // [ 'Jazz', 'Classics', 'Rock-n-Roll' ]

styles.shift();
console.log(styles); // [ 'Classics', 'Rock-n-Roll' ]

styles.unshift('Rap', 'Reggae');
console.log(styles); // [ 'Rap', 'Reggae', 'Classics', 'Rock-n-Roll' ]

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Calling in an array context - What is the result? Why?
let arr = ['a', 'b'];

arr.push(function() {
   console.log(this);
});

arr[2](); // [ 'a', 'b', [Function] ]

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Sum input numbers
function sumInput() {
   let numbers = [];

   while (true) {
      let input = prompt('Enter a value want to add?', 0);

      if (input == '' || input == null || !isFinite(input)) break;

      numbers.push(+input);
   }

   let sum = 0;
   for (let number of numbers) {
      sum += number;
   }

   alert(sum);
}
sumInput();

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Create an extendable calculator
/* function Calculator() {
    calculate(str) {

    }
}

let calc = new Calculator();
console.log(calc.calculate("3 + 7")); */

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - A maximal subarray
function getMaxSubSum(arr) {
   let subarray = 0;

   for (let i = 0; i < arr.length; i++) {
      let sum = 0;
      for (let j = i; j < arr.length; j++) {
         sum += arr[j];
         subarray = Math.max(sum, subarray);
      }
   }

   console.log(subarray);
}

getMaxSubSum([-1, 2, 3, -9]);
getMaxSubSum([2, -1, 2, 3, -9]);
getMaxSubSum([-1, 2, 3, -9, 11]);
getMaxSubSum([-2, -1, 1, 2]);
getMaxSubSum([100, -9, 2, -3, 5]);
getMaxSubSum([1, 2, 3]);
getMaxSubSum([-1, -2, -3]);
