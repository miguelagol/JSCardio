// [[Prototype]]
/* In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), that is either null or references another object.
   That object is called “a prototype"

   When we want to read a property from object, and it’s missing, JavaScript automatically takes it from the prototype.
   In programming, such thing is called “prototypal inheritance”. 
*/

// The property [[Prototype]] is internal and hidden, but there are many ways to set it.
let animal = {
   eats: true,
};

let rabbit = {
   jumps: true,
};

// "animal is the prototype of rabbit" or "rabbit prototypally inherits from animal".
rabbit.__proto__ = animal; // Please note that __proto__ is not the same as [[Prototype]]. That’s a getter/setter for it.

console.log(rabbit.jumps);

// If we look for a property in rabbit, and it’s missing, JavaScript automatically takes it from animal.
console.log(rabbit.eats);

// If animal has a lot of useful properties and methods, then they become automatically available in rabbit.
// Such properties are called “inherited”
let animal = {
   eats: true,
   walk() {
      console.log('Animal walk');
   },
};

let rabbit = {
   jumps: true,
   __proto__: animal,
};

rabbit.walk(); // Animal walk

// The prototype chain can be longer
let animal = {
   eats: true,
   walk() {
      console.log('Animal walk');
   },
};

let rabbit = {
   jumps: true,
   __proto__: animal,
};

let longEar = {
   earLength: 10,
   __proto__: rabbit,
};

longEar.walk(); // Animal walk (from the prototype chain)
console.log(longEar.jumps); // true (from rabbit)

/* There are actually only two limitations:
      - The references can’t go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
      - The value of __proto__ can be either an object or null. All other values (like primitives) are ignored.
*/

//--------------------REMEMBER-------------------
// There can be only one [[Prototype]]. An object may not inherit from two others.

//------------------------------------------------------------------------------------------

// Read/write rules
// The prototype is only used for reading properties.
// For data properties (not getters/setters) write/delete operations work directly with the object.
let animal = {
   eats: true,
   walk() {
      console.log('Walk animal');
   },
};

let rabbit = {
   __proto__: animal,
};

rabbit.walk = function() {
   console.log('Rabbit! Bounce-bounce!');
};

// rabbit.walk() call finds the method immediately in the object and executes it, without using the prototype
rabbit.walk(); // Rabbit! Bounce-bounce!

// For getters/setters – if we read/write a property, they are looked up in the prototype and invoked.
let user = {
   name: 'John',
   surname: 'Smith',

   set fullName(value) {
      [this.name, this.surname] = value.split(' ');
   },

   get fullName() {
      return `${this.name} ${this.surname}`;
   },
};

let admin = {
   __proto__: user,
   isAdmin: true,
};

console.log(admin.fullName); // John Smith

// setter triggers!
admin.fullName = 'Alice Cooper';

console.log(admin.fullName); // Alice Cooper

//------------------------------------------------------------------------------------------

// The value of 'this'

//--------------------REMEMBER-------------------
/* this is not affected by prototypes at all.
   No matter where the method is found: in an object or its prototype.
   In a method call, this is always the object before the dot.
*/
let animal = {
   walk() {
      if (!this.isSleeping) {
         console.log(`I walk`);
      }
   },
   sleep() {
      this.isSleeping = true;
   },
};

let rabbit = {
   name: 'White Rabbit',
   __proto__: animal,
};

rabbit.sleep();

console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined

//------------------------------------------------------------------------------------------------------------------------------------------

// the 'prototype' property
// In the old times, there was only one way to set a prototype: to use a "prototype" property of the constructor function.
// When a new object is created with new F(), the object’s [[Prototype]] is set to F.prototype.
// In other words, if F has a prototype property with a value of the object type,
// then new operator uses it to set [[Prototype]] for the new object.
let animal = {
   eats: true,
};

function Rabbit(name) {
   this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit('White rabbit');
// the same as
// rabbit.__proto__ = animal;

console.log(rabbit.eats); // true

//------------------------------------------------------------------------------------------

// Default F.prototype, constructor property
// Every function has the 'prototype' property even if we don't supply it

// The default "prototype" is an object with the only property constructor that points back to the function itself.
function Rabbit() {}
/* default prototype
Rabbit.prototype = { constructor: Rabbit };
*/

console.log(Rabbit.prototype.constructor == Rabbit); // true

// if we do nothing, the constructor property is available to all rabbits through [[Prototype]]
let rabbit = new Rabbit(); // inherits from {constructor: Rabbit}

console.log(rabbit.constructor == Rabbit); // true (from prototype)

// We can use constructor property to create a new object using the same constructor as the existing one.
function Rabbit(name) {
   this.name = name;
   console.log(name);
}

let rabbit = new Rabbit('White rabbit');

let rabbit2 = new rabbit.constructor('Black rabbit');

//--------------------REMEMBER-------------------
// JavaScript itself does not ensure the right "constructor" value.

//  if we replace the default prototype as a whole, then there will be no "constructor" in it.
function Rabbit() {}
Rabbit.prototype = {
   jumps: true,
};

let rabbit = new Rabbit();
console.log(rabbit.constructor === Rabbit); // false

// to keep the right "constructor" we can choose to add/remove properties to the default "prototype" instead of overwriting it as a whole
function Rabbit() {}

Rabbit.prototype.jumps = true;

let rabbit = new Rabbit();

console.log(rabbit.constructor === Rabbit); // true

// or recreate the constructor property manually
Rabbit.prototype = {
   jumps: true,
   constructor: Rabbit,
};

//------------------------------------------------------------------------------------------------------------------------------------------

// Object.prototype

let obj = {};
// the same as
// let obj = new Object(); // Object – is a built-in object constructor function

// When new Object() is called (or a literal object {...} is created),
// the [[Prototype]] of it is set to Object.prototype
console.log(obj); // {}

// the constructor function vfunction has Object.prototype that references a huge object with toString and other functions
console.log(String(obj)); // [object Object]

console.log(obj.__proto__ === Object.prototype); // true

// Other built-in prototypes
let array = [1, 2, 3];
// when we create an array [1, 2, 3], the default new Array() constructor is used internally.
// So the array data is written into the new object, and Array.prototype becomes its prototype and provides methods.

console.log(array.__proto__ === Array.prototype); // true

// all built-in prototypes have Object.prototype on the top
console.log(array.__proto__.__proto__ === Object.prototype); // true

// Some methods in prototypes may overlap
// Array.prototype has its own toString that lists comma-delimited elements
let array = [1, 2, 3];

console.log(String(array)); // 1,2,3
// Object.prototype has toString as well, but Array.prototype is closer in the chain, so the array variant is used.

// In-browser tools like Chrome developer console also show inheritance (may need to use console.dir for built-in objects
console.dir([1, 2, 3]);
/* Array[3]
      0: 1
      1: 2
      2: 3
      length: 3
      __proto__: Array.prototype
      ...
*/

//------------------------------------------------------------------------------------------

// Primitives are not objects
/* But if we try to access their properties, then temporary wrapper objects are created
   using built-in constructors String, Number, Boolean, they provide the methods and disappear.

   These objects are created invisibly to us and most engines optimize them out, but the specification describes it exactly this way.
   Methods of these objects also reside in prototypes, available as String.prototype, Number.prototype and Boolean.prototype.
*/

//--------------------REMEMBER-------------------
// Values null and undefined have no object wrappers
/* Special values null and undefined stand apart. They have no object wrappers, so methods and properties are not available for them.
   And there are no corresponding prototypes too.
*/

//------------------------------------------------------------------------------------------

// Changing native prototypes
String.prototype.show = function() {
   console.log(this);
};

'BOOM'.show(); // [String: 'BOOM']

// changing native prototypes is generally a bad idea.
// Prototypes are global, so it’s easy to get a conflict. If two libraries add a method String.prototype.show,
// then one of them overwrites the other one.

/* In modern programming, there is only one case when modifying native prototypes is approved. That’s polyfills.
   In other words, if there’s a method in JavaScript specification that is not yet supported by our JavaScript engine
   (or any of those that we want to support), then may implement it manually and populate the built-in prototype with it
*/
if (!String.prototype.repeat) {
   String.prototype.repeat = function(n) {
      return new Array(n + 1).join(this);
   };
}

console.log('La'.repeat(3)); // LaLaLa

//------------------------------------------------------------------------------------------

// Borrowing from prototypes
function showArgs() {
   console.log([].join.call(arguments, ' - '));
}

showArgs('Jack', 'Pete', 'Ann'); // Jack - Pete - Ann

// Because join resides in Array.prototype, we can call it from there directly
function showArgs2() {
   console.log(Array.prototype.join.call(arguments, ' - '));
}

showArgs2('Jack', 'Pete', 'Ann'); // Jack - Pete - Ann

//------------------------------------------------------------------------------------------------------------------------------------------

// Methods for prototypes
/* There are also other ways to get/set a prototype:
      - Object.create(proto[, descriptors])  – creates an empty object with given proto as [[Prototype]] and optional property descriptors.
      - Object.getPrototypeOf(obj)     – returns the [[Prototype]] of obj.
      - Object.setPrototypeOf(obj, proto)    – sets the [[Prototype]] of obj to proto.
*/
let animal = {
   eats: true,
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal);

console.log(rabbit.eats); // true
console.log(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {});
console.log(rabbit.eats); // undefined

// Object.create has an optional second argument: property descriptors.
let animal = {
   eats: true,
};

let rabbit = Object.create(animal, {
   jumps: {
      value: true,
   },
});

console.log(rabbit.jumps); // true

// we can use Object.create to perform an object cloning
let clone = Object.create(
   Object.getPrototypeOf(obj),
   Object.getOwnPropertyDescriptors(obj),
);
// This call makes a truly exact copy of obj, including all properties: enumerable and non-enumerable,
// data properties and setters/getters – everything, and with the right [[Prototype]].

/* If we count all the ways to manage [[Prototype]], there’s a lot! Many ways to do the same!
   That’s for historical reasons.
      - The "prototype" property of a constructor function works since very ancient times.
      - Later in the year 2012: Object.create appeared in the standard. It allowed to create objects with the given prototype,
        but did not allow to get/set it. So browsers implemented non-standard __proto__ accessor that allowed to
        get/set a prototype at any time.
      - Later in the year 2015: Object.setPrototypeOf and Object.getPrototypeOf were added to the standard.
        The __proto__ was de-facto implemented everywhere, so it made its way to the Annex B of the standard,
        that is optional for non-browser environments.
*/

// if we try to store user-provided keys in it (for instance, a user-entered dictionary), we can see an interesting glitch:
// all keys work fine except "__proto__"
let obj = {};
let key = prompt("What's the key", '__proto__');

obj[key] = 'some value';

// Here if the user types in __proto__, the assignment is ignored!
alert(obj[key]); // [object Object]

// to evade a problem Object.create(null) creates an empty object without a prototype
let obj = Object.create(null);

let key = prompt("What's the key?", '__proto__');
obj[key] = 'some value';

alert(obj[key]); // "some value"
// A downside is that such objects lack any built-in object methods

//------------------------------------------------------------------------------------------

// Getting all properties
/* Thera are many ways to get keys/values from an object:
      -  Object.keys(obj) / Object.values(obj) / Object.entries(obj)
         returns an array of enumerable own string property names/values/key-value pairs.
         These methods only list enumerable properties, and those that have strings as keys.
      -  Object.getOwnPropertySymbols(obj)   – returns an array of all own symbolic property names.
      -  Object.getOwnPropertyNames(obj) – returns an array of all own string property names (non-enumerable properties)
      -  Reflect.ownKeys(obj) – returns an array of all own property names.
*/
// Properties from the prototype are not listed
// But the for..in loop loops over inherited properties too.
let animal = {
   eats: true,
};

let rabbit = {
   jumps: true,
   __proto__: animal,
};

// only own keys
console.log(Object.keys(rabbit)); // [ 'jumps' ]

// inherited keys too
for (let key in rabbit) console.log(key); // jumps, eats

// obj.hasOwnProperty(key)
// it returns true if obj has its own (not inherited) property named key
// If we want to distinguish inherited properties
let animal = {
   eats: true,
};

let rabbit = {
   jumps: true,
   __proto__: animal,
};

for (let key in rabbit) {
   let isOwn = rabbit.hasOwnProperty(key);
   console.log(key + ': ' + isOwn);
} // jumps: true, eats: false

// …But why hasOwnProperty does not appear in for..in loop, if it lists all inherited properties?
// The answer is simple: it’s not enumerable. Just like all other properties of Object.prototype. That’s why they are not listed.

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Working with prototype
// Which values are shown in the process?
let animal = {
   jumps: null,
};

let rabbit = {
   __proto__: animal,
   jumps: true,
};

console.log(rabbit.jumps); // true

delete rabbit.jumps;

console.log(rabbit.jumps); // null

delete animal.jumps;

console.log(rabbit.jumps); // undefined

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Searching algorithm
let head = {
   glasses: 1,
};

let table = {
   pen: 3,
   __proto__: head,
};

let bed = {
   sheet: 1,
   pillow: 2,
   __proto__: table,
};

let pockets = {
   money: 2000,
   __proto__: bed,
};

console.log(pockets.pen); // 3
console.log(bed.glasses); // 1
console.log(table.money); // undefined

// is it faster to get glasses as pockets.glasses or head.glasses? Benchmark if needed.
/* In modern engines, performance-wise, there’s no difference whether we take a property from an object or its prototype.
   They remember where the property was found and reuse it in the next request.
   For instance, for pockets.glasses they remember where they found glasses (in head), and next time will search right there.
   They are also smart enough to update internal caches if something changes, so that optimization is safe.
*/

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Where it writes?
let animal = {
   eat() {
      this.full = true;
   },
};

let rabbit = {
   __proto__: animal,
};

rabbit.eat();

console.log(animal.full); // undefined
console.log(rabbit.full); // true

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Why two hamsters are full? How to fix it?
let hamster = {
   stomach: [],
   eat(food) {
      this.stomach.push(food);
   },
};

let speedy = {
   __proto__: hamster,
};

let lazy = {
   __proto__: hamster,
};

speedy.eat('apple');
console.log(speedy.stomach); // ['apple']

console.log(lazy.stomach); // ['apple']

// Solution 1
let hamster = {
   eat(food) {
      this.stomach.push(food);
   },
};

let speedy = {
   stomach: [],
   __proto__: hamster,
};

let lazy = {
   stomach: [],
   __proto__: hamster,
};

speedy.eat('apple');
console.log(speedy.stomach); // ['apple']

console.log(lazy.stomach); // []

// Solution 2
let hamster = {
   stomach: [],
   eat(food) {
      this.stomach = [food];
   },
};

let speedy = {
   stomach: [],
   __proto__: hamster,
};

let lazy = {
   stomach: [],
   __proto__: hamster,
};

speedy.eat('apple');
console.log(speedy.stomach); // ['apple']

console.log(lazy.stomach); // []

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Changing 'prototype'
function Rabbit() {}
Rabbit.prototype = {
   eats: true,
};

let rabbit = new Rabbit();

console.log(rabbit.eats); // true

// 1. We added one more string (emphasized), what shows now?
function Rabbit() {}
Rabbit.prototype = {
   eats: true,
};

let rabbit = new Rabbit();

Rabbit.prototype = {}; // The assignment to Rabbit.prototype sets up [[Prototype]] for new objects, but it does not affect the existing ones.

console.log(rabbit.eats); // true

// 2. …And if the code is like this (replaced one line)?
function Rabbit() {}
Rabbit.prototype = {
   eats: true,
};

let rabbit = new Rabbit();

Rabbit.prototype.eats = false;
// Objects are assigned by reference.
// The object from Rabbit.prototype is not duplicated,
// it’s still a single object is referenced both by Rabbit.prototype and by the [[Prototype]] of rabbit.
// So when we change its content through one reference, it is visible through the other one.

console.log(rabbit.eats); // false

// 3. Like this (replaced one line)?
function Rabbit() {}
Rabbit.prototype = {
   eats: true,
};

let rabbit = new Rabbit();

delete rabbit.eats; // All delete operations are applied directly to the object.
// Here delete rabbit.eats tries to remove eats property from rabbit, but it doesn’t have it.
// So the operation won’t have any effect.

console.log(rabbit.eats); // true

// 4. The last variant:
function Rabbit() {}
Rabbit.prototype = {
   eats: true,
};

let rabbit = new Rabbit();

delete Rabbit.prototype.eats; // The property eats is deleted from the prototype, it doesn’t exist any more.

console.log(rabbit.eats); // undefined

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Create an object with the same constructor
// We have an arbitrary object obj, created by a constructor function – we don’t know which one, but we’d like to create a new object using it.
// Can we do it like that?
let obj2 = new obj.constructor();

// an example of a constructor function for obj which lets such code work right
function Animal() {
   console.log('animal');
}

let obj = new Animal(); // animal

let obj2 = new obj.constructor(); // animal

// an example that makes it work wrong
function Animal() {
   console.log('animal2');
}

Animal.prototype = {
   jump: true,
};

let obj = new Animal(); // animal2

let obj2 = new obj.constructor();

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Add method 'f.defer(ms)' to functions
Function.prototype.defer = function(ms) {
   setTimeout(this, ms);
};

function f() {
   console.log('Hello');
}

f.defer(3000);

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 8 - Add decorating 'defer()' to functions
Function.prototype.defer = function(ms) {
   let f = this;
   return function(...args) {
      setTimeout(() => f.apply(this, args), ms);
   };
};

function f(a, b) {
   console.log(a + b);
}

f.defer(1000)(1, 2);

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 9 - Add toString to the dictionary
let dictionary = Object.create(null);

Object.defineProperties(dictionary, {
   toString: {
      value() {
         return Object.keys(this).join(', ');
      },
      // enumerable: false // by default
   },
});

dictionary.apple = 'Apple';
dictionary.__proto__ = 'test';

for (let key in dictionary) {
   console.log(key); // apple,    __proto__
}

console.log(dictionary); // apple, __proto__

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 10 - The difference between calls
function Rabbit(name) {
   this.name = name;
}

Rabbit.prototype.sayHi = function() {
   console.log(this.name);
};

let rabbit = new Rabbit('White Rabbit');

// These calls do the same thing or not?
rabbit.sayHi(); // White Rabbit
Rabbit.prototype.sayHi(); // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi(); // undefined

// The first call has this == rabbit, the other ones have this equal to Rabbit.prototype, because it’s actually the object before the dot.
