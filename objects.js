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
   this.sayHi = function() {
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
alert('Hello');

// the same as
window.alert('Hello');

//    2. Provides access to global Function Declarations and var variables. We can read and write them using its properties:
var phrase = 'Hello';

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

let user = 'John';
alert(user); // John

alert(window.user); // undefined, don't have let
alert('user' in window); // false

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
   alert('XMLHttpRequest exists!');
}

// 3. To take the variable from the right window (because a browser may open multiple windows and tabs)
<iframe src="/" id="frame" />;

alert(innerWidth); // get innerWidth property of the current window (browser only)
alert(Array); // get Array of the current window (javascript core builtin)

// when the iframe loads...
iframe.onload = function() {
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

// Property flags
/* Object properties, besides a value, have three special attributes (so-called “flags”):
      - writable – if true, can be changed, otherwise it’s read-only.
      - enumerable – if true, then listed in loops, otherwise not listed.
      - configurable – if true, the property can be deleted and these attributes can be modified, otherwise not.
*/

// Object.getOwnPropertyDescriptor
// allows to query the full information about a property
/* let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
   obj - the object to get information from
   propertyName - the name of the property
The returned value is a so-called “property descriptor” object: it contains the value and all the flags.
*/
let user = {
   name: 'Jack',
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(JSON.stringify(descriptor, null, 2));
/*
{
  "value": "Jack",
  "writable": true,
  "enumerable": true,
  "configurable": true
} */

// Object.getOwnPropertyDescriptors
// with Object.defineProperties it can be used as a “flags-aware” way of cloning an object:
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

// we can do that
for (let key in user) {
   clone[key] = user[key];
}
// but
//  that does not copy flags
//  that for..in ignores symbolic properties

//------------------------------------------------------------------------------------------

// Object.defineProperty
/* let defineProp = Object.defineProperty(obj, propertyName, descriptor);
   obj, propertyName - the object and property to work on
   descriptor - property descriptor to apply
If the property exists, defineProperty updates its flags.
Otherwise, it creates the property with the given value and flags; in that case, if a flag is not supplied, it is assumed false.
*/
let user = {};

Object.defineProperty(user, 'name', { value: 'Jack' });

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(JSON.stringify(descriptor, null, 2));
/* 
{
  "value": "Jack",
  "writable": false,
  "enumerable": false,
  "configurable": false
} */

// Object.defineProperties
/* Object.defineProperties(obj, {
      prop1: descriptor1,
      prop2: descriptor2
      // ...
   });
*/
Object.defineProperties(user, {
   name: { value: 'John', writable: false },
   surname: { value: 'Smith', writable: false },
   // ...
});

//------------------------------------------------------------------------------------------

// Read-only
let user = {
   name: 'Ann',
};

Object.defineProperty(user, 'name', {
   writable: false,
});

console.log(user.name); // Ann

user.name = 'Pete'; // there is no error but the operation still won’t succeed

console.log(user.name); // Ann

//--------------------REMEMBER--------------------
// Errors appear only in use strict
('use strict');
let user = {
   name: 'Ann',
};

Object.defineProperty(user, 'name', {
   writable: false,
});

console.log(user.name); // Ann

user.name = 'Pete'; // Error: Cannot assign to read only property 'name' of object '#<Object>'

// the same operation, but for the case when a property doesn’t exist
let user = {};

Object.defineProperty(user, 'name', {
   value: 'Jack',
   enumerable: true,
   configurable: true,
});

console.log(user.name); // Jack

user.name = 'Pete';

console.log(user.name); // Jack

//------------------------------------------------------------------------------------------

// Non-enumerable
// Normally, a built-in toString for objects is non-enumerable, it does not show up in for..in.
// But if we add toString of our own, then by default it shows up in for..in
let user = {
   name: 'Pete',
   toString() {
      return this.name;
   },
};

for (let key in user) {
   console.log(key); // name, toString
}

// If we don’t like it, then we can set enumerable:false
Object.defineProperty(user, 'toString', {
   enumerable: false,
});

for (let key in user) {
   console.log(key); // name
}

// Non-enumerable properties are also excluded from Object.keys:
console.log(Object.keys(user)); // [ 'name' ]

//------------------------------------------------------------------------------------------

// Non-configurable
// A non-configurable property can not be deleted or altered with definePropert
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

console.log(JSON.stringify(descriptor, null, 2));
/* {
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
} */

let user = {};

Object.defineProperty(user, 'name', {
   value: 'Ann',
   writable: false,
   configurable: false,
});

// won't be able to change user.name or its flags
// all this won't work:
//   user.name = "Pete"
//   delete user.name
//   defineProperty(user, "name", ...)

//------------------------------------------------------------------------------------------

// Sealing an object globally
// Property descriptors work at the level of individual properties.
/* There are also methods that limit access to the whole object:
      -  Object.preventExtensions(obj)
         Forbids to add properties to the object.
      -  Object.seal(obj)
         Forbids to add/remove properties, sets for all existing properties configurable: false.
      -  Object.freeze(obj)
         Forbids to add/remove/change properties, sets for all existing properties configurable: false, writable: false.

   And also there are tests for them:
      -  Object.isExtensible(obj)
         Returns false if adding properties is forbidden, otherwise true.
      -  Object.isSealed(obj)
         Returns true if adding/removing properties is forbidden, and all existing properties have configurable: false.
      -  Object.isFrozen(obj)
         Returns true if adding/removing/changing properties is forbidden, and all current properties are configurable: false, writable: false.
*/

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Property getters/setters
/* There are two kinds of properties.
      - The first kind is data properties
      - The second type of properties is accessor properties. They are essentially functions that work on getting and setting a value,
        but look like regular properties to an external code.
*/
let obj = {
   get propName() {
      // getter, the code executed on getting obj.propName
   },
   set propName(value) {
      // setter, the code executed on setting obj.propName = value
   },
};

let user = {
   name: 'Jack',
   surname: 'Sparrow',

   get fullName() {
      // fullName has only a getter.
      return `${this.name} ${this.surname}`;
   },
};

//  an accessor property looks like a regular one. That’s the idea of accessor properties.
// We don’t call user.fullName as a function, we read it normally: the getter runs behind the scenes.
console.log(user.fullName); // Jack Sparrow

let user = {
   name: 'Jack',
   surname: 'Sparrow',

   get fullName() {
      // fullName has a getter
      return `${this.name} ${this.surname}`;
   },

   set fullName(value) {
      // and a setter
      [this.name, this.surname] = value.split(' ');
   },
};

user.fullName = 'Alice Cooper';

console.log(user.name); // Alice
console.log(user.surname); // Cooper

//--------------------REMEMBER--------------------
// Accessor properties are only accessible with get/set
// A property can either be a “data property” or an “accessor property”, but not both.
// Sometimes it’s normal that there’s only a setter or only a getter.
// But the property won’t be readable or writable in that case.

//------------------------------------------------------------------------------------------

// Accessor descriptors
/* Accessor descriptor may have:
      - get    – a function without arguments, that works when a property is read,
      - set    – a function with one argument, that is called when the property is set,
      - enumerable   – same as for data properties,
      - configurable – same as for data properties.
*/
let user = {
   name: 'Alice',
   surname: 'Cooper',
};

Object.defineProperty(user, 'fullName', {
   get() {
      return `${this.name} ${this.surname}`;
   },

   set(value) {
      [this.name, this.surname] = value.split(' ');
   },
});

console.log(user.fullName); // Alice Cooper

for (let key in user) {
   console.log(key); // name, surname
}

// If we try to supply both get and value in the same descriptor, there will be an error:
Object.defineProperty({}, 'prop', {
   get() {
      return 1;
   },

   value: 2,
}); // Error: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>

//------------------------------------------------------------------------------------------

// Getters/setters can be used as wrappers over “real” property values to gain more control over them.
let user = {
   get name() {
      return this._name;
   },

   set name(value) {
      if (value.length < 4) {
         console.log('Name is too short, need at least 4 characters');
         return;
      }
      this._name = value;
   },
};

user.name = 'Pete';

console.log(user.name); // Pete

user.name = 'Ala'; // Name is too short, need at least 4 characters

//------------------------------------------------------------------------------------------

// Using for compatibility
// getters and setters – they allow to take control over a “normal” data property and tweak it at any moment.

// we started implementing user objects using data properties name and age
function User(name, age) {
   this.name = name;
   this.age = age;
}

let john = new User('John', 25);

console.log(john.age); // 25

// …But sooner or later, things may change. Instead of age we may decide to store birthday
function User(name, birthday) {
   this.name = name;
   this.birthday = birthday;
}

let john = new User('John', new Date(1992, 6, 1));

// Now what to do with the old code that still uses age property?
// Adding a getter for age mitigates the problem
function User(name, birthday) {
   this.name = name;
   this.birthday = birthday;

   // age is calculated from the current date and birthday
   Object.defineProperty(this, 'age', {
      get() {
         let todayYear = new Date().getFullYear();
         return todayYear - this.birthday.getFullYear();
      },
   });
}

let john = new User('John', new Date(1992, 6, 1));

console.log(john.birthday); // 1992-06-30T22:00:00.000Z
console.log(john.age); // 27

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
function A() {}
function B() {}

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
   this.read = function(a, b) {
      this.a = a;
      this.b = b;
   };

   this.mul = function() {
      return this.a * this.b;
   };

   this.sum = function() {
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
   this.read = function(addValue) {
      this.value += addValue;
   };
}

let accumulator = new Accumulator(1);
accumulator.read(6);
accumulator.read(2);
console.log(accumulator.value); // 9
