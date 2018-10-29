// Symbol
// “Symbol” value represents a unique identifier.

let id = Symbol(); // id is a new symbol

let id2 = Symbol('id'); // id2 is a symbol with the description "id"
console.log(id2); // Symbol(id)

//------------------REMEMBER---------------------
/*  Symbols are guaranteed to be unique. Even if we create many symbols with the same description,
    they are different values. The description is just a label that doesn’t affect anything. 
*/

let id1 = Symbol('id');
let id2 = Symbol('id');

console.log(id1 == id2); // false

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Hidden properties
// Symbols allow us to create “hidden” properties of an object, that no other part of code can occasionally access or overwrite.

// If we want to use a symbol in an object literal, we need square brackets.
let id = Symbol('id');

let user = {
   name: 'John',
   [id]: 123, // not just "id: 123"
};

// Symbolic properties do not participate in for..in loop.
let id = Symbol('id');
let user2 = {
   name: 'John',
   age: 30,
   [id]: 123,
};

for (let key in user2) console.log(key); // name, age

// the direct access by the symbol works
console.log('Direct: ' + user2[id]);

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Global symbols
// Symbol.for(key)

// read from the global registry
let id = Symbol.for('id'); // if the symbol did not exist, it is created

// read it again
let idAgain = Symbol.for('id');

// the same symbol
console.log(id === idAgain); // true

// Symbol.keyFor(sym)
// returns a name by a global symbol.
let sym = Symbol.for('name');
let sym2 = Symbol.for('id');
let idAdmin = Symbol.for('id');

console.log(sym2 === idAdmin); // true
console.log(Symbol.keyFor(idAdmin)); // id

// get name from symbol
console.log(Symbol.keyFor(sym)); // name
console.log(Symbol.keyFor(sym2)); // id

//------------------REMEMBER---------------------
/*  The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol.
    So it doesn’t work for non-global symbols.If the symbol is not global,
    it won’t be able to find it and return undefined.
*/
console.log(Symbol.keyFor(Symbol.for('name'))); // name
console.log(Symbol.keyFor(Symbol('name2'))); // undefined (the argument isn't a global symbol)
