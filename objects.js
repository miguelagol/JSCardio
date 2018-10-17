// Objects
// objects are used to store keyed collections of various data and more complex entities. 

// Object constructor
let user = new Object();

// Object literal
let user = {};

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Literals and properties
let user = {      // an object
  name: "John", // key "name" store value "John"
  age: 30,       // key "age" store value 30
  "likes birds": true  // multiword property name must be quoted
};

// get fields of the object:
console.log(user.name); // John
console.log(user.age); // 30

console.log(user); // { name: 'John', age: 30, 'likes birds': true }

// set a new property value
user.isAdmin = true; // dot notation
user["likes birds"] = false; // square brackets if multiword property name

console.log(user); // { name: 'John', age: 30, 'likes birds': false, isAdmin: true }

// and remove a property
delete user.isAdmin;

console.log(user); // { name: 'John', age: 30, 'likes birds': false }

let key = "likes dogs";
// access by variable
user[key] = true;

console.log(user); // { name: 'John', age: 30, 'likes birds': false, 'likes dogs': true }

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Computed properties
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};

alert(bag.apple); // 5 if fruit = "apple"

//--------------------REMEMBER--------------------
// Basically, any property name is allowed (language-reserved words also).
// But there’s a special one: "__proto__" that gets special treatment for historical reasons.

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Property value shorthand
// properties have the same names as variables. 
function makeUser(name, age) {
  return {
    name, // same as name: name
    age   // same as age: age
  };
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Existance check

// Compare vs undefined
let user = {};
console.log(user.noSuchProperty === undefined); // true (means "no such property")

// Special operator "in"
// "key" in object
let user2 = {
  name: "John",
  age: 30,
};

console.log("age" in user2); // true (user.age exists)
console.log("blabla" in user2); // false (user.blabla doesn't exist)

let key = "name";
console.log(key in user2); // true (takes the name from key and checks for such property)

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// The “for…in” loop
/*  for(key in object) {
      // executes the body for each key among object properties
    }
*/
let user = {
  name: "Pete",
  age: 25,
  "likes cats": false,
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

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Ordered like an object
// Integer properties are sorted, others appear in creation order
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  "1": "USA"
};

for (let code in codes) {
  console.log(code); // 1, 41, 44, 49
}

let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

// non-integer properties are listed in the creation order
for (let prop in user) {
  console.log(prop); // name, surname, age
}

// So, to fix the issue with the phone codes, we can “cheat” by making the codes non-integer.
let codes2 = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  "+1": "USA"
};

for (let code in codes2) {
  console.log(+code); // 49, 41, 44, 1
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Copying by reference
// One of the fundamental differences of objects vs primitives is that they are stored and copied “by reference”.

let user = {  // the object is stored somewhere in memory. And the variable user has a “reference” to it.
  name: "Pete"
};

let admin = user; // When an object variable is copied – the reference is copied, the object is not duplicated.

admin.name = "John";

console.log(user.name); // John

//-------------------------------------------------------------------------------------------------------------------------------------------------------

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

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Const objects
const user = {
  name: "John"
};

user.age = 25;
/*  Const fixes the value of user itself.
    And here user stores the reference to the same object all the time.
    This line goes inside the object, it doesn’t reassign user.
*/
console.log(user.age); // 25

const userJohn = {
  name: "John"
};

// Error: Assignment to constant variable (can't reassign user)
userJohn = {
  name: "Pete"
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// Cloning and merging, Object.assign
let user = {
  name: "John",
  age: 30
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independant clone
clone.name = "Pete"; // changed the data in it

console.log(user.name); // John (still in the original object)

// Object.assign
// Object.assign(dest[, src1, src2, src3...])
let user2 = { name: "John" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user2, permissions1, permissions2);

console.log(user2); // { name: "John", canView: true, canEdit: true }

let user3 = { name: "John" };

// If the receiving object (user) already has the same named property, it will be overwritten
Object.assign(user3, { name: "Pete", isAdmin: true }); // // overwrite name, add isAdmin

console.log(user3); // { name: "Pete", isAdmin: true }

// Simple cloning
let user4 = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user4);

console.log(clone); // { name: "John", age: 30 }
clone.name = "Pete";
console.log(clone); // { name: "Pete", age: 30 }
console.log(user4); // { name: "John", age: 30 }

// Until now we assumed that all properties of user are primitive. But properties can be references to other objects.
let user5 = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user5);

console.log(user5.sizes === clone.sizes); // true (same object)

// user and clone share sizes
user5.sizes.width++;       // change a property from one place
console.log(clone.sizes.width); // 51, see the result from the other one

// To fix that we need deep cloning... soon

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK1 - Hello, object
let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK2 - Check for emptiness
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
};

let schedule = {};

console.log(isEmpty(schedule)); // true

schedule["8:30"] = "get up";

console.log(isEmpty(schedule)); // false

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK3 - Sum object properties
let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
};

let sum = 0;

for (let key in salaries) {
  sum += salaries[key];
}

console.log(sum); // 390

//-------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK4 - Multiply numeric properties by 2
function multiplyNumeric(obj) {
  for (let prop in obj) {
    if (typeof obj[prop] == "number") {
      obj[prop] *= 2;
    }
  };
};

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
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






// TASK NEW


/* function User(name) {
  this.name = name;
  this.sayHi = function () {
    console.log("My name is:" + this.name);
  };
}

let john = new User(" John");

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