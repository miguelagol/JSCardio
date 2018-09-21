// To String

let value = true;
console.log(typeof value); // boolean

value = String(value);
console.log(typeof value); // string
console.log(value); // "true"

//------------------------------------------------------------------------------------------------------------------------------------------------------

// To Number
let str = "123";
console.log(typeof str); // string

str = Number(str);
console.log(typeof str); // number
console.log(str); // 123

// Numeric conversion happens in mathematical functions and expressions automatically
console.log("6" / "2"); // 3

console.log(Number("123")); // 123
console.log(Number("   123   ")); // 123 - Whitespaces from the start and the end are removed
console.log(Number("123d")); // NaN
console.log(Number("")); // 0
console.log(Number(" ")); // 0
console.log(Number(true)); // 1
console.log(Number(false)); //0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN

// Short version of conversion to number is +value
console.log(+"321"); // 321
console.log(+null); // 0

//------------------------------------------------------------------------------------------------------------------------------------------------------

// To Boolean
/* The conversion rule:
    - Values that are intuitively “empty”, like 0, an empty string, null, undefined and NaN become false.
    - Other values become true.
*/
console.log(Boolean(123)); // true
console.log(Boolean("123")); // true
console.log(Boolean("lelolelo")); // true
console.log(Boolean("0")) // true
console.log(Boolean("")); // false
console.log(Boolean(" ")); // true - this is not an empty string. There is a space.
console.log(Boolean(0)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

// We can use a double NOT! - but it's not recomended
console.log(!!"123");
console.log(!!"0");
console.log(!!0);

/* --------------------REMEMBER--------------------
The notable exceptions where people usually make mistakes are:
    - undefined is NaN as a number, not 0.
    - "0" and space-only strings like " " are true as a boolean.
*/