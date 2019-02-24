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

// The 'class' syntax
// The “class” construct allows to define prototype-based classes with a clean, nice-looking syntax.
/* class MyClass {
      constructor(...) {
         // ...
      }
      method1(...) {}
      method2(...) {}
      get something(...) {}
      set something(...) {}
      static staticMethod(..) {}
      // ...
   }
*/

// a prototype-based class User
function User(name) {
   this.name = name;
}

User.prototype.sayHi = function() {
   console.log(this.name);
};

let user = new User('Matthew');
user.sayHi(); // Matthew

// the same using class syntax
class User {
   constructor(name) {
      this.name = name;
   }
   //--------------------REMEMBER-------------------
   // there is no comma here!!!!

   sayHi() {
      console.log(this.name);
   }
}

let user = new User('Tyler');
user.sayHi(); // Tyler

/* The class User {...} does two things:
      - Declares a variable User that references the function named "constructor".
      - Puts methods listed in the definition into User.prototype. Here, it includes sayHi and the constructor.
*/

// proof: User is the "constructor" function
console.log(User === User.prototype.constructor); // true

// proof: there are two methods in its "prototype"
console.log(Object.getOwnPropertyNames(User.prototype)); // [ 'constructor', 'sayHi' ]

// Class is a special syntax to define a constructor together with its prototype methods.

//--------------------REMEMBER-------------------
/* -  Constructors require new
   -  Different string output
         If we output it like alert(User), some engines show 'class User', while others show 'function User'
         But that's still a function, there is no separate 'class' entity in JS language
   -  Class methods are non-enumerable
         A class definition sets enumrable flag false for all methods in the 'prototype'
   -  Classes have a default constructor() {}
         If there's no constructor in the class construct, than an empty function is generated,
         same as if we had written constructor() {}
   -  Classes always use strict
         All code inside the class is automatically in strict mode
*/

// Unlike a regular function, a class constructor can’t be called without new
class User {
   constructor() {}
}

console.log(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'

//------------------------------------------------------------------------------------------

// Getters/setters
class User {
   constructor(name) {
      // invokes the setter
      this.name = name;
   }

   get name() {
      return this._name;
   }

   set name(value) {
      if (value.length < 4) {
         console.log('Name is too short.');
         return;
      }
      this._name = value;
   }
}

let user = new User('John');
console.log(user.name); // John

user = new User(''); // Name too short.

// Internally, getters and setters are also created on the User prototype
Object.defineProperties(User.prototype, {
   name: {
      get() {
         return this._name;
      },
      set(name) {
         // ...
      },
   },
});

//------------------------------------------------------------------------------------------

// Only methods
// Unlike object literals, no property:value assignments are allowed inside class.
// There may be only methods and getters/setters.

// If we really need to put a non-function value into the prototype, then we can alter prototype manually
class User {}

User.prototype.test = 5;

console.log(new User().test); // 5

// An “in-class” alternative is to use a getter
class User {
   get test() {
      return 15;
   }
}

console.log(new User().test); // 15
// the getter variant is a bit slower

//------------------------------------------------------------------------------------------

// Class Expresssion
// a class-returning function (“class factory”)
function makeClass(phrase) {
   // declare a class and return it
   return class {
      sayHi() {
         console.log(phrase);
      }
   };
}

let User = makeClass('Hello');

new User().sayHi(); // Hello

// like Named Function Expressions, such classes also may have a name, that is visible inside that class only
let User = class MyClass {
   sayHi() {
      console.log(MyClass);
   }
};

new User().sayHi(); // [Function: MyClass]

console.log(MyClass); // Error: MyClass is not defined

//------------------------------------------------------------------------------------------

// Static methods
// We can also assign methods to the class function, not to its "prototype". Such methods are called static.
class User {
   static staticMethod() {
      console.log(this === User);
   }
}

User.staticMethod(); // true

// That actually does the same as assigning it as a function property
function User() {}

User.staticMethod = function() {
   console.log(this === User);
};

// The value of this inside User.staticMethod() is the class constructor User itself
User.staticMethod(); // true

// static methods are used to implement functions that belong to the class, but not to any particular object of it.
class Article {
   constructor(title, date) {
      this.title = title;
      this.date = date;
   }

   // It’s not a method of an article, but rather of the whole class.
   static compare(articleA, articleB) {
      return articleA.date - articleB.date;
   }
}

let articles = [
   new Article('Mind', new Date(2016, 1, 1)),
   new Article('Body', new Date(2015, 0, 1)),
   new Article('Javascript', new Date(2016, 11, 1)),
];

articles.sort(Article.compare);

console.log(articles[0].title); // Body

class Article {
   constructor(title, date) {
      this.title = title;
      this.date = date;
   }

   static createTodays() {
      // because of this === Article
      return new this("Today's digest", new Date());
   }
}

let article = Article.createTodays();

console.log(article.title); // Today's digest

// Static methods are also used in database-related classes to search/save/remove entries from the database
//------------------------------------------------------------------------------------------------------------------------------------------

// Class inheritance
// To inherit from another class, we should specify "extends" and the parent class before the brackets {..}.
class Animal {
   constructor(name) {
      this.speed = 0;
      this.name = name;
   }

   run(speed) {
      this.speed += speed;
      console.log(`${this.name} runs with speed ${this.speed}.`);
   }

   stop() {
      this.speed = 0;
      console.log(`${this.name} stopped.`);
   }
}

// Inherit from Animal
class Rabbit extends Animal {
   // The extends keyword actually adds a [[Prototype]] reference from Rabbit.prototype to Animal.prototype
   hide() {
      console.log(`${this.name} hides!`);
   }
}

let rabbit = new Rabbit('White rabbit');

rabbit.run(5); // White rabbit runs with speed 5.
rabbit.hide(); // White rabbit hides!

// Any expression is allowed after extends
// Class syntax allows to specify not just a class, but any expression after extends.
function f(phrase) {
   return class {
      sayHi() {
         console.log(phrase);
      }
   };
}

class User extends f('Hello') {}

new User().sayHi(); // Hello

//------------------------------------------------------------------------------------------

// Overriding a method
// If we specify our own method (the same name as a parent method), then it will be used instead
// But usually we don’t want to totally replace a parent method, but rather to build on top of it, tweak or extend its functionality.
// We do something in our method, but call the parent method before/after it or in the process.

/* Classes provide "super" keyword for that.
      - super.method(...) to call a parent method.
      - super(...) to call a parent constructor (inside our constructor only).
*/
class Animal {
   constructor(name) {
      this.speed = 0;
      this.name = name;
   }

   run(speed) {
      this.speed += speed;
      console.log(`${this.name} runs with speed ${this.speed}.`);
   }

   stop() {
      this.speed = 0;
      console.log(`${this.name} stopped.`);
   }
}

class Rabbit extends Animal {
   hide() {
      console.log(`${this.name} hides!`);
   }

   stop() {
      super.stop(); // call parent stop
      this.hide(); // and then hide
   }
}

let rabbit = new Rabbit('Black rabbit');

rabbit.run(8); // Black rabbit runs with speed 8.
rabbit.stop(); // Black rabbit stopped. Black rabbit hides!

//--------------------REMEMBER-------------------
// Arrow functions have no super
class Rabbit extends Animal {
   stop() {
      // The super in the arrow function is the same as in stop(), so it works as intended
      setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
   }
}

//------------------------------------------------------------------------------------------

// Overriding constructor
// If a class extends another class and has no constructor, then the following constructor is generated
class Rabbit extends Animal {
   // generated for extending classes without own constructors
   constructor(...args) {
      super(...args);
   }
}

// But if we add a custom constructor to Rabbit
class Animal {
   constructor(name) {
      this.speed = 0;
      this.name = name;
   }
   // ...
}

class Rabbit extends Animal {
   constructor(name, earLength) {
      this.speed = 0;
      this.name = name;
      this.earLength = earLength;
   }
   // ...
}

// Doesn't work!
let rabbit = new Rabbit('White Rabbit', 10); // Error: this is not defined.
// (Error: Must call super constructor in derived class before accessing 'this' or returning from derived constructor)

// That's because
//--------------------REMEMBER-------------------
// constructors in inheriting classes must call super(...), and (!) do it before using this.

/* In an inheriting class, the corresponding constructor function is labelled with a special internal property
      [[ConstructorKind]]:"derived".

   The difference is:
      - When a normal constructor runs, it creates an empty object as this and continues with it.
      - But when a derived constructor runs, it doesn’t do it. It expects the parent constructor to do this job.
*/
class Animal {
   constructor(name) {
      this.speed = 0;
      this.name = name;
   }
   // ...
}

class Rabbit extends Animal {
   constructor(name, earLength) {
      super(name);
      this.earLength = earLength;
   }
   // ...
}

// now fine
let rabbit = new Rabbit('White Rabbit', 10);

console.log(rabbit.name); // White Rabbit
console.log(rabbit.earLength); // 10

//------------------------------------------------------------------------------------------

// Super: internals, [[HomeObject]]
let animal = {
   name: 'Animal',
   eat() {
      console.log(`${this.name} eats.`);
   },
};

let rabbit = {
   __proto__: animal,
   name: 'Rabbit',
   eat() {
      // that's how super.eat() could presumably work
      this.__proto__.eat.call(this); // (*)
   },
};

// It works
rabbit.eat(); // Rabbit eats.

// But if we ass one more object to the chain
let animal = {
   name: 'Animal',
   eat() {
      console.log(`${this.name} eats.`);
   },
};

let rabbit = {
   __proto__: animal,
   eat() {
      // ...bounce around rabbit-style and call parent (animal) method
      this.__proto__.eat.call(this); // longEar.__proto__.eat.call(this)
   },
};

let longEar = {
   __proto__: rabbit,
   eat() {
      // ...do something with long ears and call parent (rabbit) method
      this.__proto__.eat.call(this); // rabbit.eat.call(this)
   },
};

longEar.eat(); // Error: Maximum call stack size exceeded

// inside longEar.eat() we have this = longEar
this.__proto__.eat.call(this);
// becomes
longEar.__proto__.eat.call(this);
// that is
rabbit.eat.call(this);

// and
// inside rabbit.eat() we also have this = longEar (bacause of /call(this))
this.__proto__.eat.call(this); // (*)
// becomes
longEar.__proto__.eat.call(this);
// or (again)
rabbit.eat.call(this);

// [[HomeObject]]
// When a function is specified as a class or object method, its [[HomeObject]] property becomes that object.
// [[HomeObject]] is used only for calling parent methods in super, to resolve the prototype
let animal = {
   name: 'Animal',
   eat() {
      // [[HomeObject]] === animal
      console.log(`${this.name} eats.`);
   },
};

let rabbit = {
   __proto__: animal,
   name: 'Rabbit',
   eat() {
      // [[HomeObject]] === rabbit
      super.eat();
   },
};

let longEar = {
   __proto__: rabbit,
   name: 'Long Ear',
   eat() {
      // [[HomeObject]] === longEar
      super.eat();
   },
};

longEar.eat(); // Long Ear eats.

//--------------------REMEMBER-------------------
// for objects, methods must be specified exactly the given way: as method(), not as "method: function()".
let animal = {
   eat: function() {
      // should be the short syntax: eat() {...}
      // ...
   },
};

let rabbit = {
   __proto__: animal,
   eat: function() {
      super.eat();
   },
};

rabbit.eat(); // Error: 'super' keyword unexpected here

//------------------------------------------------------------------------------------------

// Static methods and inheritance
// The class syntax supports inheritance for static properties too.
class Animal {
   constructor(name, speed) {
      this.speed = speed;
      this.name = name;
   }
   run(speed = 0) {
      this.speed += speed;
      console.log(`${this.name} runs with speed ${this.speed}.`);
   }

   static compare(animalA, animalB) {
      return animalA.speed - animalB.speed;
   }
}

class Rabbit extends Animal {
   hide() {
      console.log(`${this.name} hides!`);
   }
}

let rabbits = [new Rabbit('White Rabbit', 10), new Rabbit('Black Rabbit', 5)];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5.

// This way Rabbit has access to all static methods of Animal.
class Animal {}
class Rabbit extends Animal {}

// for static properties and methods
console.log(Rabbit.__proto__ === Animal); // true

// and the next step is Function.prototype
console.log(Animal.__proto__ === Function.prototype); // true

// that's in addition to the "normal" prototype chain for object methods
console.log(Rabbit.prototype.__proto__ === Animal.prototype); // true

//--------------------REMEMBER-------------------
// No static inheritance in built-ins
// Please note that built-in classes don’t have such static [[Prototype]] reference. For instance, Object has Object.defineProperty,
// Object.keys and so on, but Array, Date etc do not inherit them.

// Symbol.species
// Symbol.species specifies a function-valued property that the constructor function uses to create derived objects.
class PowerArray extends Array {
   isEmpty() {
      return this.length === 0;
   }

   // built-in methods will use this as the constructor
   static get [Symbol.species]() {
      return Array;
   }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter(item => item >= 10);

console.log(filteredArr instanceof PowerArray); // false
console.log(filteredArr instanceof Array); // true

// filteredArr is not PowerArray, but Array
console.log(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function

//------------------------------------------------------------------------------------------

// Natives are extendable
// Built-in classes like Array, Map and others are extendable also.
class PowerArray extends Array {
   isEmpty() {
      return this.length === 0;
   }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

// when arr.filter() is called, it internally creates the new array of results exactly as new PowerArray
let filteredArr = arr.filter(item => item >= 10);
console.log(filteredArr); // PowerArray [ 10, 50 ]
console.log(filteredArr.isEmpty()); // false

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

Clock.prototype._render = function() {
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

// Prototype
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

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Rewrite to class
class Clock {
   constructor({ template }) {
      this.template = template;
   }

   _render() {
      let date = new Date();

      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;

      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;

      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;

      let output = this.template
         .replace('h', hours)
         .replace('m', mins)
         .replace('s', secs);

      console.log(output);
   }

   stop() {
      clearInterval(this._timer);
   }

   start() {
      this._render();
      this._timer = setInterval(() => this._render(), 1000);
   }
}

let clock = new Clock({ template: 'h:m:s' });
clock.start();

setTimeout(() => clock.stop(), 5000);

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Error creating an instance
//  What’s wrong? Fix it.
class Animal {
   constructor(name) {
      this.name = name;
   }
}

class Rabbit extends Animal {
   constructor(name) {
      this.name = name;
      this.created = Date.now();
   }
}

let rabbit = new Rabbit('White Rabbit'); // Error: this is not defined
console.log(rabbit.name);

// Fixed class
class Animal {
   constructor(name) {
      this.name = name;
   }
}

class Rabbit extends Animal {
   constructor(name) {
      super(name);
      this.created = Date.now();
   }
}

let rabbit = new Rabbit('White Rabbit'); // Error: this is not defined
console.log(rabbit.name); // White Rabbit

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Extended clock
class Extended extends Clock {
   constructor({ template, precision = 1000 }) {
      super({ template });
      this._precision = precision;
   }
   start() {
      this._render();
      this._timer = setInterval(() => this._render(), this._precision);
   }
}

let lowResolutionClock = new ExtendedClock({
   template: 'h:m:s',
   precision: 10000,
});

lowResolutionClock.start();

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Class extends Object?
class Rabbit {
   constructor(name) {
      this.name = name;
   }
}

let rabbit = new Rabbit('Rab');

// hasOwnProperty method is from Object.prototype
// rabbit.__proto__ === Object.prototype
console.log(rabbit.hasOwnProperty('name')); // true

// it doesn’t work – why? fix it?
class Rabbit extends Object {
   constructor(name) {
      this.name = name;
   }
}

let rabbit = new Rabbit('Rab');

console.log(rabbit.hasOwnProperty('name'));

// Fixed class
class Rabbit extends Object {
   constructor(name) {
      super();
      this.name = name;
   }
}

let rabbit = new Rabbit('Rab');

console.log(rabbit.hasOwnProperty('name')); // true

//  difference in "class Rabbit extends Object" versus class Rabbit
/* The “extends” syntax sets up two prototypes:
      - Between "prototype" of the constructor functions (for methods).
      - Between the constructor functions itself (for static methods).
*/
class Rabbit extends Object {}

console.log(Rabbit.prototype.__proto__ === Object.prototype); // true
console.log(Rabbit.__proto__ === Object); // true

// But if we don’t have extends Object, then Rabbit.__proto__ is not set to Object
class Rabbit {}

console.log(Rabbit.prototype.__proto__ === Object.prototype); // true
console.log(Rabbit.__proto__ === Object); // false
console.log(Rabbit.__proto__ === Function.prototype); // true

/* 
class Rabbit	            class Rabbit extends Object
   –	                     needs to call super() in constructor
Rabbit.__proto__ === 	   Rabbit.__proto__ === Object
Function.prototype
*/

//------------------------------------------------------------------------------------------------------------------------------------------

// Konrad's examples
class A {
   constructor() {
      A.numOfInstances++;
   }

   howAreYou() {
      return "I'm fine, and what about yourself";
   }
}

A.numOfInstances = 0;

const a = new A();

const b = new A();

console.log(A.numOfInstances);

function B() {
   if (!B.numOfInstances) {
      B.numOfInstances = 0;
   }

   B.numOfInstances++;

   this.howAreYou = function() {
      return 'm fine, and what about yourself';
   };
}

const a = new B();

const b = new B();

console.log(b.howAreYou());
console.log(B.numOfInstances);
