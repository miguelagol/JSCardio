'use strict';
/* --------------------REMEMBER-------------------
    This values are falsy and thus bypass the if block
    if (false)
    if (null)
    if (undefined)
    if (0)
    if (NaN)
    if ('')
    if ("")
    if (document.all)
*/

// If
// The if (…) statement evaluates the expression in parentheses and converts it to the boolean type.
// The if statement gets a condition, evaluates it and, if the result is true, executes the code
// let year = prompt('In which year was ECMAScript-2015 specification published', '');

if (year == 2015) alert('You are right!');
/*  If there is more than one statement to be executed, we have to wrap our code block inside curly braces
    ex.     if (year == 2015) {
                alert("That's correct!");
                alert("You're so smart!");
            }
*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Else
let year2 = prompt(
   'In which year was ECMAScript-2015 specification published?',
   '',
);

if (year == 2015) {
   alert('You guessed it right!');
} else {
   alert('How can you be so wrong?'); // any value except 2015
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Else if - several condition

let year3 = prompt(
   'In which year was ECMAScript-2015 specification published?',
   '',
);

if (year3 < 2015) {
   alert('Too early...');
} else if (year3 > 2015) {
   alert('Too late');
} else {
   alert('Exactly!');
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Ternary operator '?'
// let result = condition ? value1 : value2;
// The condition is evaluated, if it’s truthy then value1 is returned, otherwise – value2
let age = prompt('How old are you?', '');

let accessAllowed = age > 18 ? true : false; // The same as let accessAllowed = age > 18;
/* The if..else version
    if (age > 18) {
        accessAllowed = true;
    } else {
        accessAllowed = false;
    }
*/

alert(accessAllowed);

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Multiple '?'
let age2 = prompt('age?', 18);

let message =
   age2 < 3
      ? 'Hi, baby!'
      : age2 < 18
      ? 'Hello!'
      : age2 < 100
      ? 'Greetings!'
      : 'What an unusual age!';

alert(message);

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1
let officialName = prompt(`What's the "official" name of Javascript?`, '');

if (officialName == 'ECMAScript') {
   alert('Right!');
} else {
   alert(`You don't know? "ECMAScript"!`);
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2
let number = +prompt(`Enter a number`, 0);

if (number > 0) {
   alert(1);
} else if (number < 0) {
   alert(-1);
} else {
   alert(0);
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3
let ask = prompt(`Whos's there?`, '');

if (ask == null || ask == '') {
   alert('Canceled.');
} else if (ask == 'Admin') {
   let pass = prompt('Password?', '');
   if (pass == null || pass == '') {
      alert('Canceled.');
   } else if (pass == 'The Master') {
      alert('Welcome!');
   } else {
      alert('Wrong password.');
   }
} else {
   alert("I don't know you");
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4
/* 
    if (a + b < 4) {
        result = 'Below';
    } else {
        result = 'Over';
    }
*/

let result = a + b < 4 ? 'Below' : 'Over';

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5
/* 
    let message;

    if (login == 'Employee') {
        message = 'Hello';
    } else if (login == 'Director') {
        message = 'Greetings';
    } else if (login == '') {
        message = 'No login';
    } else {
        message = '';
    }
*/

let message =
   login == 'Employee'
      ? 'Hello'
      : login == 'Director'
      ? 'Greetings'
      : login == ''
      ? 'No login'
      : '';
