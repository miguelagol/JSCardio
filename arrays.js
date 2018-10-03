







let array = ["one", "two", "three"];

console.log(array); // [ 'one', 'two', 'three' ]

array[3] = "four"; // Array elements are numbered, starting with zero.
console.log(array); // [ 'one', 'two', 'three', 'four' ]

console.log(array.length); // 4

array.pop(); // pop takes an element from the end.
console.log(array.pop()); // remove last element and alert it - three

array.push("four"); // push adds ana element to the end
console.log(array); // [ 'one', 'two', 'three', 'four' ]

array.shift(); // Extracts the first element of the array
console.log(array); // [ 'two', 'three', 'four' ]

array.unshift("one"); // Add the element to the beginning of the array
console.log(array); // [ 'one', 'two', 'three', 'four' ]

let array2 = [];

array2[9] = 5; // create 9 empty items and then 5
array2.name = "array";
console.log(array2); // [ <9 empty items>, 5, name: 'array' ]

for (let key of array2) {
    console.log(key)
}

/* for (let key2 in array2) {   // we shouldn't use for..in for arrays
    console.log(key2)
} */


// ARRAYS TASK 2 - Array operations

/* let styles = ["Jazz", "Blues"];
console.log(styles);
styles[2] = "Rock-n-Roll";
console.log(styles);
function replaceMiddle(array) {
    if (array.length%2 !== 0) {
        array[array.length - 2] = "Classics"
    }
}
replaceMiddle(styles);
console.log(styles);
styles.shift();
console.log(styles);
styles.unshift("Rap", "Reggae");
console.log(styles);

// ARRAYS TASK 3 - Calling in an array context
let arr = ["a", "b"];

arr.push(function() {
  console.log( this );
})

arr[2](); */

// ARRAYS TASK 4 - Sum input numbers

/* function sumInput() {
    let numbers = [];

    while (true) {
        let input = prompt('Enter a value want to add?', 0);

        if (input == "" || input == null || !isFinite(input)) break;
            
        numbers.push(+input);
    }

    let sum = 0
    for (let number of numbers) {
        sum += number;
    }
    
    alert(sum);
}
sumInput(); */

// ARRAYS TASK 5 - Create an extendable calculator

/* function Calculator() {
    calculate(str) {

    }
}

let calc = new Calculator();
alert ( calc.calculate("3 + 7") ); */

//ARRAYS TASK 6 - A maximal subarray

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


// ARRAY SPLICE
// arr.splice(index[, deleteCount, elem1, ..., elemN])

let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

console.log(arr) // now ["Let's", "dance", "right", "now"]

let removed = arr.splice(0, 2);

console.log(removed); // "Let's", "dance" <-- array of removed elements
