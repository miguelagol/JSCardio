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

function extractCurrencyValue(str) {
    console.log( +str.substring(1) );
}

extractCurrencyValue('$120');

