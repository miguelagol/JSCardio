// The JSON (JavaScript Object Notation) is a general format to represent values and objects

// JSON.stringify()
// convert objects into JSON.
let student = {
   name: 'Jack',
   age: 24,
   isAdmin: false,
   courses: ['html', 'css', 'js'],
   wife: null,
};

// The resulting json string is a called JSON-encoded or serialized or stringified or marshalled object
let json = JSON.stringify(student);

console.log(typeof json); // string
console.log(json); // {"name":"Jack","age":24,"isAdmin":false,"courses":["html","css","js"],"wife":null}

//-------------------REMEMBER--------------------
/*  -   Strings use double quotes. No single quotes or backticks in JSON.
    -   Object property names are double-quoted also.

    Natively supported JSON types are:
    - Objects { ... }
    - Arrays [ ... ]
    - Primitives:
    - strings,
    - numbers,
    - boolean values true/false,
    - null.
*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// Nested objects are supported and converted automatically
let meetup = {
   title: 'COnference',
   room: {
      number: 23,
      participants: ['John', 'Ann'],
   },
};

console.log(JSON.stringify(meetup)); // {"title":"COnference","room":{"number":23,"participants":["John","Ann"]}}

//---------------------------------------------------------------------------------------------------------------------------------------------------------

//-------------------REMEMBER--------------------
// The important limitation: there must be no circular references.
let room = {
   number: 23,
};

let meetup = {
   title: 'Conference',
   participants: ['John', 'Ann'],
};

meetup.place = room;
room.occupiedBy = meetup;

JSON.stringify(meetup); // Error: Converting circular structure to JSON

//---------------------------------------------------------------------------------------------------------------------------------------------------------

/* JSON is data-only cross-language specification, so some JavaScript-specific object properties are skipped by JSON.stringify.
    Namely:
    - Function properties (methods).
    - Symbolic properties.
    - Properties that store undefined.
*/
let user = {
   sayHi() {
      console.log('Hello');
   },
   [Symbol('id')]: 123,
   something: undefined,
};

console.log(JSON.stringify(user)); // {}    (empty object)

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// full syntax of JSON.stringify
/* let json = JSON.stringify(value [, replacer, space])
   value - a value to encode
   replacer - array of properties to encode or a mapping function(key, value)
   space - amount of smace to use for formatting
*/
// If we pass an array of properties to it, only these properties will be encoded.
let room = {
   number: 123,
};

let meetup = {
   title: 'Conference',
   participants: [{ name: 'John' }, { name: 'Ann' }],
   place: room,
};

room.occupiedBy = meetup;

console.log(JSON.stringify(meetup, ['title', 'participants'])); // {"title":"Conference","participants":[{},{}]}

console.log(
   JSON.stringify(meetup, ['title', 'participants', 'name', 'place', 'number']),
); // {"title":"Conference","participants":[{"name":"John"},{"name":"Ann"}],"place":{"number":123}}

console.log(
   JSON.stringify(meetup, function replacer(key, value) {
      console.log(`${key}: ${value}`);
      return key == 'occupiedBy' ? undefined : value;
   }),
);
/* 
: [object Object]
title: Conference
participants: [object Object],[object Object]
0: [object Object]
name: John
1: [object Object]
name: Ann
place: [object Object]
number: 123
occupiedBy: [object Object]
{"title":"Conference","participants":[{"name":"John"},{"name":"Ann"}],"place":{"number":123}}
*/
/* The first call is special. It is made using a special “wrapper object”: {"": meetup}.
   In other words, the first (key,value) pair has an empty key, and the value is the target object as a whole.
*/

let user = {
   name: 'John',
   age: 25,
   roles: {
      isAdmin: false,
      isEditor: true,
   },
};

console.log(JSON.stringify(user, null, 3));
/* 
{
   "name": "John",
   "age": 25,
   "roles": {
      "isAdmin": false,
      "isEditor": true
   }
}
*/
