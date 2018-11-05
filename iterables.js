// Sympol.iterator
let range = {
   from: 1,
   to: 5,
};

// to make the range iterable we need to add a method to the object named Symbol.iterator
range[Symbol.iterator] = function() {
   return {
      current: this.from,
      last: this.to,

      next() {
         if (this.current <= this.last) {
            return { done: false, value: this.current++ };
         } else {
            return { done: true };
         }
      },
   };
};

for (let num of range) {
   console.log(num); // 1, 2, 3, 4, 5
}

//--------------------REMEMBER--------------------
/*  - when for..of starts, it calls the method
    - the method mest return an iterator ( an object with the method next)
    - when for..of wants the next value, it calls next() on that object
    - the result of next() must have the form {done: Boolean, value: any}
      (where done=true means that the iteration is finished, otherwise value must be the new value)
*/

//------------------------------------------------------------------------------------------------------------------------------------------

// String is iterable
let string = 'Hello';
for (let char of string) {
   console.log(char); // H, e, l, l, o
}

// or calling an iterator explicitly
let iterator = string[Symbol.iterator]();

while (true) {
   let result = iterator.next();
   if (result.done) break;
   console.log(result.value); // H, e, l, l, o
}

//------------------------------------------------------------------------------------------------------------------------------------------

// Iterables and array-likes
// Iterables are objects that implement the Symbol.iterator method
// Array-likes are objects that have indexes and length, so they look like arrays

// Array.from
// Array.from(object[, mapFn, thisArg])   argument mapFn should be the function to apply to each element before adding to the array,
//                                        and thisArg allows to set this for it.
// It takes an iterable or array-like value and makes a “real” Array from it. Then we can call array methods on it.
let arrayLike = {
   0: 'Hello',
   1: 'World',
   length: 2,
};
let array = Array.from(arrayLike);

console.log(array.pop()); // World

let iterable = {
   from: 1,
   to: 5,
   [Symbol.iterator]() {
      this.current = this.from;
      return this;
   },

   next() {
      if (this.current <= this.to) {
         return { done: false, value: this.current++ };
      } else {
         return { done: true };
      }
   },
};
let array2 = Array.from(iterable);

console.log(array2); // [ 1, 2, 3, 4, 5]

// square each number
let array3 = Array.from(iterable, num => num * num);

console.log(array3); // [ 1, 4, 9, 16, 25 ]

let string = 'Hello';
let chars = Array.from(string);

// the same as
let chars2 = [];
for (let char of string) {
   chars2.push(char);
}

console.log(chars[0]); // H
console.log(chars.length); // 5
console.log(chars2); // [ 'H', 'e', 'l', 'l', 'o' ]
