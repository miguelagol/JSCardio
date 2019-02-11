// Objects
// objects are used to store keyed collections of various data and more complex entities.
// By specification, object property keys may be either of string type, or of symbol type.
// Not numbers, not booleans, only strings or symbols, these two types.

// Object constructor
let user = new Object();

// Object literal
let user = {};

//-----------------------------------------------------------------------------------------------------------------------------------------

// Literals and properties
let user = {
   // an object
   name: 'John', // key "name" store value "John"
   age: 30, // key "age" store value 30
   'likes birds': true, // multiword property name must be quoted
};

// get fields of the object:
console.log(user.name); // John
console.log(user.age); // 30

console.log(user); // { name: 'John', age: 30, 'likes birds': true }

// set a new property value
user.isAdmin = true; // dot notation
user['likes birds'] = false; // square brackets if multiword property name

console.log(user); // { name: 'John', age: 30, 'likes birds': false, isAdmin: true }

// and remove a property
delete user.isAdmin;

console.log(user); // { name: 'John', age: 30, 'likes birds': false }

let key = 'likes dogs';
// access by variable
user[key] = true;

console.log(user); // { name: 'John', age: 30, 'likes birds': false, 'likes dogs': true }

//-----------------------------------------------------------------------------------------------------------------------------------------

// Computed properties
let fruit = prompt('Which fruit to buy?', 'apple');

let bag = {
   [fruit]: 5, // the name of the property is taken from the variable fruit
};

alert(bag.apple); // 5 if fruit = "apple"

//--------------------REMEMBER--------------------
// Basically, any property name is allowed (language-reserved words also).
// But there’s a special one: "__proto__" that gets special treatment for historical reasons.

//-----------------------------------------------------------------------------------------------------------------------------------------

// Property value shorthand
// properties have the same names as variables.
function makeUser(name, age) {
   return {
      name, // same as name: name
      age, // same as age: age
   };
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// Existance check

// Compare vs undefined
let user = {};
console.log(user.noSuchProperty === undefined); // true (means "no such property")

// Special operator "in"
// "key" in object
let user2 = {
   name: 'John',
   age: 30,
};

console.log('age' in user2); // true (user.age exists)
console.log('blabla' in user2); // false (user.blabla doesn't exist)

let key = 'name';
console.log(key in user2); // true (takes the name from key and checks for such property)

//-----------------------------------------------------------------------------------------------------------------------------------------

// The “for…in” loop
/*  for(key in object) {
      // executes the body for each key among object properties
    }
*/
let user = {
   name: 'Pete',
   age: 25,
   'likes cats': false,
};

for (let property in user) {
   console.log(property);
   console.log(user[property]);
}
/*  name
    Pete
    age
    25
    likes cats
    false
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// Ordered like an object
// Integer properties are sorted, others appear in creation order
let codes = {
   '49': 'Germany',
   '41': 'Switzerland',
   '44': 'Great Britain',
   '1': 'USA',
};

for (let code in codes) {
   console.log(code); // 1, 41, 44, 49
}

let user = {
   name: 'John',
   surname: 'Smith',
};
user.age = 25; // add one more

// non-integer properties are listed in the creation order
for (let prop in user) {
   console.log(prop); // name, surname, age
}

// So, to fix the issue with the phone codes, we can “cheat” by making the codes non-integer.
let codes2 = {
   '+49': 'Germany',
   '+41': 'Switzerland',
   '+44': 'Great Britain',
   '+1': 'USA',
};

for (let code in codes2) {
   console.log(+code); // 49, 41, 44, 1
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// Copying by reference
// One of the fundamental differences of objects vs primitives is that they are stored and copied “by reference”.

let user = {
   // the object is stored somewhere in memory. And the variable user has a “reference” to it.
   name: 'Pete',
};

let admin = user; // When an object variable is copied – the reference is copied, the object is not duplicated.

admin.name = 'John';

console.log(user.name); // John

//-----------------------------------------------------------------------------------------------------------------------------------------

// Comparison by reference

//-------------------REMEMBER--------------------
// Two objects are equal only if they are the same object.

let a = {};
let b = a; // copy the reference

console.log(a == b); // true, both variables reference the same object
console.log(a === b); // true

let c = {};
let d = {}; // two independent objects

console.log(c == d); // false

//-----------------------------------------------------------------------------------------------------------------------------------------

// Const objects
const user = {
   name: 'John',
};

user.age = 25;
/*  Const fixes the value of user itself.
    And here user stores the reference to the same object all the time.
    This line goes inside the object, it doesn’t reassign user.
*/
console.log(user.age); // 25

const userJohn = {
   name: 'John',
};

// Error: Assignment to constant variable (can't reassign user)
userJohn = {
   name: 'Pete',
};

//-----------------------------------------------------------------------------------------------------------------------------------------

// Cloning and merging, Object.assign
let user = {
   name: 'John',
   age: 30,
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
   clone[key] = user[key];
}

// now clone is a fully independant clone
clone.name = 'Pete'; // changed the data in it

console.log(user.name); // John (still in the original object)

// Object.assign
// Object.assign(dest[, src1, src2, src3...])
let user2 = { name: 'John' };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user2, permissions1, permissions2);

console.log(user2); // { name: "John", canView: true, canEdit: true }

let user3 = { name: 'John' };

// If the receiving object (user) already has the same named property, it will be overwritten
Object.assign(user3, { name: 'Pete', isAdmin: true }); // // overwrite name, add isAdmin

console.log(user3); // { name: "Pete", isAdmin: true }

// Simple cloning
let user4 = {
   name: 'John',
   age: 30,
};

let clone = Object.assign({}, user4);

console.log(clone); // { name: "John", age: 30 }
clone.name = 'Pete';
console.log(clone); // { name: "Pete", age: 30 }
console.log(user4); // { name: "John", age: 30 }

// Until now we assumed that all properties of user are primitive. But properties can be references to other objects.
let user5 = {
   name: 'John',
   sizes: {
      height: 182,
      width: 50,
   },
};

let clone = Object.assign({}, user5);

console.log(user5.sizes === clone.sizes); // true (same object)

// user and clone share sizes
user5.sizes.width++; // change a property from one place
console.log(clone.sizes.width); // 51, see the result from the other one

// To fix that we need deep cloning... soon

//-----------------------------------------------------------------------------------------------------------------------------------------

// Constructor functions
// The main purpose of constructors – to implement reusable object creation code!

//------------------REMEMBER-------------------
/*  - They are named with capital letter first
    - They should be executed only with "new" operator
*/

/*  When a function is executed with "new" operator, it does the following steps:
    1.  A new empty object is created and assigned to this
    2.  The function body executes. Usually it modifies this. adds new properties to it
    3.  The value of this is returned
*/
function User(name) {
   // this = {};     (implicitly)

   this.name = name;
   this.isAdmin = false;

   // return this;   (implicitly)
}

let user = new User('John'); // Object constructor

console.log(user.name); // John
console.log(user.isAdmin); // false

//------------------------------------------------------------------------------------------

// Dual-syntax constructors: new.target
// Inside a function, we can check whether it was called with "new" or without it
function User() {
   console.log(new.target);
}

User(); // undefined
new User(); // [Function: User]

function User(name) {
   if (!new.target) {
      // if you run me without "new"
      return new User(name); // ... I will add "new" for you
   }
   this.name = name;
}

let John = User('John'); // redirects call to new User
console.log(John.name); // John

//------------------------------------------------------------------------------------------

// Return from constructors
/*  If in a constructor function is a return statement, then the rule is simple:
      - If return is called with object, then it is returned instead of this
      - If return is called with a primitive, it’s ignored
*/
function BigUser() {
   this.name = 'User';
   return { name: 'Godzilla' }; // return an object
}

console.log(new BigUser().name); // Godzilla

function SmallUser() {
   this.name = 'User';
   return;
}

console.log(new SmallUser().name); // User

//------------------------------------------------------------------------------------------

// Methods in constructor
function User(name) {
   this.name = name;
   this.sayHi = function () {
      console.log('My name is:' + this.name);
   };
}

let john = new User(' John');

john.sayHi(); // My name is: John

//-----------------------------------------------------------------------------------------------------------------------------------------

// Global Object
// In a browser it is named “window”, for Node.JS it is “global”, for other environments it may have another name.

// It does two things:
//    1. Provides access to built-in functions and values, defined by the specification and the environment.
// For instance, we can call alert directly or as a method of window:
alert("Hello");

// the same as
window.alert("Hello");

//    2. Provides access to global Function Declarations and var variables. We can read and write them using its properties:
var phrase = "Hello";

function sayHi() {
   alert(phrase);
}

// can read from window
alert(window.phrase); // Hello (global var)
alert(window.sayHi); // function (global function declaration)

// can write to window (creates a new global variable)
window.test = 5;

alert(test); // 5

// …But the global object does not have variables declared with let /const!

let user = "John";
alert(user); // John

alert(window.user); // undefined, don't have let
alert("user" in window); // false

//------------------------------------------------------------------------------------------

// Uses of 'window'
// Usually, it’s not a good idea to use window, but here are some examples we can meet.

// 1. To access exaclty the global variable if the function has local one with the same name
var user = 'global';

function sayHi() {
   var user = 'local';

   alert(window.user);
}

sayHi();

// 2. To check if a certain global variable or a builtin exist
if (window.XMLHttpRequest) {
   alert('XMLHttpRequest exists!')
}

// 3. To take the variable from the right window (because a browser may open multiple windows and tabs)
<iframe src='/' id='frame'></iframe>

alert(innerWidth); // get innerWidth property of the current window (browser only)
alert(Array); // get Array of the current window (javascript core builtin)

// when the iframe loads...
iframe.onload = function () {
   // get width of the iframe window
   alert(iframe.contentWindow.innerWidth);
   // get the builtin Array from the iframe window
   alert(iframe.contentWindow.Array);
};

//------------------------------------------------------------------------------------------

// 'this' and global object
// 1. In the browser, the value of this in the global area is window
// outside of functions
alert(this === window);

// 2. When a function with this is called in non-strict mode, it gets the global object as this
// not in strict mode !!!
function f() {
   alert(this);
}

f(); // [object Window]

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Hello, object
let user = {};
user.name = 'John';
user.surname = 'Smith';
user.name = 'Pete';
delete user.name;

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Check for emptiness
function isEmpty(obj) {
   for (let key in obj) {
      return false;
   }
   return true;
}

let schedule = {};

console.log(isEmpty(schedule)); // true

schedule['8:30'] = 'get up';

console.log(isEmpty(schedule)); // false

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Sum object properties
let salaries = {
   John: 100,
   Ann: 160,
   Pete: 130,
};

let sum = 0;

for (let key in salaries) {
   sum += salaries[key];
}

console.log(sum); // 390

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Multiply numeric properties by 2
function multiplyNumeric(obj) {
   for (let prop in obj) {
      if (typeof obj[prop] == 'number') {
         obj[prop] *= 2;
      }
   }
}

let menu = {
   width: 200,
   height: 300,
   title: 'My menu',
};
for (let key in menu) {
   console.log(menu[key]);
}
// 200, 300, "My menu"

multiplyNumeric(menu);

for (let key2 in menu) {
   console.log(menu[key2]);
}
// 400, 600, "My menu"

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Two functions - one object
// Is it possible to create functions A and B such as new A() = new B()?
// This is false
function A() { }
function B() { }

let a = new A();
let b = new B();

console.log(a == b); // false

// This is true
let Obj = {};

function A() {
   return Obj;
}
function B() {
   return Obj;
}

console.log(new A() == new B()); // true

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Create new calculator
function Calculator() {
   this.read = function (a, b) {
      this.a = a;
      this.b = b;
   };

   this.mul = function () {
      return this.a * this.b;
   };

   this.sum = function () {
      return this.a + this.b;
   };
}

let calculator = new Calculator();
calculator.read(3, 6);

console.log('Sum = ' + calculator.sum()); // Sum = 9
console.log('Mul = ' + calculator.mul()); // Mul = 18

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Create new accumulator
function Accumulator(startingValue) {
   this.value = startingValue;
   this.read = function (addValue) {
      this.value += addValue;
   };
}

let accumulator = new Accumulator(1);
accumulator.read(6);
accumulator.read(2);
console.log(accumulator.value); // 9
