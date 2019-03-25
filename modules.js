// Modules

/* As our application grows bigger,we want to split it into multiple files, so called 'modules'.
   A Module usually contains a class ot a library of useful functions.
*/

// What is a module?
// A module is just a file, a single script.
/* Directives export and import allow to interchange functionality between modules:
   - export keyword labels variables and functions that should be accessible from outside the file
   - import allows to import functionality from other modules
*/
// sayHi.js
export function sayHi(user) {
   console.log(`Hello, ${user}!`);
}

// main.js
import { sayHi } from './sayHi.js';

sayHi('Jack'); // Hello, Jack!

// To use modules in the browser we must set the attribute <script type="module">

//-----------------------------------------------------------------------------------------------------------------------------------------
