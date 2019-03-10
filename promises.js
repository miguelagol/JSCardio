// Callbacks
// Many actions in JavaScript are asynchronous.
function loadScript(src) {
   let script = document.createElement('script');
   script.src = src;
   document.head.append(script);
}
// When this function adds the <script src="…"> to the document, the browser loads and executes it.
// We can use it like this
loadScript('/my/script.js'); // the script has "function newFunction() {…}"
// The function is called “asynchronously,” because the action (script loading) finishes not now, but later.
// The code below loadScript doesn't wait for the script loading to finish

// we’d like to run the new function which is inside the script
newFunction(); // that wouldn't work, no such function!

// So let's add a callback function
function loadScript(src, callback) {
   let script = document.createElement('script');
   script.src = src;

   script.onload = () => callback(script);

   document.head.append(script);
}

// if we want to call new functions from the script, we should write that in the callback
// That’s called a “callback-based” style of asynchronous programming.
loadScript(
   'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
   // the callback runs after the script is loaded
   script => {
      alert(`Cool, the ${script.src} is loaded`);
      alert(_); // function declared in the loaded script
   },
);

//-----------------------------------------------------------------------------------------

// Callback in callback
// How to load two scripts sequentially?
// Solution for few actions
loadScript('/my/script.js', function(script) {
   alert(`Cool, the ${script.src} is loaded, let's load one more`);

   loadScript('/my/script2.js', function(script) {
      alert(`Cool, the second script is loaded, let's load one more`);

      loadScript('/my/script3.js', function(script) {
         // ...continue after all scripts are loaded
      });
   });
});

//-----------------------------------------------------------------------------------------

// Handling errors
function loadScript(src, callback) {
   let script = document.createElement('script');

   script.src = src;

   script.onload() = () => callback(null, script);
   script.onerror() = () => callback(new Error(`Script load error for ${src}`));

   document.head.append(script);
}

// the “error-first callback” style
loadScript('/my/script.js', function(error, script) {
   if (error) {
      // handle error
   } else {
      // script loaded successfully
   }
});

//-----------------------------------------------------------------------------------------

// Pyramid of Doom / Callback Hell
// The “pyramid” of nested calls grows to the right with every asynchronous action.
// This way of coding isn’t very good
loadScript('1.js', function(error, script) {
   if (error) {
      handleError(error);
   } else {
      // ...
      loadScript('2.js', function(error, script) {
         if (error) {
            handleError(error);
         } else {
            // ...
            loadScript('3.js', function(error, script) {
               if (error) {
                  handleError(error);
               } else {
                  // ...continue after all scripts are loaded (*)
               }
            });
         }
      });
   }
});

// We can try to alleviate the problem by making every action a standalone function
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Animated circle with callback
{/* <style>
   .circle {
   transition-property: width, height, margin-left, margin-top;
   transition-duration: 2s;
   position: fixed;
   transform: translateX(-50%) translateY(-50%);
   background-color: red;
   border-radius: 50%;
   }

   .message-ball {
   font-size: 20px;
   line-height: 200px;
   text-align: center;
   }
</style> */}

<button onclick="go()">Let's animate</button>;

function go() {
   showCircle(150, 150, 100, div => {
      div.classList.add('message-ball');
      div.append('Hello, world!');
   });
}

function showCircle(cx, cy, radius, callback) {
   let circle = document.createElement('div');
   circle.style.height = 0;
   circle.style.width = 0;
   circle.style.left = cx + 'px';
   circle.style.top = cy + 'px';
   circle.className = 'circle';
   document.body.append(circle);

   setTimeout(() => {
      circle.style.width = radius * 2 + 'px';
      circle.style.height = radius * 2 + 'px';

      circle.addEventListener('transitionend', function handler() {
         circle.removeEventListener('transitionend', handler);
         callback(circle);
      });
   }, 0);
}
