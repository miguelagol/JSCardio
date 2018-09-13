/* let str = "Hello";
console.log(str.toUpperCase());
console.log(str.test); */

/* let str = "konr";
let str2;
str2 = str[0].toUpperCase() + str[1] + str[2] + str[3];


console.log(str2) */


/* // NUMBERS TASK 1 - Sum numbers from the visitor

let x = +prompt('Enter the first number', 0);
let y = +prompt('Enter the second number', 0);

alert(x + y); */

// NUMBERS TASK 2 - Repeat until the input is a number

/* function readNumber() {
    let num;
    while (!isFinite(num)) {
        num = +prompt('Enter the numeric value', 0);
    };
    if (num === null || num === '') {
        alert(null);
    }
    else alert(num);
}

readNumber(); */

// STRINGS TASK 1 - Uppercast the first character
/* //Vol1
function ucFirst(str) {
    let len = str.length;
    let strUC;
    strUC = str[0].toUpperCase();
    for (i = 1; i < len; i++) {
        strUC += str[i]
    }
    alert(strUC);
}


let string = prompt('Enter a word', '');
ucFirst(string);

//Vol2
function ucFirst2(str) {
    console.log(str[0].toUpperCase() + str.slice(1));
}

ucFirst2("zbysio") */

//STRINGS TASK 2 - CHeck for spam

/* function checkSpam(str) {
    str = str.toLowerCase();
    if ( str.includes('viagra') || str.includes('xxx') ) {
        console.log(true);
    }
    else { console.log(false) }
}

checkSpam('buy ViAgRa now');
checkSpam('free xxxxxx');
checkSpam('innocent rabbit');
 */

//STRINGS TASK 3 - Truncate the string

/* function truncate(str, maxlength) {
    let length = str.length;
    if (length > maxlength) {
        console.log(str.substring(0, maxlength - 1) + "...")
    }
    else console.log(str)
}

truncate("What I'd like to tell on this topic is:", 20);
truncate("Hi everyone!", 20);
 */


// STRINGS TASK 4 - Extract the money

/* function extractCurrencyValue(str) {
    console.log( +str.substring(1) );
}

extractCurrencyValue('$120'); */


/* let array = [ "one", "two", "three"];

console.log(array);
array[3] = "four"
console.log(array);
console.log(array.length);
array.pop();
console.log(array.pop());
array.push("four");
console.log(array);
array.shift();
console.log(array);
array.unshift("one");
console.log(array)

let array2 = [];
array2[9] = 5;
array2.name = "array";
console.log(array2);
for (let key of array2) {
    console.log(key)
} */
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


let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

alert(arr) // now ["Let's", "dance", "right", "now"]

let removed = arr.splice(0, 2);

alert(removed); // "I", "study" <-- array of removed elements