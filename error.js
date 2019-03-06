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




