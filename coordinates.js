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
      <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
   </article>
</main>

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
function isHidden(elem) { // isHidden returns true for elements that are on-screen, but have zero sizes (like an empty <div>)
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

<span id="elem">Hello!</span>

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

// TASK 1 - What's the scroll from the bottom?
// The elem.scrollTop property is the size of the scrolled out part from the top. How to get “scrollBottom” – the size from the bottom?
<div id="example">
   <h3>Introduction</h3>
   <p>
      This Ecma Standard is based on several originating technologies, the most well known being JavaScript (Netscape) and JScript
      (Microsoft). The language was invented by Brendan Eich at Netscape and first appeared in that company's Navigator 2.0 browser.
      It has appeared in all subsequent browsers from Netscape and in all browsers from Microsoft starting with Internet Explorer 3.0.
      The development of this Standard started in November 1996. The first edition of this Ecma Standard was adopted by the
      Ecma General Assembly of June 1997.
   </p>

   <p>
      That Ecma Standard was submitted to ISO/IEC JTC 1 for adoption under the fast-track procedure, and approved as international standard
      ISO/IEC 16262, in April 1998. The Ecma General Assembly of June 1998 approved the second edition of ECMA-262 to keep
      it fully aligned with ISO/IEC 16262. Changes between the first and the second edition are editorial in nature.
   </p>
</div>

let scrollBottom;
let element = document.getElementById('example');

function showScrollBottom() {
   scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
   console.log(scrollBottom)
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
{/* <style>
   #field {
      width: 200px;
      border: 10px groove black;
      background-color: #00FF00;
      position: relative;
   }

   #ball {
      position: absolute;
   }
</style> */}

<div id="field">
   <img src="https://en.js.cx/clipart/ball.svg" id="ball" /> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   . . . . . . . . . . . . . . . . . . . . . . . . . . .
</div>

let ball = document.getElementById('ball');
let field = document.getElementById('field')
let x = 1/2*field.clientWidth - 1/2*ball.width + 'px';
let y = 1/2*field.clientHeight - 1/2*ball.height + 'px';

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
