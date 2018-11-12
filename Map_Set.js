// Map
// is a collection of keyed data items
/*  The main methods:
    - new Map() creates the map
    - map.set(key, value)   stores the value by the key
    - map.get(key)  returns the value by the key, undefined if key doesn't exist in map
    - map.has(key)  returns true if the key exist, false otherwise
    - map.delete(key)   removes the value by the key
    - map.clear()   clears the map
    - map.size  returns the current element count
*/
// Map allows keys of any type
let map = new Map;

/* 	map.set('1', 'string1');
		map.set(1, 'number1');
		map.set(true, 'bool1');
*/

// or
// "chain" the calls
map.set('1', 'string1')
	.set(1, 'number1')
	.set(true, 'bool1');

console.log(map.has(1)); // true

// Map keeps the type, so these two are different
console.log(map.get(1)); // number1
console.log(map.get('1')); // string1

map.delete(1);
console.log(map.get(1)); // undefined

map.clear();
console.log(map.get('1')); // undefined

// Map can also use objects as keys
let jack = { name: 'Jack' };
let visitsCountMap = new Map; // for every user, let's store their visists count

visitsCountMap.set(jack, 123);

console.log(visitsCountMap.get(jack)); // 123

//-------------------------------------------------------------------------------------------

// Map from Object
// let map = new Map( [ [key, value] (, [key2, value2]) ] )
let map = new Map([
	['1', 'string1'],
	[1, 'number1'],
	[true, 'bool1'],
]);

console.log(map.get(true)); // bool1

// Object.entries(object) returns an array of key/value pairs
let map = new Map(Object.entries({
	name: 'Jack',
	age: 30,
}));

console.log(map.get('name')); // Jack

//-------------------------------------------------------------------------------------------

// Iteration over Map
/* 	map.keys() returns an iterable for keys
		map.values()	returns an iterable for values
		map.entries()	returns an iterable for entries [key, value]
		map.forEach(function(value, key, map) {
      	// ...do something with item
    	})
*/
let recipeMap = new Map([
	['cucumber', 500],
	['tomatoes', 350],
	['onion', 50],
]);

for (let vegetable of recipeMap.keys()) {
	console.log(vegetable);			//	cucumber, tomatoes, onion
}

for (let amount of recipeMap.values()) {
	console.log(amount);  		// 500, 350, 50
}

for (let entry of recipeMap.entries()) {
	console.log(entry);		// [ 'cucumber', 500 ], [ 'tomatoes', 350 ], [ 'onion', 50 ]
}

recipeMap.forEach((value, key, map) => {
	console.log(`${key}: ${value}`);	// cucumber: 500, tomatoes: 350, onion: 50
})

// * For objects:
/* 	Object.keys(obj)	returns an array of keys
		Object.values(obj)	returns an array of values
		Object.entries(obj)	returns an array of [key, value] pairs
*/
let user = {
	name: 'Jack',
	age: 24,
};

console.log(Object.keys(user)); // [ 'name', 'age' ]
console.log(Object.values(user)); // [ 'Jack', 24 ]
console.log(Object.entries(user)); // [ [ 'name', 'Jack' ], [ 'age', 24 ] ]

for (let value of Object.values(user)) {
	console.log(value);		// Jack, 24
}

// the same as
for (let value in user) {
	console.log(user[value]);
}

//-------------------REMEMBER-------------------
// Just like a for..in loop, Object.keys/values/entries ignore properties that use Symbol(...) as keys.

//------------------------------------------------------------------------------------------------------------------------------------------

// Set
// is a collection of values, where each value may occur only once
/*  The main methods:
    - new Set(iterable) creates the set
    - set.add(value)		adds a value, returns the set itself   
    - set.delete(value)   removes the value
    - set.has(value)  returns true if the value exist in the set, false otherwise
    - set.clear()   removes everything from the set
    - set.size  returns the elements count
*/
let set = new Set();

let jack = { name: 'Jack' };
let ann = { name: 'Ann' };
let mary = { name: 'Mary' };

set.add(jack);
set.add(mary);
set.add(jack);
set.add(ann);
set.add(mary);
set.add(jack);

console.log(set.size); // 3

for (let user of set) {
	console.log(user.name); // Jack, Mary, Ann
}

console.log(set.has(mary)); // true

set.delete(mary);
console.log(set.has(mary)); // false

//-------------------------------------------------------------------------------------------

// Iteration over Set
/* 	set.keys() 	returns an iterable object for values
		set.values()	returns an iterable object for values
		set.entries()	returns an iterable object for entries [value, value]
		set.forEach(function(value, valueAgain, set) {
  			// ...do something with item
		})
*/
let fruitsSet = new Set(['oranges', 'apples', 'bananas']);

for (let value of fruitsSet.keys()) {
	console.log(value);			//	oranges, apples, bananas
}

for (let value of fruitsSet.values()) {
	console.log(value);  		//	oranges, apples, bananas
}

for (let entry of fruitsSet.entries()) {
	console.log(entry);		// [ 'oranges', 'oranges' ], [ 'apples', 'apples' ], [ 'bananas', 'bananas' ]
}

fruitsSet.forEach((value, valueAgain, set) => {
	console.log(`${value}: ${valueAgain}`);	// oranges: oranges, apples: apples, bananas: bananas
})

//------------------------------------------------------------------------------------------------------------------------------------------

// WeakSet and WeakMap
// WeakSet is a special kind of Set that does not prevent JavaScript from removing its items from memory.

// JavaScript engine stores a value in memory while it is reachable
// Objects Garbage collection
let john = { name: "John" };
john = null;
console.log(john.name); // Error: Cannot read property 'name' of null

// Map Garbage collection
let jack = { name: 'Jack' };
let map = new Map();
map.set(jack, '...');
jack = null;
console.log(map.get(jack)); // undefined
// but
console.log(map.keys()); // [Map Iterator] { { name: 'Jack' } }
console.log(map.size); // 1	(it's still there)

// WeakMap/WeakSet does not prevent the object removal from the memory

// WeakMap keys must be objects, not primitive values
let weakMap = new WeakMap();

let object = {};

weakMap.set(object, 'ok');
weakMap.set('test', 'whoops'); // Error: Invalid value used as weak map key

// if object only exists as the key of WeakMap – it is to be automatically deleted
let mary = { name: 'Mary' };

let weakMap = new WeakMap();

weakMap.set(mary, '...');
mary = null;

//--------------------REMEMBER-------------------
// WeakMap does not support methods keys(), values(), entries(), we can not iterate over it
// (So there’s really no way to receive all keys or values from it)

/* WeakMap has only the following methods:
		- weakMap.get(key)
		- weakMap.set(key, value)
		- weakMap.delete(key, value)
		- weakMap.has(key)
*/

// The idea of WeakMap is that we can store something for an object that exists only while the object exists.
// But we do not force the object to live by the mere fact that we store something for it.
let john = { name: "John" };

let visitsCountMap = new WeakMap();

visitsCountMap.set(john, 123);

john = null;

// there are no references except WeakMap,
// so the object is removed both from the memory and from visitsCountMap automatically
console.log(visitsCountMap.has(john)); // false

/* 	WeakSet behaves similarly:
	- we may only add objects to WeakSet (not primitives).
	- an object exists in the set while it has reachable from somewhere else.
	- it supports add, has and delete, but not size, keys() and no iterations.
*/
let messages = [
	{ text: "Hello", from: "John" },
	{ text: "How goes?", from: "John" },
	{ text: "See you soon", from: "Alice" }
];

let unreadSet = new WeakSet(messages);

console.log(unreadSet)
console.log(unreadSet.has(messages[1])); // true

// remove it from the set after reading
unreadSet.delete(messages[1]);

// and when we shift our messages history, the set is cleaned up automatically
messages.shift();

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Filter unique array members
function unique(array) {
	let uniqueValues = new Set();
	for (let string of array) {
		uniqueValues.add(string);
	}
	return uniqueValues;
}

let values = ["Hare", "Krishna", "Hare", "Krishna", "Krishna", "Krishna", "Hare", "Hare", ":-O"];

console.log(unique(values)); // Set { 'Hare', 'Krishna', ':-O' }

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Write a function aclean(arr) that returns an array cleaned from anagrams.
function aclean(array) {
	let set = new Set();
	let strings = [];
	for (let word of array) {
		let string = word.toLowerCase().split('').sort().join('')
		if (!set.has(string)) {
			strings.push(word);
			set.add(string);
		}
	}
	return strings;
}

let anagrams = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log(aclean(anagrams)); // [ 'nap', 'teachers', 'ear' ]

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Iterable keys
let map = new Map();

map.set('name', 'John');

let keys = [];

for (let key of map.keys()) {
	keys.push(key);
}

keys.push('more');

console.log(keys); // [ 'name', 'more' ]

// or
let map = new Map();

map.set('name', 'John');

let keys = Array.from(map.keys());

keys.push('more');

console.log(keys); // [ 'name', 'more' ]

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Store 'unread' flags
let messages = [
	{ text: 'Hello', from: 'John' },
	{ text: 'How goes?', from: 'John' },
	{ text: 'See you soon', from: 'Alice' },
];

let readMessages = new WeakSet();

readMessages.add(messages[1]);
readMessages.add(messages[0]);
readMessages.add(messages[1]);

// Was the message[0] read?;
console.log('Read message[0]: ' + readMessages.has(messages[0])); // Read message[0]: true

messages.shift();

console.log(messages); // [ { text: 'How goes?', from: 'John' }, { text: 'See you soon', from: 'Alice' } ]

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Store read dates
let messages = [
	{ text: 'Hello', from: 'John' },
	{ text: 'How goes?', from: 'John' },
	{ text: 'See you soon', from: 'Alice' },
];

let readMessages = new WeakMap();

readMessages.set(messages[0], new Date(2018, 11, 12));

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Sum the properties
function sumSalaries(object) {
	let sum = 0;
	for (let salary of Object.values(object)) {
		sum += salary;
	}
	return sum;
}

let salaries = {
	'Jack': 100,
	'Ann': 300,
	'Mary': 250,
};

console.log(sumSalaries(salaries)); // 650

// or
function sumSalaries2(object) {
	return Object.values(object).reduce((sum, current) => sum += current, 0);
}

console.log(sumSalaries2(salaries)); // 650

//------------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Count properties
function count(object) {
	return Object.values(object).length;
}

let user = {
	name: 'Kate',
	age: 25,
	isAdmin: true,
};

console.log(count(user)); // 3
