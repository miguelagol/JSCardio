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

//------------------------------------------------------------------------------------------------------------------------------------------------------

// Object to primitive
/*  For objects, there’s no to-boolean conversion, because all objects are true in a boolean context.
    So there are only string and numeric conversions.
*/
/*  To do the conversion, JavaScript tries to find and call three object methods:
    1.  Call obj[Symbol.toPrimitive](hint) if the method exists,
    2.  Otherwise if hint is "string"
        try obj.toString() and obj.valueOf(), whatever exists.
    3.  Otherwise if hint is "number" or "default"
        try obj.valueOf() and obj.toString(), whatever exists.
*/

// Symbol.toPrimitive
/*  obj[Symbol.toPrimitive] = function(hint) {
        // return a primitive value
        // hint = one of "string", "number", "default"
    }
*/
let user = {
    name: "John",
    money: 1000,
    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

//conversion demo:
console.log(String(user)); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

//--------------------------------------------------------------------------------------

// toString/valueOf
/* If there’s no Symbol.toPrimitive then JavaScript tries to find them and try in the order:
    -   toString -> valueOf for “string” hint.
    -   valueOf -> toString otherwise. 
*/
let user = {
    name: "Pete",
    money: 100,

    // for hint = "string"
    toString() {
        console.log("toString");
        return `{name: "${this.name}"}`;
    },

    // for hint = "number" or hint = "default"
    valueOf() {
        console.log("valueOf");
        return this.money;
    }
};

console.log(String(user)); // toString -> {name: "Pete"}
console.log(+user); // valueOf -> 100
console.log(user + 200); // valueOf -> 300

// In the absence of Symbol.toPrimitive and valueOf, toString will handle all primitive conversions.
let user = {
    name: "John",
    toString() {
        return this.name;
    }
};

console.log(String(user)); // John
console.log(user + 500); // John500

//------------------------------------------------------------------------------------------------------------------------------------------------------

// ToPrimitive and ToString/ToNumber
let obj1 = {
    toString() {    // toString handles all conversations in the absence of other methods
        return "2";
    }
};

console.log(obj1 * 3); // 6 (ToPrimitive gives "2", then ToNumber (because of obj1 * 3) gives 2)
console.log(obj1 + 2); // 32 (ToPrimitive returned string -> concatenation)

let obj2 = {
    toString() {
        return true;
    }
}

console.log(obj2 + 2); // 3 (ToPrimitive returned boolean, then ToNumber gives 1 (because of true is not a string))