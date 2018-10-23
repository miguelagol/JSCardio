// Quotes
// In JavaScript, there are 3 types of quotes.
let str = "Hello double"; // Double quotes
let str2 = 'Hello single'; // Single quotes
let str3 = `Hello backsticks`; // Backticks - They allow us to embed variables and expressions into a string by wrapping them in ${…}

// embed a variiable
console.log(`Hi, Hey, ${str}`); // Hi, Hey, Hello double

// embed an expresion
console.log(`The result is ${1 + 2}`); // The result is 3
console.log("The result is ${1+2}"); // The result is ${1+2}

function sum(a, b) {
    return a + b;
}
console.log(`1 + 2 = ${sum(1, 2)}`); // 1 + 2 = 3

// Backsticks allow a string to span multiple lines
let quotesList = `Quotes:
    * Double quotes
    * Single quotes
    * Backsticks`;
console.log(quotesList);
/*  Quotes:
        * Double quotes
        * Single quotes
        * Backsticks
*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Special characters
/*  Character:    Description:
    \             Escape character
    \b            Backspace
    \f            From feed
    \n            New line
    \r            Carriage return (moving the cursor to the beginning of the line)
    \t            Tab
    \uNNNN        A unicode symbol with the hex code NNNN, for instance \u00A9 (unicode for the copyright symbol ©)
    \u{NNNNNNNN}  Some rare characters are encoded with two unicode symbols, taking up to 4 bytes. This long unicode requires braces around it.
 */
console.log("Hello\nJohn");
/*  Hello
    John
*/
console.log("Hello\nJohn\n");
/*  Hello
    John
    
*/
console.log("Hello\rJohn");
/*  Hello
    John
*/
console.log("Hello\rJohn\r");
/*  Hello
    John
*/
console.log("Hello\tJohn"); // Hello    John
console.log("\u{1F60D}"); // (smiling face symbol)

// console.log( 'I'm the Walrus!' );    SyntaxError
console.log('I\'m the Walrus!'); // I'm the Walrus!
console.log(`I'm the Walrus!`); // I'm the Walrus!

// console.log("The backslash: \");   SyntaxError
console.log("The backslash: \\");

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Methods of strings
// .length
let str = "Hello";
let str2 = "Hi\nHello";

console.log(str.length); // 5
console.log(str2.length); // 8 (\n is a single "special" character)

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Accesssing characters
// str[pos] / str.charAt(pos)

let str = "Hello";

// first character
console.log(str[0]); // H

// last character
console.log(str[str.length - 1]); // o

// .charArt (historical)
console.log(str.charAt(1)); // e

console.log(str[100]); // undefined
console.log(str.charAt(100)); // an empty string

for (let char of str) {
    console.log(char)
}                          // H, e, l, l, o

//--------------------------------------------------------------------------------------

// String are immutable
// strings can't be changed

let str = "Hi";
str[0] = "h";

console.log(str[0]); // H
console.log(str); // Hi

let str2 = "h" + str[1];

console.log(str2); // hi

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Changing the case
// .toUpperCase
let str = "JavaScript";

console.log(str.toUpperCase()); // JAVASCRIPT
console.log(str[2].toUpperCase()); // V

//--------------------------------------------------------------------------------------

// .toLowerCase
console.log(str.toLowerCase()); // javascript
console.log(str[4].toLowerCase()); // s
console.log("HTML".toLowerCase()); // html

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Searching for a substring
// .indexOf


//--------------------------------------------------------------------------------------

// .includes


//--------------------------------------------------------------------------------------

// .startsWith


//--------------------------------------------------------------------------------------

// .endsWith


//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Getting a substring
// .slice


//--------------------------------------------------------------------------------------

// .substring


//--------------------------------------------------------------------------------------

// .substr


//---------------------------------------------------------------------------------------------------------------------------------------------------------





// .trim


//--------------------------------------------------------------------------------------

// .replace


//--------------------------------------------------------------------------------------

// .slice


//--------------------------------------------------------------------------------------

// .split


//--------------------------------------------------------------------------------------

// .repeat


//--------------------------------------------------------------------------------------

// .match


//--------------------------------------------------------------------------------------

// .charCodeAt


//--------------------------------------------------------------------------------------



















let str = "la ti da ";
str2 = str.repeat(4).trim();
console.log(str2);
console.log(str2.length);
str3 = str.repeat(4);
console.log(str3);
console.log(str3.length);


// https://codepen.io/chriscoyier/post/javascript-string-methods








/* let str = "Hello";
console.log(str.toUpperCase());
console.log(str.test); */

/* let str = "konr";
let str2;
str2 = str[0].toUpperCase() + str[1] + str[2] + str[3];


console.log(str2) */





// TASK 1 - Uppercast the first character
// Vol1
function ucFirst(str) {
    let len = str.length;
    let strUC;
    strUC = str[0].toUpperCase();
    for (i = 1; i < len; i++) {
        strUC += str[i]
    }
    console.log(strUC);
}

ucFirst("henio"); // Henio

// Vol2
function ucFirst2(str) {
    console.log(str[0].toUpperCase() + str.slice(1));
}

ucFirst2("zbysio"); // Zbysio

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - CHeck for spam
function checkSpam(str) {
    str = str.toLowerCase();
    if (str.includes('viagra') || str.includes('xxx')) {
        console.log(true);
    }
    else { console.log(false) }
}

checkSpam('buy ViAgRa now'); // true
checkSpam('free xxxxxx'); // true
checkSpam('innocent rabbit'); // false

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Truncate the string
function truncate(str, maxlength) {
    let length = str.length;
    if (length > maxlength) {
        console.log(str.substring(0, maxlength - 1) + '…')
    }
    else console.log(str)
}

truncate("What I'd like to tell on this topic is:", 20); // What I'd like to te…
truncate("Hi everyone!", 20); // Hi everyone!

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Extract the money

function extractCurrencyValue(str) {
    console.log(+str.substring(1));
}

extractCurrencyValue('$120');