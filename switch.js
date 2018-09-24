// A switch statement can replace multiple if checks.
/*  switch(x) {
        case 'value1':  // if (x === 'value1')
        ...
        [break]
    
        case 'value2':  // if (x === 'value2')
        ...
        [break]
    
        default:
        ...
        [break]
    }
*/
let a = 2 + 2;

switch (a) {
    case 3:
        console.log('Too small');
        break;
    case 4:
        console.log('Exactly!');
        break;
    case 5:
        console.log('Too large');
        break;
    default:
        console.log("I don't know such values");
}   // Exactly!

//--------------------REMEMBER--------------------
// If there is no break then the execution continues with the next case without any checks.

switch (a) {
    case 3:
        console.log('Too small');
    case 4:
        console.log('Exactly!');
    case 5:
        console.log('Too large');
    default:
        console.log("I don't know such values");
}   // Exactly!, Too large, I don't know such values

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Grouping of "case"
switch (a) {
    case 4:
        console.log('Right!');
        break;
    case 3:            // grouped two cases
    case 5:
        console.log('Wrong!');
        console.log("Why don't you take a math class?");
        break;
    default:
        console.log('The result is strange. Really.');
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Type metters
// The values must be of the same type to match.

let arg = prompt("Enter a value?")
switch (arg) {
    case '0':
    case '1':
        console.log('One or zero');
        break;
    case '2':
        console.log('Two');
        break;
    case 3:
        console.log('Never executes!'); // typeof(arg) = string => '3' != 3
        break;
    default:
        console.log('An unknown value')
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Rewrite the "switch" into an "if"
/*  switch (browser) {
        case 'Edge':
            console.log( "You've got the Edge!" );
            break;
        case 'Chrome':
        case 'Firefox':
        case 'Safari':
        case 'Opera':
            console.log( 'Okay we support these browsers too' );
            break;
        default:
            console.log( 'We hope that this page looks ok!' );
  } */
if (browser == 'Edge') {
    console.log("You've got the Edge!");
}
else if (browser == 'Chrome' || browser == 'Firefox' || browser == 'Safari' || browser == 'Opera') {
    console.log('Okay we support these browsers too');
}
else {
    console.log('We hope that this page looks ok!');
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Rewrite "if" into "switch"
/*  let a = +prompt('a?', '');

    if (a == 0) {
        console.log( 0 );
    }
    if (a == 1) {
        console.log( 1 );
    }
    if (a == 2 || a == 3) {
        console.log( '2,3' );
    }
*/
let a = +prompt('a?', '');

switch (a) {
    case 0:
        alert(0);
        break;
    case 1:
        alert(1);
        break;
    case 2:
    case 3:
        alert('2,3');
        break;
}