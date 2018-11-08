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
