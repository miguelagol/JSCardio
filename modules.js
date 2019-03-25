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

// Core module features

//--------------------REMEMBER--------------------
// 1. Always "use strict"
<script type="module">a = 5; // modules-intro:2 Uncaught ReferenceError: a is not defined</script>;

//--------------------REMEMBER--------------------
// 2. Module-level scope
// Each module has its own top-level scope (top-level variables and functions from a module are not seen in the other scripts)

// user.js
let user = 'Jack';

// hello.js
console.log(user);

// index.html
<script type="module" src="user.js" />;
<script type="module" src="hello.js" />; // this fails

// Modules are expected to export what they want to be accessible from outside
// and import what they need.

// correct variant
// user.js
export let user = 'Jack';

// hello.js
import { user } from './user.js';
console.log(user);

// index.html
<script type="module" src="hello.js" />; // Jack

//--------------------REMEMBER--------------------
// 3. A module code is evaluated only the first time when imported

/* If a same module is imported into multiple other places,
   it’s code is executed only the first time, then exports are given to all importers
*/
// alert.js
alert('Module is evaluated!');

// Import the same module from different files

// 1.js
import './alert.js'; // Module is evaluated!

// 2.js
import './alert.js'; // (nothing)

// second example
// admin.js
export let admin = {
   name: 'Jack',
};

// 1.js
import { admin } from './admin.js';
admin.name = 'Pete';

// 2.js
import { admin } from './admin.js';
console.log(admin.name); // Pete
// Changes made in 1.js are visible in 2.js

// third example
// admin.js
export let admin = {};
export function sayHi() {
   console.log(`Ready to serve, ${admin.name}!`);
};

// init.js
import { admin } from './admin.js';
admin.name = 'Pete';

// other.js
import { admin, sayHi } from './admin.js';
console.log(admin.name); // Pete
sayHi(); // Ready to serve, Pete!

//--------------------REMEMBER--------------------
// 4. The object import.meta contains information about the current module
// The content depends on the environment. In the browser, it contains the url of the script.
<script type="module">
   console.log(import.meta.url); // script url (url of the html page for an inline script)
</script>;

//--------------------REMEMBER--------------------
// 5. Top-level "this" is undefined
<script>
   console.log(this); // window
</script>;

<script type="module">
   console.log(this); // undefined
</script>;

//-----------------------------------------------------------------------------------------
