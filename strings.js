let str = "la ti da ";
str2 = str.repeat(4).trim();
console.log(str2);
console.log(str2.length);
str3 = str.repeat(4);
console.log(str3);
console.log(str3.length);


// https://codepen.io/chriscoyier/post/javascript-string-methods






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