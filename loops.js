// "use strict"

// The "while" loop
/*  while (condition) {
        // code
        // so-called "loop body"
    }
*/
// While the condition is true, the code from the loop body is executed.
let k = 0;
while (k < 3) {
    console.log(`Number ${k}!`);
    k++;
}

let i = 3;
while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
    console.log(i);
    i--;
}
// The same as:
// while (i) console.log(i--);

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// The "do..while" loop
/*  do {
        // loop body
    } while (condition);
*/
// The loop will first execute the body, then check the condition and, while it’s truthy, execute it again and again.
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 3);

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// The "for" loop
/*  for (begin; condition; step) {
        // ... loop body ...
    }
*/
/*  begin   - Executes once upon entering the loop.
    condition   - Checked before every loop iteration, if fails the loop stops.
    step    - Executes AFTER the body on each iteration, but BEFORE the condition check.
    body    - Runs again and again while the condition is truthy
*/
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
    console.log(i);
}

// Any part of for can be skipped.
let j = 0; // we have i already declared and assigned

for (; j < 3; j++) { // no need for "begin"
    console.log(j); // 0, 1, 2
}

//or
let k = 0;

for (; k < 3;) {
    console.log(k++);
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Breaking the loop
// We can force the exit loop at any moment. There’s a special break directive for that.
let sum = 0;

while (true) {
    let value = +prompt("Enter a number", '');
    if (!value) break; // break loop when no number is entered
    sum += value;
}

alert('Sum: ' + sum);

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Continue to the next iteration
/*  The continue directive is a “lighter version” of break. It doesn’t stop the whole loop.
    Instead it stops the current iteration and forces the loop to start a new one (if the condition allows).
*/
for (let i = 0; i < 10; i++) {
    if (i % 2 == 0) continue; // if true, skip the remaining part of the body
    console.log(i); // 1, 3, 5, 7, 9
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Labels for break/continue
/*  labelName: for (...) {
        ...
    }
*/
// The break <labelName> statement in the loop breaks out to the label.
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let input = prompt(`Value at coords (${i},${j})`, '');
        if (!input) break outer; // if an empty string or canceled, then break out of both loops
    }
}
alert('Done!');

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - What is the last value alerted by this code? 
let i = 3;

while (i) {
    console.log(i--);
}   // 1

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Which values shows the while?
// prefix
let i = 0;

while (++i < 5) console.log(i);   // 1, 2, 3, 4

// postfix
let j = 0;

while (j++ < 5) console.log(j);   // 1, 2, 3, 4, 5

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Which values get shown by the "for" loop?
// prefix
for (let i = 0; i < 5; i++) console.log(i);   // 0, 1, 2, 3, 4

// postfix
for (let j = 0; j < 5; ++j) console.log(j);   // 0, 1, 2, 3, 4

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Output even numbers in the loop
for (let i = 2; i <= 10; i++) {
    if (i % 2 == 0) {
        console.log(i);
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Replace "for" with "while"
/*  for (let i = 0; i < 3; i++) {
        console.log( `number ${i}!` );
    }
*/
let k = 0;
while (k < 3) {
    console.log(`number ${k}!`);
    k++;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Repeat until the input is correct
// let number = prompt("Type a number greather than 100", '0');
// while (number <= 100 || number == '' || number == null) {
//     number = prompt("Type a number once again");
// }
// or
let number2;
do {
    number2 = prompt("Type a number greather than 100");
} while (number2 <= 100 && number2)


//--------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Output prime numbers
for (let n = 2; n <= 10; n++) {
    for (let i = 2; i <= n; i++) {
        if (n % i == 0 && n !== i) {
            break;
        }
        else if (n % i == 0 && n == i) {
            console.log(n);
        }
    }
}