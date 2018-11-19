// Destructuring assignment
// is a special syntax that allows us to “unpack” arrays or objects into a bunch of variables, as sometimes they are more convenient.

// ARRAY DESTRUCTURING
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
   console.log(`${key}: ${value}`); // name: Jack, age: 15
}

let user2 = new Map();
user2.set('name', 'Jack');
user2.set('age', 15);

for (let [key, value] of user2.entries()) {
   console.log(`${key}: ${value}`); // name: Jack, age: 15
}

//--------------------------------------------------------------------------------------

// The rest '...' operator
let [name1, name2, ...rest] = [
   'Julius',
   'Cesar',
   'Consul',
   'of the Roman Republic',
];

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

// OBJECT DESTRUCTURING
// let {var1, var2} = {var1: ..., var2: ...}
let options = {
   title: 'Menu',
   width: 100,
   height: 200,
};

let { title, width, height } = options;

console.log(title); // Menu
console.log(width); // 100
console.log(options.height); // 200

// the order does not metter
let { height, width, title } = { title: 'Menu', height: 200, width: 100 };

console.log(title); // Menu
console.log(width); // 100

// we can assign a property to a variable with another name
// let {sourceProperty: targetVariable} = {sourceProperty: ...}
let options = {
   title: 'Menu',
   width: 100,
   height: 200,
};

let { width: wi, height: he, title } = options;

console.log(wi); // 100
console.log(he); // 200
console.log(title); // Menu

//--------------------------------------------------------------------------------------

// Default values
let options = {
   title: 'Menu',
};

let { width = 100, title } = options;

console.log(title); // Menu
console.log(width); // 100

let options = {
   width: 200,
};

let { title = 'Menu', width: wi = 300, height: he = 100 } = options;

console.log(title); // Menu
console.log(wi); // 200
console.log(he); // 100

//--------------------------------------------------------------------------------------

// The rest '...' operator
let options = {
   title: 'Menu',
   width: 100,
   height: 200,
};

let { title, ...rest } = options;

console.log(rest.width); // 100
console.log(rest.height); // 200

//--------------------------------------------------------------------------------------

// Be carefull with let

let title, width, height;

/*    JavaScript treats {...} in the main code flow (not inside another expression) as a code block
      {title, width, height} = {title: "Menu", width: 200, height: 100}; 
      console.log(title); // Error: Unexpected token =
*/

// To show JavaScript that it’s not a code block, we can wrap the whole assignment in brackets (...)
// now ok
let title, width, height;

({ title, width, height } = { title: 'Menu', width: 200, height: 100 });

console.log(title); // Menu

//------------------------------------------------------------------------------------------------------------------------------------------

// Nested destructuring
let options = {
   size: {
      width: 200,
      height: 100,
   },
   items: ['Cake', 'Donut'],
   extra: true,
};

// nested destructruring assignment onmultiple lines for clarity
let {
   size: { width, height },
   items: [item1, item2],
   title = 'Menu',
} = options;

console.log(width); // 200
console.log(height); // 100
console.log(item2); // Donut
console.log(title); // Menu

let options = {
   size: {
      width: 200,
      height: 100,
   },
   items: ['Cake', 'Donut'],
   title: 'Menu',
   extra: true,
};

let { size } = options;

console.log(size); //{ width: 200, height: 100 }

//------------------------------------------------------------------------------------------------------------------------------------------

// Smart function parameters
let options = {
   title: 'My menu',
   items: ['Item1', 'Item2'],
};

/*	function({
  		incomingProperty: parameterName = defaultValue
  		...
	})
*/
function showMenu({
   title = 'Untitled',
   width = 200,
   height = 100,
   items = [],
}) {
   console.log(`${title} ${width} ${height}`);
   console.log(items);
}

showMenu(options); // My menu 200 100,		[ 'Item1', 'Item2' ]
showMenu({}); // Untitled 200 100,		[]

showMenu(); // Error: Cannot destructure property `title` of 'undefined' or 'null'

// we can fix it by making {} the default value for the whole destructuring thing
function showMenu({ title = 'Menu', width = 100, height = 200 } = {}) {
   console.log(`${title} ${width} ${height}`);
}

showMenu(); // Menu 100 200

let options = {
   title: 'My menu',
   items: ['Item1', 'Item2'],
};

function showMenu({
   title = 'Untitled',
   width: wi = 200,
   height: he = 100,
   items: [item1, item2],
}) {
   console.log(`${title} ${wi} ${he}`);
   console.log(item1);
   console.log(item2);
}

showMenu(options); // My menu 200 100,		Item1,	Item2

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
   let maxSalary = 0;
   let maxName = null;
   for (let [name, salary] of Object.entries(salaries)) {
      salary > maxSalary ? ([maxName, maxSalary] = [name, salary]) : null;
   }
   console.log(maxName);
}

let salaries = {
   Jack: 100,
   Pete: 250,
   Ann: 300,
};

topSalary(salaries);
