// Quotes
// In JavaScript, there are 3 types of quotes.
let str = 'Hello double'; // Double quotes
let str2 = 'Hello single'; // Single quotes
let str3 = `Hello backsticks`; // Backticks - They allow us to embed variables and expressions into a string by wrapping them in ${…}

// embed a variiable
console.log(`Hi, Hey, ${str}`); // Hi, Hey, Hello double

// embed an expresion
console.log(`The result is ${1 + 2}`); // The result is 3
console.log('The result is ${1+2}'); // The result is ${1+2}

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
console.log('Hello\nJohn');
/*  Hello
    John
*/
console.log('Hello\nJohn\n');
/*  Hello
    John
    
*/
console.log('Hello\rJohn');
/*  Hello
    John
*/
console.log('Hello\rJohn\r');
/*  Hello
    John
*/
console.log('Hello\tJohn'); // Hello    John
console.log('\u{1F60D}'); // 😍 (smiling face symbol)

// console.log( 'I'm the Walrus!' );    SyntaxError
console.log("I'm the Walrus!"); // I'm the Walrus!
console.log(`I'm the Walrus!`); // I'm the Walrus!

// console.log("The backslash: \");   SyntaxError
console.log('The backslash: \\'); // The backslash: \

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Methods of strings
// .length
let str = 'Hello';
let str2 = 'Hi\nHello';

console.log(str.length); // 5
console.log(str2.length); // 8 (\n is a single "special" character)

// Most symbols have a 2-byte code.
// (But 2 bytes only allow 65536 combinations and that’s not enough for every possible symbol.
// So rare symbols are encoded with a pair of 2-byte characters called “a surrogate pair”.)
console.log('𝒳'.length); // 2, mathematical scripts capital X
console.log('😂'.length); // 2, face with tears of joy
console.log('𩷶'.length); // 2, a rare chinese hieroglyph

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Accesssing characters
// str[pos] / str.charAt(pos)

let str = 'Hello';

// first character
console.log(str[0]); // H

// last character
console.log(str[str.length - 1]); // o

// .charArt (historical)
console.log(str.charAt(1)); // e

console.log(str[100]); // undefined
console.log(str.charAt(100)); // an empty string

for (let char of str) {
   console.log(char);
} // H, e, l, l, o

//--------------------------------------------------------------------------------------

// String are immutable
// strings can't be changed

let str = 'Hi';
str[0] = 'h';

console.log(str[0]); // H
console.log(str); // Hi

let str2 = 'h' + str[1];

console.log(str2); // hi

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Changing the case
// .toUpperCase()
let str = 'JavaScript';

console.log(str.toUpperCase()); // JAVASCRIPT
console.log(str[2].toUpperCase()); // V

//--------------------------------------------------------------------------------------

// .toLowerCase()
console.log(str.toLowerCase()); // javascript
console.log(str[4].toLowerCase()); // s
console.log('HTML'.toLowerCase()); // html

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Searching for a substring
// .indexOf
// string.indexOf(substring, position)
/*  It looks for the substring in string, starting from the given position,
    and returns the position where the match was found or -1 if nothing can be found.
*/
let str = 'Widget with id';

console.log(str.indexOf('Widget')); // 0
console.log(str.indexOf('widget')); // -1
console.log(str.indexOf('id')); // 1 ("id" is found at the position 1 ...idget with id)
console.log(str.indexOf('id', 2)); // 12

let str = 'As sly as a fox, as strong as an ox';
let target = 'as';
let pos = 0;

while (true) {
   let foundPos = str.indexOf(target, pos);
   if (foundPos == -1) break;

   console.log(`Found at ${foundPos}`);
   pos = foundPos + 1;
}

// the same as
let str2 = 'As sly as a fox, as strong as an ox';
let target2 = 'as';
let pos2 = -1;

while ((pos2 = str2.indexOf(target2, pos2 + 1)) != -1) {
   console.log(pos2);
} // 7, 17, 27

// and reverse order
let str3 = 'As sly as a fox, as strong as an ox';
let target3 = 'as';
let pos3 = str3.length;

while ((pos3 = str3.lastIndexOf(target3, pos3 - 1)) != -1) {
   console.log(pos3);
} // 27, 17, 7

//------------------REMEMBER-------------------
/*  Don't put indexOf in the if like this:
        if (str.indexOf("substr")) {...}
    Because str.indexOf("substr") returns 0 (meaning that it found the match at the starting position) and if considers 0 to be false.
*/

// The bitwise NOT trick
let str = 'Key is here';

if (~str.indexOf('Key')) {
   console.log('Found it!');
}

// Becasuse of
// ~ converts the number to a 32-bit integer (removes the decimal part if exists) and then reverses all bits in its binary representation.
// For 32-bit integers the call ~n means exactly the same as -(n+1)
console.log(~2); // -3
console.log(~1); // -2
console.log(~0); // -1
console.log(~-1); // 0

let string = 'The key is here';
let target = 'key';
let includesTarget = string.indexOf(target) > -1;

if (includesTarget) {
   console.log('We found it!');
}

//--------------------------------------------------------------------------------------

// .includes()
// string.includes(substring [, position])
// if we need to test for the match, but don’t need its position
console.log('Here is my key'.includes('key')); // true
console.log('Here is my key'.includes('keys')); // false

console.log('Here is my key'.includes('is')); // true
console.log('Here is my key'.includes('is', 6)); // false

//--------------------------------------------------------------------------------------

// .startsWith()
console.log('Here is my key'.startsWith('Here')); // true
console.log('Here is my key'.startsWith('key')); // false

//--------------------------------------------------------------------------------------

// .endsWith()
console.log('Here is my key'.endsWith('Here')); // false
console.log('Here is my key'.endsWith('key')); // true

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Getting a substring
// .slice()
// string.slice(start [, end]) returns the part of the string from start to (BUT NOT INCLUDING) end
let str = 'This is my string';

console.log(str.slice(8, 14)); // my str

// if there is no second argument, then slice goes till the end of the string
console.log(str.slice(8)); // my string

// Negative values for start/end are also possible (the position is counted from the string end)
console.log(str.slice(-6)); // string
console.log(str.slice(-6, -3)); // str

//--------------------------------------------------------------------------------------

// .substring
// string.substring(start [, end]) returns the part of the string between start and end. It allows start to be greater than end.
let str = 'This is my string';

console.log(str.substring(8, 14)); // my str
console.log(str.substring(14, 8)); // my str
console.log(str.substring(8)); // my string

// Negative arguments are NOT supported

//--------------------------------------------------------------------------------------

// .substr
// string.substr(start [, length]) returns the part of the string from start, with the given length
let str = 'This is my string';

console.log(str.substr(8, 6)); // my str
console.log(str.substr(8)); // my string

// The first argument may be negative
console.log(str.substr(-6)); // string
console.log(str.substr(-9, 6)); // my str

//----------------------------------------------------------------------------------------------------

/*  substrings method       selects...                              negatives

    slice(start, end)       from start to end (not including end)   allows negatives
    substring(start, end)   between start and end                   negative values mean 0
    subst(start, length)    from start get length characters        allows negative start
*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// .trim()
// removes white spaces from the beginning and end of a string
let str = '    I am shorter than you think          ';

console.log(str + ' ' + str.length); //     I am shorter than you think          41
str = str.trim();
console.log(str + ' ' + str.length); // I am shorter than you think 27

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// .replace()
// string.replace(pattern, replacement) return a string with a pattern replaced by a replacement string
let str = 'I have first key, second Key and third key';
let target = 'key'; // string pattern
let replace = 'dog';

console.log(str.replace(target, replace)); // I have first dog, second Key and third key

// globally replace all matches using the g (regular expression flag) - global search
let target2 = /key/g; // regex pattern (regular expression)

console.log(str.replace(target2, replace)); // I have first dog, second Key and third dog

// Case-insensitive search
let target3 = /key/gi;

console.log(str.replace(target3, replace)); // I have first dog, second dog and third dog

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// .split()
// string.split(separator) takes a separator which you want to split apart the string on, and it returns an array of strings
let str = "Let's sort this string";
let separator = ' ';

console.log(str.split(separator)); // [ 'Let\'s', 'sort', 'this', 'string' ]

let user = 'User:Name:Surname:Age';
let columns = ':';

console.log(user.split(columns)); // [ 'User', 'Name', 'Surname', 'Age' ]

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// .repeat()
// repeats a string a specified number of times
let str = 'Say Hi ';

console.log(str.repeat(4)); // Say Hi Say Hi Say Hi Say Hi

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// .match()
// string.match(regex) retrieves the matches when matching a string against a regular expression. Returns an array of strings
let str = 'I like dogs. I love Kora and Sisi.';
let target = /[A-Z]/g;

console.log(str.match(target)); // [ 'I', 'I', 'K', 'S' ]

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Concatenating strings
// string.concat(string [, string3])
let str = 'I like';
let str2 = 'dogs';

console.log(str.concat(' ', str2)); // I like dogs

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Comparing strings
// strings are compared character-by-character in alphabetical order

// A lowercase letter is always grather than than the uppercase (because their codes are greater)
console.log('a' > 'Z'); // true

// Letters with diacritical marks are "out order"
console.log('Österreich' > 'Zealand'); // true

// All strings are encoded using UTF-16

// string.codePointAt(position) returns the code for the character at position
console.log('z'.codePointAt(0)); // 122
console.log('Z'.codePointAt(0)); // 90

// String.fromCodePoint(position) creates a character by its numeric code, position
console.log(String.fromCodePoint(90)); // Z

// the older methods
/*  // string.charCodeAt(position)
    console.log('Z'.charCodeAt(0)); // 90

    // string.fromCharCode(position)
    console.log(String.fromCharCode(90)); // Z 
*/

let str = '';
for (let i = 65; i <= 220; i++) {
   str += String.fromCodePoint(i);
}
console.log(
   str,
); /*  ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
                        ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿
                        ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
                    */

// string.localeCompare(str2) to compare strings in different languages
/*  - Returns 1 if str is greater than str2 according to the language rules.
    - Returns -1 if str is less than str2.
    - Returns 0 if they are equal.
*/
console.log('Österreich'.localeCompare('Zealand')); // -1

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Diacritical marks and normalization
// To support arbitrary compositions, UTF-16 allows us to use several unicode characters.
// The base character and one or many “mark” characters that “decorate” it.
console.log('S\u0307'); // Ṡ
console.log('S\u0307\u0323'); // Ṩ

console.log('S\u0307\u0323'); // Ṩ  (S + dot above + dot below)
console.log('S\u0323\u0307'); // Ṩ  (S + dot below + dot above)

console.log('S\u0307\u0323' == 'S\u0323\u0307'); // false
console.log('S\u0307\u0323'.normalize() == 'S\u0323\u0307'.normalize()); // true

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Uppercast the first character
// Vol1
function ucFirst(str) {
   let len = str.length;
   let strUC;
   strUC = str[0].toUpperCase();
   for (i = 1; i < len; i++) {
      strUC += str[i];
   }
   console.log(strUC);
}

ucFirst('henio'); // Henio

// Vol2
function ucFirst2(str) {
   console.log(str[0].toUpperCase() + str.slice(1));
}

ucFirst2('zbysio'); // Zbysio

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - CHeck for spam
function checkSpam(str) {
   str = str.toLowerCase();
   if (str.includes('viagra') || str.includes('xxx')) {
      console.log(true);
   } else {
      console.log(false);
   }
}

checkSpam('buy ViAgRa now'); // true
checkSpam('free xxxxxx'); // true
checkSpam('innocent rabbit'); // false

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Truncate the string
function truncate(str, maxlength) {
   let length = str.length;
   if (length > maxlength) {
      console.log(str.slice(0, maxlength - 1) + '…');
   } else console.log(str);
}

truncate("What I'd like to tell on this topic is:", 20); // What I'd like to te…
truncate('Hi everyone!', 20); // Hi everyone!

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Extract the money
function extractCurrencyValue(str) {
   console.log(+str.slice(1));
}

extractCurrencyValue('$120'); // 120
