// Destructuring assignment
// is a special syntax that allows us to “unpack” arrays or objects into a bunch of variables, as sometimes they are more convenient.

// Array destructuring
let array = ['Jack', 'Sparrow'];

// destructuring assignment
// let firstName = array[0];
// let surname = array[1];
let [firstName, surname] = array;

console.log(firstName); // Jack
console.log(surname); // Sparrow

// the same as
let [firstName, surname] = 'John Parrot'.split(' ');

console.log(firstName); // John
console.log(surname); // Parrot

// Ignore first elements
let [, , title] = ['Julius', 'Cesar', 'Consul', 'of the Roman Republic'];

console.log(title); // Consul

// Works with any iterable
let [a, b, c] = 'abc';

console.log(b); // b

let [one, two, three] = new Set([1, 2, 3]);

console.log(three); // 3

// We can use any “assignables” at the left side.
let user = {};
[user.name, user.surname] = 'Jack Sparrow'.split(' ');

console.log(user.name); // Jack

// looping with .entries()
let user = {
   name: 'Jack',
   age: 15,
};

for (let [key, value] of Object.entries(user)) {
   console.log(`${key}: ${value}`);    // name: Jack, age: 15
}

let user2 = new Map();
user2.set('name', 'Jack');
user2.set('age', 15);

for (let [key, value] of user2.entries()) {
   console.log(`${key}: ${value}`);    // name: Jack, age: 15
}
//--------------------------------------------------------------------------------------

// The rest '...' operator
let [name1, name2, ...rest] = ['Julius', 'Cesar', 'Consul', 'of the Roman Republic'];

console.log(name2); // Cesar
console.log(rest[0]); // Consul
console.log(rest.length); // 2

//--------------------------------------------------------------------------------------

// Default values
let [firstName, surname] = [];

console.log(surname); // undefined

let [name = 'Guest', surname2 = 'Anonymous'] = ['Julius'];

console.log(name); // Julius     (from array)
console.log(surname2); // Anonymous    (default value)

//------------------------------------------------------------------------------------------------------------------------------------------

// Object destructuring

//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------

// Nested destructuring


//------------------------------------------------------------------------------------------------------------------------------------------

// Smart function parameters


//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Destructuring assignment
/*    Write the destructuring assignment that reads:
      -  name property into the variable name.
      -  years property into the variable age.
      -  isAdmin property into the variable isAdmin (false if absent) 
*/
let user = {
   name: 'Jack',
   years: 52,
};

let [name, age, isAdmin = false] = Object.values(user);

console.log(name); // Jack
console.log(age); // 52
console.log(isAdmin); // false

// or
let { name: name2, years: age2, isAdmin2 = false } = user;

console.log(name2); // Jack
console.log(age2); // 52
console.log(isAdmin2); // false

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - The maximal salary
/*    Create the function topSalary(salaries) that returns the name of the top-paid person.
      -  If salaries is empty, it should return null.
      -  If there are multiple top-paid persons, return any of them.
*/
function topSalary(salaries) {

}

let salaries = {
   'Jack': 100,
   'Pete': 250,
   'Ann': 200,
};
