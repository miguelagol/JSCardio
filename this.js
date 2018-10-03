// Method examples
// A function that is the property of an object is called its method.
let user = {
  name: "John",
  age: 30
};

user.sayHi = function () {
  console.log("Hello!");
};

user.sayHi(); // Hello!

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Method shorthand
let user = {
  sayHi() { // same as "sayHi: function()"
    console.log("Hello");
  }
};

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// "this" in methods
// The value of this is evaluated during the run-time.

// Global context
function someFunction() {
  return this;
}

console.log(someFunction() === global);

// Common usage
const object = {
  value: 42,
  getAnswer(question) {
    if (!question.endsWith('?')) {
      throw new Error('This is not a question!');
    }

    return this.value;
  }
};

const answer = object.getAnswer('what is the meaning of life?');
console.log(answer); // 42

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Reference
const object2 = {
  value: 42,
  getAnswer(question) {
    if (!question.endsWith('?')) {
      throw new Error('This is not a question!');
    }

    return this.value;
  }
}

const newObject = {
  value: 3301
};

newObject.getAnswer = object2.getAnswer;

const answer = newObject.getAnswer('what is the most mysterious secret out there?');
console.log(answer); // 3301


// this refers to the “closest” object, which has this function as a method
const a = {
  value: 42,
  b: {
    value: 3301,
    getContext: function () {
      console.log(this.value);
      return this;
    }
  }
};

console.log(a.b.getContext() === a.b); // 3301, true
a.b.getContext(); // 3301


function someFunction() {
  return this;
}

const b = {
  b: 42,
  c: someFunction
};

console.log(b.c() === b); // true


/* const a = {
  b: 42,
  c: function() {
    return this.b;
  }
};

(a.c || [])(); // 1
(a.c)(); // 2
(1, a.c)();  */


let user = {
  name: "John",
  age: 30,

  sayHi() {
    console.log(this.name);
  }
};

let admin = user;
user = null;

for (let key in admin) {
  console.log(key)        // name, age, sayHi()
}
admin.sayHi(); // John


let user2 = { name: "John" };
let admin2 = { name: "Admin" };

function sayHi() {
  console.log(this.name);
}

// use the same functions in two objects
user2.f = sayHi;
admin2.f = sayHi;

// these calls have different this
user2.f(); // John  (this == user)
admin2.f(); // Admin  (this == admin)

sayHi(); // undefined (this == global object, window in a browser)


let user3 = {
  name: "John",
  hi() {
    console.log(this.name);
  }
}

let hi = user3.hi;
hi(); // undefined
// user.hi() - the dot '.' returns not a function, but a value of the special Reference Type (“specification type”).
/*  The value of Reference Type is a three-value combination (base, name, strict), where:
    - base is the object.
    - name is the property.
    - strict is true if use strict is in effect.
*/
// so Reference Type value for user.hi() is (user, "hi", true)

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Arrow functions have no "this"
// Arrow functions don’t have their “own” this. If we reference this from such a function, it’s taken from the outer “normal” function.
let user = {
  firstName: "Ilya",
  call() {
    let callFN = () => console.log(this.firstName);
    callFN();
  }
};

user.call(); // Ilya

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Bind
// function.bind(thisArg[, arg1[, arg2[, ...]]])

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Apply
// function.apply(thisArg, [argsArray])

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Call
// function.call(thisArg, arg1, arg2, ...)


//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - What is the result of this code?
let user = {
  name: "John",
  go: function () { console.log(this.name) }
}

  (user.go)() // Error: user is not defined
// Because a semicolon is missing after let user = {}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Explain the value of "this"
let obj, method;

obj = {
  go: function () { console.log(this); }
};

obj.go();               // { go: [Function: go] }
(obj.go)();             //  { go: [Function: go] }
(method = obj.go)();    // Window {...}
(obj.go || obj.stop)(); // Window {...}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - What is the result of accessing its ref? Why?
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

console.log(user.ref.name); // undefined
// Here the value of this inside makeUser() is undefined, because it is called as a function, not as a method.

//vs.
function makeUser2() {
  return {
    name: "John",
    ref() {           // user.ref() is a method. And the value of this is set to the object before dot ..
      return this;
    }
  };
};

let user2 = makeUser2();

console.log(user2.ref().name); // John
console.log(user2.ref()); // { name: 'John', ref: [Function: ref] }

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Create a calculator
let calculator = {
  read() {
    this.x = +prompt('x?', '');
    this.y = +prompt('y?', '');
  },
  sum() {
    let sum = this.x + this.y;
    return sum;
  },
  mul() {
    let mul = this.x * this.y;
    return mul;
  }
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());

/* function Calculator() {

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

console.log("Sum = " + calculator.sum());
console.log("Mul = " + calculator.mul()); */

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Chaining - Modify the code of up and down to make the calls chainable
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function () { // shows the current step
    console.log(this.step);
  }
};

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1

let ladderChain = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function () { // shows the current step
    console.log(this.step);
    return this;
  }
};

ladderChain.up().down().down().showStep(); // -1


/* const x = {
  result: 0,
  y: 2,
  half(num) {
    this.result = num / this.y;
    return this
  },
  mult(x) {
    this.result += this.y * x;

  }
}

console.log(x.half(10).mult(2));

function blach(x) {
  const y = { ...x };
  y.y = 0;
}
blach(x);
console.log(x.half(4));





let x;
function identify() {
  let
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

var me = {

  name: "Kyle"
};

var you = {
  name: "Reader"
};

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER

    function identify(context) {
      return context.name.toUpperCase();
    }
    
    function speak(context) {
      var greeting = "Hello, I'm " + identify( context );
      console.log( greeting );
    }
    
    identify( you ); // READER
    speak( me ); // Hello, I'm KYLE */



/* function User(name) {
  this.name = name;
  this.sayHi = function () {
    console.log("My name is:" + this.name);
  };
}

let john = new User("John");

john.sayHi(); */


/* function Accumulator(startingValue) {
  this.value = startingValue;
  this.read = function (addValue) {
    this.value += addValue;
  };
}

let accumulator = new Accumulator(1);
accumulator.read(6);
accumulator.read(2);
console.log(accumulator.value);


function Accumulator2(startingValue) {
  this.value = startingValue;
  this.read = function() {
    this.value += +prompt('How much do you want to add?', 0);
  }
}

let accumulator2 = Accumulator2(1);
accumulator2.read();
accumulator2.read();
console.log(accumulator2.value); */