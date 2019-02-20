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
// In other words, if F has a prototype property with a value of the object type, then new operator uses it to set [[Prototype]] for the new object.
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
