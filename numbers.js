// Ways to write a number
let billion = 1000000000;
let billion2 = 1e9; // 1 billion, literally: 1 and 9 zeroes
let ms = 1e-6;

console.log(billion == billion2); // true
console.log(billion2); // 1000000000
console.log(7.3e9); // 7300000000
console.log(ms); // 0,000001

// Hexadecimal numbers
console.log(0xff); // 255
// console.log(0xFF); // 255

// Octal numeral system
let a = 0o377;

// Binary numeral system
let b = 0b11111111;

console.log(a == b); // true

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// toString(base)
// num.toString(base) returns a string representation of num in the numeral system with the given base

let num = 255;

console.log(num.toString(16)); // ff
console.log(num.toString(2)); // 11111111
console.log(num.toString(36)); // 73

// The base can vary from 2 to 36. By default it’s 10.
console.log(num.toString(10)); // 255

/*  Common use cases for this are:
    - base=16 is used for hex colors, character encodings etc, digits can be 0..9 or A..F.
    - base=2 is mostly for debugging bitwise operations, digits can be 0 or 1.
    - base=36 is the maximum, digits can be 0..9 or A..Z. The whole latin alphabet is used to represent a number.
*/

// Note the two dots!
// If we want to call a method directly on a number then we need to place two dots .. after it.
// If we place one more dot, then JavaScript knows that the decimal part is empty and now goes the method.
console.log((123456).toString(36)); // 2n9c
// or
console.log((123456).toString(36)); // 2n9c

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Math functions

// Rounding
// Math.floor()
// Math.floor(number) returns the largest integer less than or equal to a given number
console.log(Math.floor(5.92)); // 5
console.log(Math.floor(5.07)); // 5
console.log(Math.floor(5)); // 5
console.log(Math.floor(-5.32)); // -6

//--------------------------------------------------------------------------------------

// Math.ceil()
// Math.ceil(number) returns the smallest integer greater than or equal to a given number
console.log(Math.ceil(5.07)); // 6
console.log(Math.ceil(5.92)); // 6
console.log(Math.ceil(5)); // 5
console.log(Math.ceil(-5.32)); // -5

//--------------------------------------------------------------------------------------

// Math.round()
// Math.round(number) returns the value of a number rounded to the nearest integer (0..4 lead down while 5..9 lead up)
console.log(Math.round(5.07)); // 5
console.log(Math.round(5.5)); // 6
console.log(Math.round(5.92)); // 6
console.log(Math.round(5)); // 5
console.log(Math.round(-5.32)); // -5
console.log(Math.round(-5.5)); // -5

//--------------------------------------------------------------------------------------

// Math.trunc()
// not supported by Internet Explorer
// Math.trunc(number) returns the integer part of a number by removing any fractional digits
console.log(Math.trunc(12.97)); // 12
console.log(Math.trunc(5.5)); // 5
console.log(Math.trunc(0.72)); // 0
console.log(Math.trunc(-0.72)); // 0

//--------------------------------------------------------------------------------------

// Rounding numer to n-th digit after the decimal
// 1.   Multiply-and-divide
let num = 1.23456;
console.log(Math.floor(num * 100) / 100); // 1.23
console.log(typeof (Math.floor(num * 100) / 100)); // number

// 2.   .toFixed()
//      number.toFixed(n) rounds the number to n digits after the points (the nearest integer - 0..4 lead down while 5..9 lead up)
//      and returns a string representation of the result
let num = 1.23;
console.log(num.toFixed(1)); // 1.2

let num2 = 1.26;
console.log(num2.toFixed(1)); // 1.3
console.log(typeof num2.toFixed(1)); // string
console.log(num2.toFixed(5)); // 1.26000

//--------------------------------------------------------------------------------------

// Other math functions
// Math.random()
// returns a random number from 0 to 1
console.log(Math.random()); // 0.5670154691616951
console.log(Math.random()); // 0.8315617149341095
console.log(Math.random()); // ... any random number

//--------------------------------------------------------------------------------------

// Math.max() / Math.min()
// Math.max(a, b, c...) / Math.min(a, b, c...) returns the greatest/smallest from arbitrary number of arguments
console.log(Math.max(12, 34, 2, -42)); // 34
console.log(Math.min(2, 43, -17, 0)); // -17

//--------------------------------------------------------------------------------------

// Math.pow()
// Math.pow(number, power) returns number raised the given power
console.log(Math.pow(2, 10)); // 1024

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Imprecise calculations
/*  A number is represented in 64-bit format IEEE-754. There are exactly 64 bits to store a number: 
    52 of them are used to store the digits, 11 of them store the position of the decimal point (they are zero for integer numbers),
    and 1 bit is for the sign.
*/
// If number is too big, it would overflow the 64-bit storage
console.log(1e500); // Infinity

// loss of precision
console.log(0.1 + 0.2 == 0.3); // false

// Why?
console.log(0.1 + 0.2); // 0.30000000000000004

// A number is stored in memory in its binary form.
// But fractions like 0.1, 0.2 that look simple in the decimal numeric system are actually unending fractions in their binary form.
console.log((0.1).toFixed(20)); // 0.10000000000000000555

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// isFinite / isNaN
// isNaN(value) converts its argument to a number and then test it for being NaN
console.log(isNaN(NaN)); // true
console.log(isNaN('13')); // false
console.log(isNaN('abc')); // true

// the value NaN is unigue in that it does not equal anything
console.log(NaN === NaN); // false

// isFinite(value) converts its argument to a number and returns true if it's a regular number (not NaN/Infinity/-Infinity)
console.log(isFinite('13')); // true
console.log(isFinite('abc')); // false
console.log(isFinite(Infinity)); // false

// the value NaN is unigue in that it does not equal anything
console.log(NaN === NaN); // false

//-------------------------REMEMBER-------------------------
//    Compare with Object.is
//    that compares values like ===, but is more reliable for two edge cases:
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// parseInt / parseFloat
// Numeric conversion using a plus + or Number() is strict. If a value is not exactly a number, it fails
console.log(+'100px'); // NaN

// They “read” a number from a string until they can. In case of an error, the gathered number is returned.
// The function parseInt(string) returns an integer, whilst parseFloat(string) will return a floating-point number
console.log(parseInt('100px')); // 100
console.log(parseFloat('12.5em')); // 12.5
console.log(parseInt('12.3')); // 12 (only the integer part is returned)
console.log(parseFloat('12.3.4')); // 12.3 (the second point stops the reading)
console.log(parseInt('a123')); // NaN (the first symbol stops the process)

// parseInt(string, radix) the radix specifies the base of the numeral system
console.log(parseInt('0xff', 16)); // 255

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Sum numbers from the visitor
let x = +prompt('Enter the first number', 0);
let y = +prompt('Enter the second number', 0);

alert(`Sum = ${x + y}`);

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Why 6.35.toFixed(1) == 6.3?
console.log((6.35).toFixed(1)); // 6.3

// Because of lossing precision (the decimal fraction 6.35 is an endless binary)
// Let's see
let num = 2.35;
console.log(num.toFixed(1)); // 2.4
console.log(num.toFixed(20)); // 2.35000000000000008882

let num2 = 2.65;
console.log(num2.toFixed(1)); // 2.6
console.log(num2.toFixed(20)); // 2.64999999999999991118

let num3 = 5.35;
console.log(num3.toFixed(1)); // 5.3
console.log(num3.toFixed(20)); // 5.34999999999999964473

let num4 = 5.65;
console.log(num4.toFixed(1)); // 5.7
console.log(num4.toFixed(20)); // 5.65000000000000035527

let num5 = 8.35;
console.log(num5.toFixed(1)); // 8.3
console.log(num5.toFixed(20)); // 8.34999999999999964473

let num6 = 8.65;
console.log(num6.toFixed(1)); // 8.7
console.log(num6.toFixed(20)); // 8.65000000000000035527

console.log((6.36 * 10).toFixed(0) / 10); // 6.4

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Repeat until the input is a number
function readNumber() {
   let num;

   while (!isFinite(num)) {
      num = +prompt('Enter the numeric value', 0);
   }

   if (num === null || num === '') {
      alert(null);
   } else alert(num);
}

readNumber();

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - This loop is infinite. It never ends. Why?
/*  let i = 0;

    while (i != 10) {
        i += 0.2;    // loss of precision
    }
*/
let i = 0;
while (i < 11) {
   i += 0.2;
   if (i > 9.8 && i < 10.2) console.log(i);
}
// 9.999999999999996
// 10.199999999999996

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - A random number from min to max
function random(min, max) {
   return min + Math.random() * (max - min);
}

console.log(random(1, 5));
console.log(random(1, 5));
console.log(random(1, 5));

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - A random integer from min to max
function randomInteger(min, max) {
   let random = min + Math.random() * (max - min);
   return random.toFixed(0);
}

console.log(randomInteger(1, 5));
console.log(randomInteger(1, 5));
console.log(randomInteger(1, 5));
console.log(randomInteger(1, 5));
console.log(randomInteger(1, 5));
