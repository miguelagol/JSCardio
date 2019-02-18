// Geometry
// Element properties that provide width, height and other geometry are always numbers. They are assumed to be in pixels.
// http://javascript.info/article/size-and-scroll/metric-css.png
// http://javascript.info/article/size-and-scroll/metric-all.png

//--------------------REMEMBER-------------------
// Mind the scrollbar (Some browsers (not all) reserve the space for it by taking it from the content)
// The padding-bottom may be filled with text

//----------------------------------------------------------------------------------------------------------------------------------------

// offsetParent, offsetLeft/offsetTop
/* The offsetParent is the nearest ancestor that is:
      - CSS-positioned (position is absolute, relative, fixed or sticky),
      - or <td>, <th>, <table>,
      - or <body>.
*/
// In most practical cases we can use offsetParent to get the nearest CSS-positioned ancestor.
// And offsetLeft/offsetTop provide x/y coordinates relative to it’s upper-left corner.
<main style="position: relative" id="main">
   <article>
      <div id="example" style="position: absolute; left: 180px; top: 180px">
         ...
      </div>
   </article>
</main>;

alert(example.offsetParent.id); // main
alert(example.offsetLeft); // 180 (note: a number!!!, not a string "180px")
alert(example.offsetRight); // 180

/* There are several occasions when offsetParent is null:
      - For not shown elements (display:none or not in the document).
      - For <body> and <html>.
      - For elements with position:fixed.
*/

//----------------------------------------------------------------------------------------------------------------------------------------

// offsetWidth/offsetHeight
// These properties provides the “outer” width/height of the element. Or, in other words, its full size including borders.

//--------------------REMEMBER-------------------
/* Geometry properties for not shown elements are zero/null
   Geometry properties are calculated only for shown elements.

If an element (or any of its ancestors) has display:none or is not in the document,
then all geometry properties are zero or null depending on what it is.
*/

// We can use this to check if an element is hidden, like this:
function isHidden(elem) {
   // isHidden returns true for elements that are on-screen, but have zero sizes (like an empty <div>)
   return !elem.offsetWidth && !elem.offsetHeight;
}

//----------------------------------------------------------------------------------------------------------------------------------------

// clientLeft/clientTop
// relative coordinates of the inner side from the outer side
// In left-to-right document these properties are borders
// When the document is right-to-left (the operating system is in Arabic or Hebrew languages).
// The scrollbar is then not on the right, but on the left, and then clientLeft also includes the scrollbar width.

//----------------------------------------------------------------------------------------------------------------------------------------

// clientWidth/clientHeight
// These properties provide the size of the area inside the element borders.
// They include the content width together with paddings, but without the scrollbar

// If there are no paddings, then clientWidth/Height is exactly the content area, inside the borders and the scrollbar (if any).

//----------------------------------------------------------------------------------------------------------------------------------------

// scrollWidth/scrollHeight
// ScrollHeight   - is the full inner height of the content area including the scrolled out parts
// ScrollWidth    - is the full inner width

/* Properties clientWidth/clientHeight only account for the visible part of the element.
   Properties scrollWidth/scrollHeight also include the scrolled out (hidden) parts
*/

// We can use these properties to expand the element wide to its full width/height.
element.style.height = `${element.scrollHeight}px`;

//----------------------------------------------------------------------------------------------------------------------------------------

// scrollLeft/scrollTop
// These properties are the width/height of the hidden, scrolled out part of the element.
// scrollTop is “how much is scrolled up”

//--------------------REMEMBER-------------------
// scrollLeft/scrollTop can be moddified
// Most of the geometry properties here are read-only, but scrollLeft/scrollTop can be changed, and the browser will scroll the element.

// We can create onlick function to makes the element content scroll 10px down.

//----------------------------------------------------------------------------------------------------------------------------------------

//--------------------REMEMBER-------------------
// Don’t take width/height from CSS

/* We shouldn't we use geometry properties instead:
      -  First, CSS width/height depend on another property: box-sizing that defines “what is” CSS width and height.
         A change in box-sizing for CSS purposes may break such JavaScript.
      -  Second, CSS width/height may be auto, for instance for an inline element:
*/

<span id="elem">Hello!</span>;

alert(getComputedStyle(elem).width); // auto

//----------------------------------------------------------------------------------------------------------------------------------------

// Summary

/* Elements have the following geometry properties:
      -  offsetParent – is the nearest positioned ancestor or td, th, table, body.
      -  offsetLeft/offsetTop – coordinates relative to the upper-left edge of offsetParent.
      -  offsetWidth/offsetHeight – “outer” width/height of an element including borders.
      -  clientLeft/clientTop –  the distance from the upper-left outer corner to its upper-left inner corner.
                                 For left-to-right OS they are always the widths of left/top borders.
                                 For right-to-left OS the vertical scrollbar is on the left so clientLeft includes its width too.
      -  clientWidth/clientHeight – the width/height of the content including paddings, but without the scrollbar.
      -  scrollWidth/scrollHeight – the width/height of the content including the scrolled out parts.
                                    Also includes paddings, but not the scrollbar.
      -  scrollLeft/scrollTop – width/height of the scrolled out part of the element, starting from its upper-left corner.
      -  All properties are read-only except scrollLeft/scrollTop. They make the browser scroll the element if changed.
*/

//----------------------------------------------------------------------------------------------------------------------------------------

// Window sizes and scrolling

// Width/height of the window
// From the DOM point of view, the root document element is document.documentElement.
// That element corresponds to <html>
console.log(document.documentElement.clientHeight); // height of the window
conosle.log(document.documentElement.clientWidth); // width of the window

// window.innerWidth/innerHeight
// If there’s a scrollbar occupying some space, clientWidth/clientHeight provide the width/height inside it.
// In other words, they return width/height of the visible part of the document, available for the content.
// And window.innerWidth/innerHeight ignore the scrollbar.
conosle.log(window.innerWidth); // full window width
conosle.log(document.documentElement.clientWidth); // window width minus the scrollbar

// Width/height of the document
/* documentElement.clientWidth/clientHeight and documentElement.scrollWidth/scrollHeight properties work well for regular elements.
   But for the whole page these properties do not work as intended. In Chrome/Safari/Opera if there’s no scroll,
   then documentElement.scrollHeight may be even less than documentElement.clientHeight! For regular elements that’s a nonsense.
*/
// To have a reliable result on the full document height, we should take the maximum of these properties
let scrollHeight = Math.max(
   document.body.scrollHeight,
   document.documentElement.scrollHeight,
   document.body.offsetHeight,
   document.documentElement.offsetHeight,
   document.body.clientHeight,
   document.documentElement.clientHeight,
);

alert('Full document height, with scrolled out part: ' + scrollHeight);

//----------------------------------------------------------------------------------------------------------------------------------------

// Get the current scroll
// Regular elements have their current scroll state in elem.scrollLeft/scrollTop.
// Most browsers provide documentElement.scrollLeft/Top for the document scroll,
// but Chrome/Safari/Opera have bugs and we should use document.body instead of document.documentElement there.

// We should use window.pageXOfset/pageYOffset
console.log('Current scroll from the top: ' + window.pageYOffset);
console.log('Current scroll from the left: ' + window.pageXOffset);

//----------------------------------------------------------------------------------------------------------------------------------------

// Scrolling

//--------------------REMEMBER-------------------
// To scroll the page from JavaScript, its DOM must be fully built.
// For instance, if we try to scroll the page from the script in <head>, it won’t work.

/* Regular elements can be scrolled by changing scrollTop/scrollLeft.
   We can do the same for the page:
      - For all browsers except Chrome/Safari/Opera: modify document.documentElement.scrollTop/Left.
      - In Chrome/Safari/Opera: use document.body.scrollTop/Left instead.
*/

// We should use window.scrollBy(x,y) and window.scrollTo(pageX,pageY).
// window.scrollBy(x,y) -  scrolls the page relative to its current position.
// For instance, scrollBy(0,10) scrolls the page 10px down.
window.scrollBy(0, 10);

//--------------------------------------------------------------------------------------------------

// window.scrollTo(pageX, oageY) -  scrolls the page relative to the document’s top-left corner.
// It’s like setting scrollLeft/scrollTop.
// To scroll to the very beginning, we can use
window.scrollTo(0, 0);

//--------------------------------------------------------------------------------------------------

// element.scrollIntoView(top).
/* The call to elem.scrollIntoView(top) scrolls the page to make elem visible. It has one argument:
      -  if top=true (that’s the default), then the page will be scrolled to make elem appear on the top of the window.
         The upper edge of the element is aligned with the window top.
      -  if top=false, then the page scrolls to make elem appear at the bottom.
         The bottom edge of the element is aligned with the window bottom.
*/

// Scrolls the page to make itself show at the window top:
this.scrollIntoView();

// scrolls the page to show it at the bottom:
this.scrollIntoView(false);

//----------------------------------------------------------------------------------------------------------------------------------------

// Forbid the scrolling
// If we need to make the document “unscrollable” it’s enough to set document.body.style.overflow = "hidden".
// The page will freeze on its current scroll.
document.body.style.overflow = 'hidden';

// to resume the scroll
document.body.style.overflow = '';

// The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free,
// and the content “jumps” to fill it.

//----------------------------------------------------------------------------------------------------------------------------------------

// Coordinates

/* Most JavaScript methods deal with one of two coordinate systems:
      - Relative to the window(or another viewport) top/left.
      - Relative to the document top/left.
*/

// Window coordinates: getBoundingClientRect
// Window coordinates start at the upper-left corner of the window
/* The method element.getBoundingClientRect() returns window coordinates for element as an object with properties:
      - top - Y-coordinate for the top element edge,
      - left – X-coordinate for the left element edge,
      - right – X-coordinate for the right element edge,
      - bottom – Y-coordinate for the bottom element edge.
*/
button.getBoundingClientRect(); // e.g {top:379.75, left:10, right:302.703125, bottom:397.75}

/* - Window coordinates do not take the scrolled out part of the document into account, they are calculated from the window’s upper-left corner.
   - Coordinates may be decimal fractions.
   - Coordinates may be negative.
   - Some browsers (like Chrome) provide additional properties, width and height of the element that invoked the method
     to getBoundingClientRect as the result. We can also get them by subtraction: height=bottom-top, width=right-left.
     
   - Coordinates right/bottom are different from CSS properties
     If we compare window coordinates versus CSS positioning, then there are obvious similarities to position:fixed.
     The positioning of an element is also relative to the viewport.
*/

//----------------------------------------------------------------------------------------------------------------------------------------

// elementFromPoint(x,y)
// The call to document.elementFromPoint(x, y) returns the most nested element at window coordinates (x, y).

// if we want highlights and outputs the tag of the element that is now in the middle of the window
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;
let element = document.elementFromPoint(centerX, centerY);

element.style.background = 'red';
alert(element.tagName);

//--------------------REMEMBER-------------------
// For out-of-window coordinates the elementFromPoint returns null
// (it works only if (x,y) are inside the visible area)

//----------------------------------------------------------------------------------------------------------------------------------------

// Using for position: fixed
// We can use getBoundingClientRect to get coordinates of an element with position: fixed, and then to show something near it.
<button id="coords-show-mark">Show message under</button>;

let element = document.getElementById('coords-show-mark');

function createMessageUnder(element, text) {
   let message = document.createElement('div');

   message.style.cssText = 'position: fixed; color: red';

   let coords = element.getBoundingClientRect();

   message.style.left = coords.left + 'px';
   message.style.top = coords.bottom + 'px';

   message.innerHTML = text;

   return message;
}

let message = createMessageUnder(element, 'Hello world');

document.body.append(message);
setTimeout(() => message.remove(), 5000);

//----------------------------------------------------------------------------------------------------------------------------------------

// Document coordinates
// Document-relative coordinates start from the upper-left corner of the document, not the window.
// In CSS, window coordinates correspond to position:fixed, while document coordinates are similar to position:absolute on top.
// For clarity we’ll call window coordinates (clientX,clientY) and document coordinates (pageX,pageY).

// When the page is not scrolled, then window coordinate and document coordinates are actually the same.
// And if we scroll it, then (clientX,clientY) change, because they are relative to the window, but (pageX,pageY) remain the same.

// Getting document coordinates
// pageY = clientY + height of the scrolled-out vertical part of the document.
// pageX = clientX + width of the scrolled-out horizontal part of the document.

// The function getCoords(elem) will take window coordinates from elem.getBoundingClientRect() and add the current scroll to them:
function getCoords(element) {
   let box = element.getBoundingClientRect();

   return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
   };
}

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - What's the scroll from the bottom?
// The elem.scrollTop property is the size of the scrolled out part from the top. How to get “scrollBottom” – the size from the bottom?
<div id="example">
   <h3>Introduction</h3>
   <p>
      This Ecma Standard is based on several originating technologies, the most
      well known being JavaScript (Netscape) and JScript (Microsoft). The
      language was invented by Brendan Eich at Netscape and first appeared in
      that company's Navigator 2.0 browser. It has appeared in all subsequent
      browsers from Netscape and in all browsers from Microsoft starting with
      Internet Explorer 3.0. The development of this Standard started in
      November 1996. The first edition of this Ecma Standard was adopted by the
      Ecma General Assembly of June 1997.
   </p>

   <p>
      That Ecma Standard was submitted to ISO/IEC JTC 1 for adoption under the
      fast-track procedure, and approved as international standard ISO/IEC
      16262, in April 1998. The Ecma General Assembly of June 1998 approved the
      second edition of ECMA-262 to keep it fully aligned with ISO/IEC 16262.
      Changes between the first and the second edition are editorial in nature.
   </p>
</div>;

let scrollBottom;
let element = document.getElementById('example');

function showScrollBottom() {
   scrollBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;
   console.log(scrollBottom);
}

let interval = setInterval(showScrollBottom, 2000);

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - What is the scrollbar width?
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// must put it in the document, otherwise sizes will be 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Place the ball in the field center
{
   /* <style>
   #field {
      width: 200px;
      border: 10px groove black;
      background-color: #00FF00;
      position: relative;
   }

   #ball {
      position: absolute;
   }
</style> */
}

<div id="field">
   <img src="https://en.js.cx/clipart/ball.svg" id="ball" /> . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . .
</div>;

let ball = document.getElementById('ball');
let field = document.getElementById('field');
let x = field.clientWidth / 2 - ball.width / 2 + 'px';
let y = field.clientHeight / 2 - ball.height / 2 + 'px';

ball.style.top = y;
ball.style.left = x;

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - The difference: CSS width versus clientWidth
// What’s the difference between getComputedStyle(elem).width and elem.clientWidth?

/* Differences:
      1. clientWidth is numeric, while getComputedStyle(elem).width returns a string with px at the end.
      2. getComputedStyle may return non-numeric width like "auto" for an inline element.
      3. clientWidth is the inner content area of the element plus paddings, while CSS width (with standard box-sizing)
         is the inner content area without paddings.
      4. If there’s a scrollbar and the browser reserves the space for it, some browser substract that space from CSS width
      (cause it’s not available for content any more), and some do not. The clientWidth property is always the same:
      scrollbar size is substracted if reserved.
*/

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Find window coordinates of the field
{
   /* <style>body {
      padding: 20px 0 0 20px;
      cursor: pointer;
   }

      #field {
      overflow: hidden;
      width: 200px;
      height: 150px;
      border-top: 10px solid black;
      border-right: 10px solid gray;
      border-bottom: 10px solid gray;
      border-left: 10px solid black;
      background-color: #00FF00;
      font: 10px/1.2 monospace;
   }
</style> */
}
<div id="coords">(click coordinates show up here)</div>;
<div id="field">
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . .
</div>;

let field = document.getElementById('field');
let coordsField = field.getBoundingClientRect();

alert('Top left out x: ' + coordsField.left + ' y: ' + coordsField.top);
alert('Bottom right out x: ' + coordsField.right + ' y: ' + coordsField.bottom);

let innerLeft = coordsField.left + field.clientLeft;
let innerTop = coordsField.top + field.clientTop;

alert('Top left in x: ' + innerLeft + ' y: ' + innerTop);

let innerRight = field.offsetLeft + field.clientLeft + field.clientWidth;
let innerBottom = field.offsetTop + field.clientTop + field.clientHeight;

// or
// let innerRight = coordsField.right - parseInt(getComputedStyle(field).borderRightWidth);
// let innerBottom = coordsField.bottom - parseInt(getComputedStyle(field).borderBottomWidth);

alert('Bottom right in x: ' + innerRight + ' y: ' + innerBottom);

document.onclick = function(e) {
   // shows click coordinates
   coords.innerHTML = e.clientX + ':' + e.clientY;
};

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Show a note near the element
{
   /* <style>
   .note {
      position: fixed;
      z-index: 1000;
      padding: 5px;
      border: 1px solid black;
      background: white;
      text-align: center;
      font: italic 14px serif;
   }
   
   blockquote {
      background: #f9f9f9;
      border-left: 10px solid #ccc;
      margin: 0 0 0 100px;
      padding: .5em 10px;
      quotes: "\201C""\201D""\2018""\2019";
      display: inline-block;
      white-space: pre;
   }
   
   blockquote:before {
      color: #ccc;
      content: open-quote;
      font-size: 4em;
      line-height: .1em;
      margin-right: .25em;
      vertical-align: -.4em;
   }
 </style> */
}

<p>
   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit sint
   atque dolorum fuga ad incidunt voluptatum error fugiat animi amet! Odio
   temporibus nulla id unde quaerat dignissimos enim nisi rem provident
   molestias sit tempore omnis recusandae esse sequi officia sapiente.
</p>;
<blockquote>
   Teacher: Why are you late? Student: There was a man who lost a hundred dollar
   bill. Teacher: That's nice. Were you helping him look for it? Student: No. I
   was standing on it.
</blockquote>;
<p>
   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit sint
   atque dolorum fuga ad incidunt voluptatum error fugiat animi amet! Odio
   temporibus nulla id unde quaerat dignissimos enim nisi rem provident
   molestias sit tempore omnis recusandae esse sequi officia sapiente.
</p>;

function showNote(anchor, position, html) {
   let message = document.createElement('div');

   message.className = 'note';
   message.innerHTML = html;

   document.body.append(message);

   positionAt(anchor, position, message);
}

function positionAt(anchor, position, message) {
   let coords = anchor.getBoundingClientRect();

   switch (position) {
      case 'top':
         message.style.left = coords.left + 'px';
         message.style.top = coords.top - message.offsetHeight + 'px';
         break;
      case 'bottom':
         message.style.top = coords.bottom + 'px';
         message.style.left = coords.left + 'px';
         break;
      case 'right':
         message.style.left = coords.right + 'px';
         message.style.top = coords.top + 'px';
         break;
   }
}

let blockquote = document.querySelector('blockquote');

showNote(blockquote, 'top', 'note above');
showNote(blockquote, 'right', 'note at the right');
showNote(blockquote, 'bottom', 'note below');

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Show a note near the element (absolute)
/* <style>
   .note {
      position: absolute;
   </style>
*/
function showNote(anchor, position, html) {
   let message = document.createElement('div');

   message.className = 'note';
   message.innerHTML = html;

   document.body.append(message);

   positionAt(anchor, position, message);
}

function positionAt(anchor, position, element) {
   let coords = getCoords(anchor);

   switch (position) {
      case 'top':
         element.style.left = coords.left + 'px';
         element.style.top = coords.top - element.offsetHeight + 'px';
         break;

      case 'right':
         element.style.left = coords.left + anchor.offsetWidth + 'px';
         element.style.top = coords.top + 'px';
         break;

      case 'bottom':
         element.style.left = coords.left + 'px';
         element.style.top = coords.top + anchor.offsetHeight + 'px';
         break;
   }
}

function getCoords(element) {
   let box = element.getBoundingClientRect();

   return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
   };
}

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 8 - Position the note inside (absolute)

function positionAt(anchor, position, element) {
   let coords = getCoords(anchor);

   switch (position) {
      case 'top-out':
         element.style.left = coords.left + 'px';
         element.style.top = coords.top - element.offsetHeight + 'px';
         break;

      case 'top-in':
         element.style.left = coords.left + 'px';
         element.style.top = coords.top + 'px';
         break;

      case 'right-out':
         element.style.left = coords.left + anchor.offsetWidth + 'px';
         element.style.top = coords.top + 'px';
         break;

      case 'right-in':
         element.style.left =
            coords.left - element.offsetWidth + anchor.offsetWidth + 'px';
         element.style.top = coords.top + 'px';
         break;

      case 'bottom-out':
         element.style.left = coords.left + 'px';
         element.style.top = coords.top + anchor.offsetHeight + 'px';
         break;

      case 'bottom-in':
         element.style.left = coords.left + 'px';
         element.style.top =
            coords.top - element.offsetHeight + anchor.offsetHeight + 'px';
         break;
   }
}

let blockquote = document.querySelector('blockquote');

showNote(blockquote, 'top-out', 'note above out');
showNote(blockquote, 'right-out', 'note at the right out');
showNote(blockquote, 'bottom-out', 'note below-out');

showNote(blockquote, 'top-in', 'note above-in');
showNote(blockquote, 'right-in', 'note at the right-in');
showNote(blockquote, 'bottom-in', 'note below-in');
