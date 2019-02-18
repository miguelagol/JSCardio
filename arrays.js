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

//------------------------------------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------------------------------------

// new Array()          rarely used
let arr = new Array('apple', 'orange', 'lemon');

/*  -------------------------REMEMBER-------------------------
    If new Array is called with a single argument which is a number,
    then it creates an array without items but with the given length
*/
let arr2 = new Array(3);

console.log(arr2[0]); // undefined      (new Array(number) has all elements undefined)
console.log(arr2.length); // 3

//------------------------------------------------------------------------------------------------------------------------------------------

// The data structure of arrays is deque ( queue + stack )

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

//------------------------------------------------------------------------------------------------------------------------------------------

// Copy by reference
let fruits = ['Apple'];
let array = fruits; // copy by reference

array.push('Lemon');
console.log(fruits); // [ 'Apple', 'Lemon' ]

//------------------------------------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------------------------------------

// Iterate: forEach
/*  array.forEach(function(item, index, arr)) {
        // ...do something with item
    }
*/
// allows to run a function for every element of the array
['Bilbo', 'Gandalf', 'Nazgul'].forEach((item, index, array) => {
   console.log(`${item} is at index ${index} in ${array}`);
}); // Bilbo is at index 0 in Bilbo,Gandalf,Nazgul  Gandalf is at index 1...

//------------------------------------------------------------------------------------------------------------------------------------------

// Multidimensional arrays
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log(matrix[1][1]); // 5

//------------------------------------------------------------------------------------------------------------------------------------------

// Array methods

// .splice
// array.splice(index[, deleteCount, elem1, ..., elemN])
// It starts from the position index, removes deleteCount elements and then inserts elem1, ..., elemN at their place.
// Returns the array of removed elements.
let arr = ['I', 'study', 'JavaScript', 'right', 'now'];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", 'dance');
console.log(arr); // [ 'Let\'s', 'dance', 'right', 'now' ]

arr.splice(2, 0, 'cuban', 'salsa');
console.log(arr); // [ 'Let\'s', 'dance', 'cuban', 'salsa', 'right', 'now' ]

let removed = arr.splice(0, 4);
console.log(removed); // [ 'Let\'s', 'dance', 'cuban', 'salsa' ]     <-- array of removed elements
console.log(arr); // [ 'right', 'now' ]

// negative indexes are allowed
let arr2 = [1, 2, 5];

arr2.splice(-1, 0, 3, 4);
console.log(arr2); // [ 1, 2, 3, 4, 5 ]

//--------------------------------------------------------------------------------------

// .slice
// array.slice(start, end) it returns a new array where it copies all items start from index "start" to "end" (NOT INCLUDING END)
let str = 'test';
let arr = ['t', 'e', 's', 't'];

console.log(str.slice(1, 3)); // es
console.log(arr.slice(1, 3)); // [ 'e', 's' ]
console.log(arr); // [ 't', 'e', 's', 't' ]  -> still the same

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
console.log(arr); // [ 1, 2 ]       <- still the same

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

//------------------------------------------------------------------------------------------------------------------------------------------

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
// The find method looks for a single (first) element that makes the function return true
// The function is called repetitively for each element of the array
let users = [
   { id: 1, name: 'John' },
   { id: 2, name: 'Pete' },
   { id: 3, name: 'Mary' },
];

let user = users.find(item => item.id == 2);

console.log(user); // { id: 2, name: 'Pete' }
console.log(user.name); // Pete

// If it returns true, the search is stopped, the item is returned. If nothing found, undefined is returned.
let user2 = users.find(item => item.id < 3);
console.log(user2); // { id: 1, name: 'John' }

// .findIndex
//  it returns the index where the element was found instead of the element itself.
let user3 = users.findIndex(item => item.id == 2);
console.log(user3); // 1

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

//------------------------------------------------------------------------------------------------------------------------------------------

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
// array.sort() sorts the array in place
let arr = [2, 15, 1];

// the method reorders the content of arr (and returns it)
arr.sort();

// The items are sorted as strings by default
console.log(arr); // 1, 15, 2

// To use our own sorting order, we need to supply a function of two arguments as the argument of arr.sort()
function compareNumeric(a, b) {
   if (a > b) return 1;
   if (a == b) return 0;
   if (a < b) return -1;
}

arr.sort(compareNumeric);
console.log(arr); // 1, 2, 15

// What happens in sequence?
let arr = [8, 12, 5, 3, -1];

arr.sort((a, b) => {
   console.log(`comparing ${a},${b}`);
   return a > b ? 1 : a === b ? 0 : -1;
});
/*  comparing 8,12
    comparing 12,5
    comparing 8,5
    comparing 12,3
    comparing 8,3
    comparing 5,3
    comparing 12,-1
    comparing 8,-1
    comparing 5,-1
    comparing 3,-1
*/

//--------------------------------------------------------------------------------------

// reverse
// array.reverse() reverses the order of elements in array
let arr = [5, 43, 1, 9, 17];

arr.reverse();
console.log(arr); // [ 17, 9, 1, 43, 5 ]

//--------------------------------------------------------------------------------------

// .split
// string.split(delimiter, length) splits the string into an array by the given delimiter
// second argument is optional - a limit on the array length
let names = 'Bilbo, Gandalf, Nazgul';
let array = names.split(',');

for (let name of array) {
   console.log(`A message to ${name}`);
} // A message to Bilbo, A message to Gandalf, A message to Nazgul

console.log(array); // [ 'Bilbo', ' Gandalf', ' Nazgul' ]

let array2 = names.split(',', 2);

console.log(array2); // [ 'Bilbo', ' Gandalf' ]

// string.split(emptyString) splits string into letters
let name = 'Test';
let arr = name.split('');

console.log(arr); // [ 'T', 'e', 's', 't' ]

// .join
// array.join(delimiter) creates a string off array items glued by delimiter between them
let array = ['Bilbo', ' Gandalf', ' Nazgul'];
let string = array.join('; ');

console.log(string); // Bilbo; Gandalf; Nazgul

//--------------------------------------------------------------------------------------

// .reduce
/*  let value = array.reduce(function(previousValue, item, index, array) {
        //...
    }, initial);
*/
// it used to calculate a single value based on the array
// previousValue is the result of the previous function call, initial for the first call
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0);

console.log(result); // 15

// We can omit the initial value
// (reduce takes the first element of the array as the initial value and starts the iteration from the 2nd element)
// But if the array is empty, then reduce call without initial value gives an error
let arr2 = [];

console.log(arr2.reduce((sum, current) => sum + current)); // TypeError: Reduce of empty array with no initial value

// .reduceRight
// does the same as .reduce but goes from right to left
let arr = [1, 2, 3, 4, 5];
let resultRight = arr.reduceRight((sum, current) => sum - current);
let result = arr.reduce((sum, current) => sum - current);

console.log(resultRight); // -5
console.log(result); // -13

//------------------------------------------------------------------------------------------------------------------------------------------

// .some
// array.some(callback[, thisArg])
// Checking if a condition is true for at least one element in the array.
// This method will return true if the condition is true on at least one element in the array, otherwise it will return false.
let friends = [13, 15, 16, 18]; //ages of group of friends

// checking if at least one of them is 18 or above
console.log(friends.some(val => val >= 18)); // true

//------------------------------------------------------------------------------------------------------------------------------------------

// .every
// array.every(callback[, thisArg])
// The every() method tests whether all elements in the array pass the test implemented by the provided function.
// This method will return true if a condition is true for all the elements in the array, otherwise it will return false.
let giftPrices = [300, 350, 399, 400];
let budgetPerGift = 450;

let checkBudget = price => price <= budgetPerGift;

console.log(giftPrices.every(checkBudget)); // true

budgetPerGift = 300;

console.log(giftPrices.every(checkBudget)); // false

//------------------------------------------------------------------------------------------------------------------------------------------

// toString
let arr = [1, 2, 3];

console.log(arr); // [ 1, 2, 3 ]
console.log(String(arr)); // 1,2,3

// Arrays do not have Symbol.toPrimitive
// They implement only toString conversion (so [] becomes an empty string)
console.log([] + 1); // 1
console.log([1] + 1); // 11
console.log([1, 2] + 1); // 1,21

//------------------------------------------------------------------------------------------------------------------------------------------

// Array.isArray
// Arrays are based on objects
console.log(typeof {}); // object
console.log(typeof []); // object

// special method for ARRAYS
console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true

//------------------------------------------------------------------------------------------------------------------------------------------

// thisArg
// Almost all array methods that call functions – like find, filter, map, with a notable exception of sort,
// accept an optional additional parameter thisArg.
// The value of thisArg parameter becomes this for function
let user = {
   age: 18,
   younger(otherUser) {
      return otherUser.age < this.age;
   },
};

let users = [{ age: 12 }, { age: 16 }, { age: 32 }];

let youngerUsers = users.filter(user.younger, user);

console.log(youngerUsers); // [ { age: 12 }, { age: 16 } ]

//------------------------------------------------------------------------------------------------------------------------------------------

// Summary methods
/*  
push(...items)          adds items to the end,
pop()                   extracts an item from the end,
shift()                 extracts an item from the beginning,
unshift(...items)       adds items to the beginning.
splice(pos, deleteCount, ...items)      at index pos delete deleteCount elements and insert items.
slice(start, end)       creates a new array, copies elements from position start till end (not inclusive) into it.
concat(...items)        returns a new array: copies all members of the current one and adds items to it. If any of items is an array,
                        then its elements are taken.

indexOf/lastIndexOf(item, pos)      look for item starting from position pos, return the index or -1 if not found.
includes(value)         returns true if the array has value, otherwise false.
find/filter(func)       filter elements through the function, return first/all values that make it return true.
findIndex               is like find, but returns the index instead of a value.

map(func)               creates a new array from results of calling func for every element.
sort(func)              sorts the array in-place, then returns it.
reverse()               reverses the array in-place, then returns it.
split/join              convert a string to array and back.
reduce(func, initial)       calculate a single value over the array by calling func for each element and passing an intermediate result
                            between the calls.

forEach(func)           calls func for every element, does not return anything.

Array.isArray(arr)      checks arr for being an array.
*/

//--------------------REMEMBER--------------------
//  Methods sort, reverse and splice modify the array itself

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - What is this code going to show?
let fruits = ['Apples', 'Pear', 'Orange'];

// push a new value into the "copy"
let shoppingCart = fruits;
shoppingCart.push('Banana');

// what's in fruits?
console.log(fruits.length); // 4

//------------------------------------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Calling in an array context - What is the result?
let arr = ['a', 'b'];

arr.push(function() {
   console.log(this);
});

arr[2](); // [ 'a', 'b', [Function] ]

//------------------------------------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - A maximal subarray
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

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Write the function camelize(str) that changes dash-separated words like “my-short-string” into camel-cased “myShortString”
function camelize(string) {
   let array = string.split('-');
   for (let i = 1; i < array.length; i++) {
      array[i] = array[i][0].toUpperCase() + array[i].slice(1);
   }
   let camelizeString = array.join('');
   console.log(camelizeString);
}

camelize('background-color'); // backgroundColor
camelize('list-style-image'); // listStyleImage
camelize('-webkit-transition'); // WebkitTransition

// or
function camelize2(string) {
   return string
      .split('-')
      .map(
         (str, index) =>
            index == 0 ? str : str[0].toUpperCase() + str.slice(1),
      )
      .join('');
}

console.log(camelize2('background-color')); // backgroundColor
console.log(camelize2('list-style-image')); // listStyleImage
console.log(camelize2('-webkit-transition')); // WebkitTransition

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Write a function filterRange(arr, a, b) that gets an array arr, looks for elements between a and b in it
//          and returns an array of them
function filterRange(array, a, b) {
   return array.filter(
      item => item == a || (item > a && item < b) || item == b,
   );
}

let arr = [5, 3, 8, 1, 12, 0, 4];
let filtered = filterRange(arr, 1, 5);

console.log(filtered); // [ 5, 3, 1, 4 ]
console.log(arr); // [ 5, 3, 8, 1, 12, 0, 4 ]

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 8 - Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes from it all values except those that
//          are between a and b. The test is: a ≤ arr[i] ≤ b
function filterRangeInPlace(array, a, b) {
   for (let i = 0; i < array.length; i++) {
      if (array[i] < a || array[i] > b) {
         array.splice(i, 1);
         i--;
      }
   }
}

let arr = [0, 5, 3, 22, 1, 12, 18, 4, 2];

console.log(arr); // [0, 5, 3, 22, 1, 12, 18, 4, 2]

filterRangeInPlace(arr, 1, 4);
console.log(arr); // [ 3, 1, 4, 2 ]

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 9 - Sort in the reverse order
let arr = [5, 2, 1, -10, 8];

arr.sort((a, b) => b > a);
console.log(arr); // [ 8, 5, 2, 1, -10 ]

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 10 - Copy and sort array
function copySorted(array) {
   let sortedArray = [];
   for (let i = 0; i < array.length; i++) {
      sortedArray[i] = array[i];
   }
   return sortedArray.sort();
}

let arr = ['HTML', 'JavaScript', 'CSS'];
let sorted = copySorted(arr);

console.log(arr); // [ 'HTML', 'JavaScript', 'CSS' ]
console.log(sorted); // [ 'CSS', 'HTML', 'JavaScript' ]

// or
function copySorted2(array) {
   return array.slice().sort();
}

let sorted2 = copySorted2(arr);

console.log(arr); // [ 'HTML', 'JavaScript', 'CSS' ]
console.log(sorted2); // [ 'CSS', 'HTML', 'JavaScript' ]

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 11 - Create an extendable calculator
function Calculator(string) {
   this.calculate = function(string) {
      let array = string.split(' ');
      if (array[1] === '+') {
         return +array[0] + +array[2];
      } else return +array[0] - +array[2];
   };
}

let calc = new Calculator();

console.log(calc.calculate('3 + 7')); // 10

function Calculator2() {
   let methods = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
   };
   this.calculate = function(string) {
      let array = string.split(' ');
      let a = +array[0];
      let sign = array[1];
      let b = +array[2];

      if (!methods[sign] || isNaN(a) || isNaN(b)) {
         return NaN;
      }

      return methods[sign](a, b);
   };
   this.addMethods = function(name, func) {
      methods[name] = func;
   };
}

let calc2 = new Calculator2();
calc2.addMethods('*', (a, b) => a * b);
calc2.addMethods('/', (a, b) => a / b);
calc2.addMethods('**', (a, b) => a ** b);

console.log(calc2.calculate('3 * 7')); // 21
console.log(calc2.calculate('18 / 6')); // 3
console.log(calc2.calculate('2 ** 5')); // 32
console.log(calc2.calculate('1 + 14')); // 15

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 12 - Map to names
let jack = {
   name: 'Jack',
   age: 34,
};
let mary = {
   name: 'Mary',
   age: 12,
};
let ann = {
   name: 'Ann',
   age: 45,
};
let users = [jack, mary, ann];
let names = [];

for (let user of users) {
   names[users.indexOf(user)] = user.name;
}

console.log(names); // [ 'Jack', 'Mary', 'Ann' ]

// or
let names2 = users.map(user => user.name);

console.log(names2); // [ 'Jack', 'Mary', 'Ann' ]

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 13 - Map to objects
let jack = {
   name: 'Jack',
   surname: 'London',
   id: 1,
};
let mary = {
   name: 'Mary',
   surname: 'Hunt',
   id: 2,
};
let ann = {
   name: 'Ann',
   surname: 'Smith',
   id: 3,
};
let users = [jack, mary, ann];
let usersMapped = users.map(
   user =>
      (userMapped = {
         fullName: `${user.name} ${user.surname}`,
         id: user.id,
      }),
);

console.log(usersMapped[0].id); // 1
console.log(usersMapped[1].fullName); // Mary Hunt
console.log(usersMapped[2]); // { fullName: 'Ann Smith', id: 3 }

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 14 - Sort objects
function sortByName(array) {
   array.sort((user1, user2) => user1.name > user2.name);
}

let jack = {
   name: 'Jack',
   age: 34,
};
let mary = {
   name: 'Mary',
   age: 12,
};
let ann = {
   name: 'Ann',
   age: 45,
};
let users = [jack, mary, ann];

sortByName(users);

console.log(users[0].name); // Ann

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 15 - Shuffle an array
function shuffle(array) {
   for (let i = array.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to 1
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
   }
   return array;
}

let arr = [1, 2, 3];

console.log(shuffle(arr));
console.log(shuffle(arr));
console.log(shuffle(arr));

// test
// counts of appearances for all possible permutations
let count = {
   '123': 0,
   '132': 0,
   '213': 0,
   '231': 0,
   '321': 0,
   '312': 0,
};

for (let i = 0; i < 1000000; i++) {
   let array = [1, 2, 3];
   shuffle(array);
   count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
   console.log(`${key}: ${count[key]}`);
}

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 16 - Get average age
function getAverageAge(array) {
   let array2 = array.map(user => user.age);
   let sumAge = array2.reduce((age1, age2) => age1 + age2, 0);
   return sumAge / array.length;
}

let jack = {
   name: 'Jack',
   age: 34,
};
let mary = {
   name: 'Mary',
   age: 17,
};
let ann = {
   name: 'Ann',
   age: 45,
};

let users = [jack, mary, ann];

console.log(getAverageAge(users)); // 32

//or
function getAverageAge2(array) {
   return array.reduce((age1, user) => age1 + user.age, 0) / array.length;
}

console.log(getAverageAge2(users)); // 32

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 17 - Filter unique array members
function unique(arr) {
   let arr2 = [];
   for (let string of arr) {
      if (!arr2.includes(string)) {
         arr2.push(string);
      }
   }
   return arr2;
}

let strings = [
   'Hare',
   'Krishna',
   'Hare',
   'Krishna',
   'Krishna',
   'Krishna',
   'Hare',
   'Hare',
   ':-O',
];

console.log(unique(strings)); // [ "Hare", 'Krishna', ':-O' ]

let strings2 = ['Ala', 'ma', 'Ala', 'kota', 'ma', 'Ala', ':)', 'kota'];

console.log(unique(strings2)); // [ 'Ala', 'ma', 'kota', ':)' ]
