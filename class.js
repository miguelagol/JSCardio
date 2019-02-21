// Class patterns
/* In object-oriented programming, a class is an extensible program-code-template for creating objects, providing initial values for state
   (member variables) and implementations of behavior (member functions or methods).
*/

// Functional class pattern
// The constructor function below can be considered a “class” according to the definition
function User(name) {
   this.sayHi = function() {
      console.log(name);
   };
}

let user = new User('Jack');

user.sayHi(); // Jack
/* It follows all parts of the definition:
      - It is a “program-code-template” for creating objects (callable with new).
      - It provides initial values for the state (name from parameters).
      - It provides methods (sayHi).
*/

/* In the functional class pattern, local variables and nested functions inside User,
   that are not assigned to this, are visible from inside, but not accessible by the outer code.
*/
// So we can easily add internal functions and variables
function User(name, birthday) {
   // only visible from other methods inside User
   function calcAge() {
      return new Date().getFullYear() - birthday.getFullYear();
   }

   this.sayHi = function() {
      console.log(`${name}, age: ${calcAge()}`);
   };
}

let user = new User('Jack', new Date(2000, 0, 1));

user.sayHi(); // Jack, age: 19

// In this code variables name, birthday and the function calcAge() are internal, private to the object.
// They are only visible from inside of it. On the other hand, sayHi is the external, public method.
// The external code that creates user can access it (Only what’s assigned to this becomes visible outside).

//------------------------------------------------------------------------------------------

// Factory class pattern
function User(name, birthday) {
   function calcAge() {
      return new Date().getFullYear() - birthday.getFullYear();
   }

   return {
      sayHi() {
         console.log(`${name}, age: ${calcAge()}`);
      },
   };
}

let user = User('Jack', new Date(2000, 0, 1));

user.sayHi(); // Jack, age: 19

// As we can see, the function User returns an object with public properties and methods.
// The only benefit of this method is that we can omit new

//------------------------------------------------------------------------------------------

// Prototype-based classes
function User(name, birthday) {
   this._name = name;
   this._birthday = birthday;
}
// there is a widely known agreement that internal properties and methods are prepended with an underscore "_"

// methods are lexically not inside function User, they do not share a common lexical environment.
// If we declare variables inside function User, then they won’t be visible to methods.
User.prototype._calcAge = function() {
   return new Date().getFullYear() - this._birthday.getFullYear();
};

User.prototype.sayHi = function() {
   console.log(`${this._name}, age: ${this._calcAge()}`);
};

let user = new User('Jack', new Date(2000, 0, 1));

user.sayHi(); // Jack, age: 19

/* The code structure:
   - The constructor User only initializes the current object state.
   - Methods are added to User.prototype.
*/

/* The advantages over the functional pattern:
      -  In the functional pattern, each object has its own copy of every method.
         We assign a separate copy of this.sayHi = function() {...} and other methods in the constructor.
      -  In the prototypal pattern, all methods are in User.prototype that is shared between all user objects.
         An object itself only stores the data.

   the prototypal pattern is more memory-efficient.
*/

//------------------------------------------------------------------------------------------

// Prototype-based inheritance for classes
function Rabbit(name) {
   this.name = name;
}

Rabbit.prototype.jump = function() {
   console.log(`${this.name} jumps!`);
};

let rabbit = new Rabbit('My rabbit');

function Animal(name) {
   this.name = name;
}

Animal.prototype.eat = function() {
   console.log(`${this.name} eats.`);
};

let animal = new Animal('My animal');

// ^^^ They are fully independent

// To set the prototype chain: rabbit → Rabbit.prototype → Animal.prototype.
function Animal(name) {
   this.name = name;
}

Animal.prototype.eat = function() {
   console.log(`${this.name} eats.`);
};

function Rabbit(name) {
   this.name = name;
}

Rabbit.prototype.jump = function() {
   console.log(`${this.name} jumps!`);
};

// setup the inheritance chain
Rabbit.prototype.__proto__ = Animal.prototype;

let rabbit = new Rabbit('White Rabbit');
rabbit.eat(); // White Rabbit eats.
rabbit.jump(); // White Rabbit jumps!

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - An error in the inheritance, find it
function Animal(name) {
   this.name = name;
}

Animal.prototype.walk = function() {
   console.log(this.name + ' walks');
};

function Rabbit(name) {
   this.name = name;
}

Rabbit.prototype = Animal.prototype; // Here it is!

Rabbit.prototype.walk = function() {
   console.log(this.name + ' bounces!');
};

// Rabbit.prototype and Animal.prototype become the same object. So methods of both classes become mixed in that object.
// Rabbit.prototype.walk overwrites Animal.prototype.walk, so all animals start to bounce

let animal = new Animal('Bear');
animal.walk(); // Bear bounces!

// correct line
Rabbit.prototype.__proto__ = Animal.prototype;

// or
Rabbit.prototype = Object.create(Animal.prototype);

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Rewrite to prototypes
function Clock({ template }) {
   this._template = template;
}

Clock.prototype._render = function render() {
   let date = new Date();

   let hours = date.getHours();
   if (hours < 10) hours = '0' + hours;

   let mins = date.getMinutes();
   if (mins < 10) mins = '0' + mins;

   let secs = date.getSeconds();
   if (secs < 10) secs = '0' + secs;

   let output = this._template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

   console.log(output);
};

Clock.prototype.stop = function() {
   clearInterval(this._timer);
};

Clock.prototype.start = function() {
   this._render();
   this._timer = setInterval(() => this._render(), 1000);
};

let clock = new Clock({ template: 'h:m:s' });
clock.start();

setTimeout(() => clock.stop(), 5000);
