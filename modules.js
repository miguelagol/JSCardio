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
export let admin2 = {};
export function sayHi2() {
    console.log(`Ready to serve, ${admin2.name}!`);
}

// init.js
import { admin2 } from './admin.js';
admin2.name = 'Pete';

// other.js
import { admin2, sayHi2 } from './admin.js';
console.log(admin2.name); // Pete
sayHi2(); // Ready to serve, Pete!

//--------------------REMEMBER--------------------
// 4. The object import.meta contains information about the current module
// The content depends on the environment. In the browser, it contains the url of the script.
<script type="module">console.log(import.meta.url); // script url (url of the html page for an inline script)</script>;

//--------------------REMEMBER--------------------
// 5. Top-level "this" is undefined
<script>console.log(this); // window</script>;

<script type="module">console.log(this); // undefined</script>;

//-----------------------------------------------------------------------------------------------------------------------------------------

// Browser-specific features

//--------------------REMEMBER--------------------
// 1. Module scripts are deferred
// (same effect as defer attribute)
/* -  External module scripts <script type="module" src="..."> don't block HTML processing
   -  Module scripts wait until the HTML document is fullly ready
   -  Relative order is maintained: scripts that go first in the document, execute first
*/
<script type="module">console.log(typeof button); // object</script>;
// the script can 'see' the button below
// as modules are deferred, the script runs after the whole page is loaded

<script type="module">console.log(typeof button); // undefined</script>;
// the script can't see elements below
// regular scripts run immediately, before the rest of the page is processed

<button id="button">Button</button>;

//--------------------REMEMBER--------------------
// 2. Async works on inline scripts
// Async attribute <script async type="module"> is allowed on both inline and external scripts.
// Async scripts run immediately when imported modules are processed, independantly of other scripts or the HTML document.

//--------------------REMEMBER--------------------
// 3. External scripts...
// ... withe the same src run only once
// ... that are fetched from another domain require CORS headers
// if a module script is fetched from another domain, the remote server must supply a header
// Access-Control-Allow-Origin: * (may use fetching domain instead of *) to indicate that the fetch is allowed.
/* another-site.com must supply Access-Control-Allow-Origin */
<script type="module" src="http://another-site.com/their.js" />;

//--------------------REMEMBER--------------------
// 4. No bare modules allowed
// In the browser, in scripts (not in HTML), import must get either a relative or absolute URL.
// So-called “bare” modules, without a path, are not allowed.
import { sayHi } from 'sayHi'; // Error (must be './sayHi.js' or wherever the module is)
/* Certain environments, like Node.js or bundle tools allow bare modules, as they have own ways for finding modules
   and hooks to fine-tune them. But browsers do not support bare modules yet.
*/

//--------------------REMEMBER--------------------
// 5. Compatibility, "nomodule"
/* Old browsers do not understand type="module". Scripts of the unknown type are just ignored.
   For them, it’s possible to provide a fallback using nomodule attribute
*/
<script type="module">alert("Runs in modern browsers");</script>;

<script nomodule>
    alert("Modern browsers know both type=module and nomodule, so skip this") alert("Old browsers ignore script with
    unknown type=module, but execute this.");
</script>;

//-----------------------------------------------------------------------------------------------------------------------------------------

// Build tools

// In real-life, browser modules are rarely used in their “raw” form. Usually, we bundle them together with a special tool
// such as Webpack and deploy to the production server.

/* Build tools do the following:
    1.  Take a “main” module, the one intended to be put in <script type="module"> in HTML.
    2.  Analyze its dependencies: imports and then imports of imports etc.
    3.  Build a single file with all modules (or multiple files, that’s tunable), replacing native import calls with bundler functions,
        so that it works. “Special” module types like HTML/CSS modules are also supported.
    4.  In the process, other transforms and optimizations may be applied:
        -   Unreachable code removed.
        -   Unused exports removed (“tree-shaking”).
        -   Development-specific statements like console and debugger removed.
        -   Modern, bleeding-edge Javascript syntax may be transformed to older one with similar functionality using Babel.
        -   The resulting file is minified (spaces removed, variables replaced with shorter named etc).
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// Export and import

// Export before declarations
/* We can label any declaration as exported by placing export before it, be it a variable, function or a class. */
// export an array
export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
    constructor(name) {
        this.name = name;
    }
}

//--------------------REMEMBER--------------------
// No semicolon after export class/function

//-----------------------------------------------------------------------------------------

// Export apart from declarations
function sayHi3(user) {
    alert(`Hello, ${user}`);
}

function sayBye(user) {
    alert(`Bye, ${user}`);
}

export { sayHi3, sayBye }; // a list of exported variables

//-----------------------------------------------------------------------------------------

// Import*

// Usually we import like this
import { sayHi, sayBye } from './say.js';

sayHi('Pete'); // Hello, Pete
sayBye('Pete'); // Bye, Pete

// But if the list is long
import * as say from './say.js';

say.sayHi('Jack'); // Hello, Jack
say.sayBye('Jack'); // Bye, Jack

// Why should we ever explicitly list what we need to import?
/*  1.   Modern build tools (webpack and others) bundle modules together and optimize them to speedup loading and remove unused stuff.
        When we added a 3rd-party library lib.js to our project with many functions and if we in fact need only one of them in our project,
        then the optimizer will automatically detect it and totally remove the other functions from the bundled code,
        thus making the build smaller. That is called “tree-shaking”.
    2.  Explicitly listing what to import gives shorter names: sayHi() instead of lib.sayHi().
    3.  Explicit imports give better overview of the code structure: what is used and where. It makes code support and refactoring easier.
*/

//-----------------------------------------------------------------------------------------

// Import "as"
// to import under different names
import { sayHi as hi, sayBye as bye } from './say.js';

hi('Pete'); // Hello, Pete
bye('Pete'); // Bye, Pete

//-----------------------------------------------------------------------------------------

// Export "as"
// say.js
export { sayHi as hi, sayBye as bye };

// main.js
import * as say from './say.js';

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!

//-----------------------------------------------------------------------------------------

// Export default
// Modules provide special export default syntax to make “one thing per module” way look better.
/* It requires following export and import statements:
    -   Put export default before the “main export” of the module.
    -   Call import without curly braces.
*/
// user.js
export default class User {
    constructor(name) {
        this.name = name;
    }
}

// main.js
import User from './user.js'; // not {User}

new User('John');

//--------------------REMEMBER--------------------
// Import needs curly braces for named imports and doesn’t need them for the default one.
/* 
Named export	            Default export
export class User {...}	    export default class User {...}
import {User} from ...	    import User from ...
*/

//--------------------REMEMBER--------------------
// There may be only one "default" export per file
