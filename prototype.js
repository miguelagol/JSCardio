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
