// Error handling

/* Syntax:
   try {
      // code
   } catch (err) {
      // error handling
   }
*/
// Usually, a script “dies” (immediately stops) in case of an error, printing it to console.
// An error inside the try {…} block does not kill the script: we have a chance to handle it in catch.

// Errorless code
try {
   console.log('Start of try runs');
   // no error
   console.log('End of try runs');
} catch (err) {
   console.log('Catch is ignored, because there are no errors');
}

console.log('... Then the execution continues');

// Example with error
try {
   console.log('Start of try runs');
   lalala;
   console.log('End of try runs');
} catch (err) {
   console.log('Error has occured');
}

console.log('... Then the execution continues');

//--------------------REMEMBER--------------------
// try..catch only works for runtime errors
/* For try..catch to work, the code must be runnable. In other words, it should be valid JavaScript.
   It won’t work if the code is syntactically wrong
*/
/* try {
      {{{{{{{{{
   } catch(error) {
      console.log("The engine can't understand this code, it's invalid");
   }     // SyntaxError: Unexpected token catch */
/* The JavaScript engine first reads the code, and then runs it. The errors that occur on the reading phrase are called “parse-time” errors
   and are unrecoverable (from inside that code). That’s because the engine can’t understand the code.
   So, try..catch can only handle errors that occur in the valid code. Such errors are called “runtime errors” or, sometimes, “exceptions”.
*/

//--------------------REMEMBER--------------------
// try..catch works synchronously
// If an exception happens in “scheduled” code, like in setTimeout, then try..catch won’t catch it
try {
   setTimeout(function() {
      noSuchVariable;
   }, 1000);
} catch (error) {
   console.log("Won't work");
} // ReferenceError: noSuchVariable is not defined
/* try..catch actually wraps the setTimeout call that schedules the function. But the function itself is executed later,
   when the engine has already left the try..catch construct.
*/

setTimeout(function() {
   try {
      noSuchVariable;
   } catch (error) {
      console.log('Error is caught here!');
   }
}, 1000); // Error is caught here!

//-----------------------------------------------------------------------------------------------------------------------------------------

// Error object
/* When an error occurs, JavaScript generates an object containing the details about it.
   The object is then passed as an argument to catch */

/* For all built-in errors, the error object inside catch block has two main properties:
   -  name  -  Error name. For an undefined variable that’s "ReferenceError".
   -  message  -  Textual message about error details.

   There are other non-standard properties available in most environments. One of most widely used and supported is:
   -  stack -  Current call stack: a string with information about the sequence of nested calls that led to the error.
      Used for debugging purposes.
*/

try {
   lalala;
} catch (error) {
   console.log(error.name); // ReferenceError
   console.log(error.message); // lalala is not defined
   console.log(error.stack); // ReferenceError: lalala is not defined
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// Optional 'catch' binding
/* If we don’t need error details, catch may omit it
   try {
      // ...
   } catch {
      // error object omitted
   }
*/

// valid code
let json = '{"name":"John", "age": 30}'; // data from the server

let user = JSON.parse(json); // convert the text representation to JS object

// now user is an object with properties from the string
console.log(user.name); // John
console.log(user.age); // 30

// If json is malformed, JSON.parse generates an error, so the script “dies”.
let json = '{bad json}';

try {
   let user = JSON.parse(json);
   console.log(user.name);
} catch (error) {
   console.log(
      "Our apologies, the data has error, we'll try to request it one more time.",
   );
   console.log(error.name); // SyntaxError
   console.log(error.message); // Unexpected token b in JSON at position 1
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// Throwing our own errors
let json = '{ "age": 30 }';

try {
   let user = JSON.parse(json);
   console.log(user.name); // undefined
} catch (error) {
   console.log("doesn't execute");
}

// To unify error handling, we’ll use the throw operator.
// 'Throw' operator
// the throw operator generates an error
// throw <error object>
/* We can use anything as an error object. That may be even a primitive, like a number or a string,
   but it’s better to use objects, preferably with name and message properties 
   JavaScript has many built-in constructors for standard errors: Error, SyntaxError, ReferenceError, TypeError and others.
   We can use them to create error objects as well.
*/
let error = new Error(message);
let error2 = new SyntaxError(message);
let error3 = new ReferenceError(message);
/* For built-in errors (not for any objects, just for errors), the name property is exactly the name of the constructor.
   And message is taken from the argument.
*/
let error = new Error('Things happen o_O');

console.log(error.name); // Error
console.log(error.message); // Things happen o_O

let json = '{ "age": 30 }';

try {
   let user = JSON.parse(json);

   if(!user.name) {
      throw new SyntaxError('Incomplete data: no name');
   }

   console.log(user.name);
} catch (error) {
   console.log('JSON Error: ' + error.message); // JSON Error: Incomplete data: no name
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// Rethrowing


