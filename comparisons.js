/* The comparison returns a value of the boolean type.
    - Greater/less than: a > b, a < b.
    - Greater/less than or equals: a >= b, a <= b.
    - Equality check is written as a == b (please note the double equation sign =. A single symbol a = b would mean an assignment).
    - Not equals. In maths the notation is ≠, in JavaScript it’s written as an assignment with an exclamation sign before it: a != b.
*/

console.log(2 > 1); // true
console.log(2 == 1); // false
console.log(2 != 1); // true

let result = 5 > 4; // assign the result of the comparison
console.log(result); // true

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// String comparison
// To see which string is greater than the other, the so-called “dictionary” or “lexicographical” order is used (strings are compared letter-by-letter).
console.log('Z' > 'A'); // true
console.log('Glow' > 'Glee'); // true
console.log('Bee' > 'Be'); // true

/*  The algorithm to compare two strings is simple:
    1.  Compare first characters of both strings.
    2.  If the first one is greater(or less), then the first string is greater(or less) than the second. We’re done.
    3.  Otherwise if first characters are equal, compare the second characters the same way.
    4.  Repeat until the end of any string.
    5.  If both strings ended simultaneously, then they are equal. Otherwise the longer string is greater.
*/

/* --------------------REMEMBER--------------------
Case matters! A capital letter "A" is not equal to the lowercase "a".
Actually, the lowercase "a" is greater because of a greater index in the internal encoding table (Unicode). */

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Comparison of different types
// When compared values belong to different types, they are converted to numbers.
console.log('2' > 1); // true, string '2' becomes a number 2
console.log('01' == 1); // true, string '01' becomes a number 1

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Strict equality
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using

//--------------------REMEMBER--------------------
//  TRUE
console.log(true == 1);
console.log(true == '1');
console.log(true == [1]);
console.log(false == 0);
console.log(false == '0');
console.log(false == '');
console.log(false == ' ');
console.log(false == []);
console.log(false == [[]]);
console.log(false == [0]);
console.log(0 == '');
console.log(0 == ' ');
console.log(0 == []);
console.log(0 == [[]]);
console.log(null == undefined);
//  FALSE
console.log(null == 0);
console.log('0' == '');
console.log('0' == []);
console.log('' == [0]);
console.log('' == ' ');

// Remember that for maths and other comparisons < > <= >= values null/undefined are converted to a number.
// Null becomes 0, while undefined becomes NaN.

console.log(null > 0); // false
console.log(null == 0); // false
console.log(null >= 0); // true

console.log(undefined > 0); // false
console.log(undefined < 0); // false
console.log(undefined == 0); // false
