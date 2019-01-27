/*
Browser Object Model (BOM)
are additional objects provided by the browser (host environment) to work with everything except the document
For instance:
   -  The navigator object provides background information about the browser and the operating system.
      There are many properties, but the two most widely known are:
         navigator.userAgent – about the current browser, and
         navigator.platform – about the platform (can help to differ between Windows/Linux/Mac etc).
   -  The location object allows us to read the current URL and can redirect the browser to a new one.
         alert(location.href); // shows current URL
         if (confirm("Go to wikipedia?")) {
            location.href = "https://wikipedia.org"; // redirect the browser to another URL
         }

Document Object Model (DOM)
According to Document Object Model (DOM), every HTML-tag is an object. Nested tags are called “children” of the enclosing one.
Tags are called element nodes (or just elements). Nested tags become children of the enclosing ones. 

Autocorrection
If the browser encounters malformed HTML, it automatically corrects it when making DOM.
(browsers automatically process errors in the document, close tags and so on)
Tables always have <tbody>!

There are 12 node types. In practice we usually work with 4 of them:
   - document – the “entry point” into DOM.
   - element nodes – HTML-tags, the tree building blocks.
   - text nodes – contain text.
   - comments – sometimes we can put the information there, it won’t be shown, but JS can read it from the DOM.

The topmost tree nodes are available directly as document properties:
   <html> = document.documentElement
            The topmost document node is document.documentElement. That’s DOM node of <html> tag.
   <body> = document.body
            Another widely used DOM node is the <body> element – document.body.
   <head> = document.head
            The <head> tag is available as document.head.

There’s a catch: document.body can be null
A script cannot access an element that doesn’t exist at the moment of running.
In particular, if a script is inside <head>, then document.body is unavailable, because the browser did not read it yet.
*/

//--------------------REMEMBER--------------------
// In the DOM world null means “doesn’t exist”

//-----------------------------------------------------------------------------------------------------------------------------------------

// Children: childNodes, firstChild, lastChild
/*    Child nodes (or children) – elements that are direct children. In other words, they are nested exactly in the given one.
      Descendants – all elements that are nested in the given one, including children, their children and so on.
*/

if (elem.hasChildNodes() === true) {
   elem.childNodes[0] === elem.firstChild; // true
   elem.childNodes[elem.childNodes.length - 1] === elem.lastChild; // true
}

// DOM collections
/*    childNodes is a special array-like object
   1. We can use for..of to iterate over it:
      for (let node of document.body.childNodes) {
         alert(node); // shows all nodes from the collection
      }

   2. Array methods won’t work, because it’s not an array:
      alert(document.body.childNodes.filter); // undefined (there's no filter method)
*/

//--------------------REMEMBER--------------------
/*    - DOM collections are read-only
      - DOM collections are live
      - Don't use for..in to loop over collections      
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// Siblings and the parent
/* Siblings are nodes that are children of the same parent.
   The parent is available as parentNode.
   The next node in the same parent (next sibling) is nextSibling, and the previous one is previousSibling.
*/

// Element-only navigation
/* Navigation properties listed above refer to all nodes.
   For instance, in childNodes we can see both text nodes, element nodes, and even comment nodes if there exist.

   The links are similar to those given above, just with Element word inside:
      - children – only those children that are element nodes.
      - firstElementChild, lastElementChild – first and last element children.
      - previousElementSibling, nextElementSibling – neighbour elements.
      - parentElement – parent element.
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// Tables

/* The <table> element supports (in addition to the given above) these properties:
      - table.rows – the collection of <tr> elements of the table.
      - table.caption/tHead/tFoot – references to elements <caption>, <thead>, <tfoot>.
      - table.tBodies – the collection of <tbody> elements (can be many according to the standard).
   <thead>, <tfoot>, <tbody> elements provide the rows property:
      - tbody.rows – the collection of <tr> inside.
   <tr>:
      - tr.cells – the collection of <td> and <th> cells inside the given <tr>.
      - tr.sectionRowIndex – the position (index) of the given <tr> inside the enclosing <thead>/<tbody>/<tfoot>.
      - tr.rowIndex – the number of the <tr> in the table as a whole (including all table rows).
   <td> and <th>:
      - td.cellIndex – the number of the cell inside the enclosing <tr>.
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// Summary

/*    Given a DOM node, we can go to its immediate neighbours using navigation properties.
   There are two main sets of them:
      -  For all nodes:
         parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.
      -  For element nodes only:
         parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling.
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// Searching: getElement and querySelector

// If an element has the id attribute, then there’s a global variable by the name from that id.
// We can access the element like this

<div id='elem'>
   <div id='elem-content'>Element</div>
</div>

console.log(elem);
console.log(window.elem);
console.log(window['elem-content']);

// but if we declare the same-named variable...
<div id="elem"></div>

let elem = 5;

console.log(elem); // 5, the variable overrides the element

//-------------------------------------------------------------------------------

// document.getElementById(id)

//--------------------REMEMBER--------------------
// The method getElementById that can be called only on document object. 

console.log(document.getElementById(elem)); // that's work

//-------------------------------------------------------------------------------

// element.getElementsByTagName(tagName)
//    looks for elements with the given tag and returns the collection of them.
//    The tag parameter can also be a star "*" for “any tags”.

console.log(document.getElementsByTagName('div'));

//--------------------REMEMBER--------------------
// This method is callable in the context of any DOM element.
// It returns a collection, not an element

<table id="table">
   <tr>
      <td>Your age:</td>
      <td>
         <label>
            <input type="radio" name="age" value="young" checked /> less than 18
         </label>
      </td>
   </tr>
</table>

console.log(table.getElementsByTagName('label'));
console.log(table.getElementsByTagName('label').value); // doesn't work, it's a collection!
console.log(table.getElementsByTagName('input')[0].value); // that's work

//-------------------------------------------------------------------------------

// rarely used
// element.getElementsByClassName(className)
// document.getElementsByName(name)

<form name="my-form">
   <div class="article">Article</div>
   <div class="long article">Long article</div>
</form>

let form = document.getElementsByName('my-form')[0];

let articles = form.getElementsByClassName('article');
console.log(articles.length); // 2, found two elements with class "article"

//-----------------------------------------------------------------------------------------------------------------------------------------

// element.querySelectorAll
// The call to elem.querySelectorAll(css) returns all elements inside elem matching the given CSS selector.
<ul>
   <li>The</li>
   <li>test</li>
</ul>
<ul>
   <li>has</li>
   <li>passed</li>
</ul>

<script>
   let elements = document.querySelectorAll('ul > li:last-child');

   for (let elem of elements) {
      console.log(elem.innerHTML) // "test", "passed"
   }
</script>

//-------------------------------------------------------------------------------

// element.querySelector(css)
// The call to elem.querySelector(css) returns the first element for the given CSS selector.

//-----------------------------------------------------------------------------------------------------------------------------------------

// Matches
// element.matches(css)
// The element.matches(css) does not look for anything, it merely checks if elem matches the given CSS-selector. It returns true or false.
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
   for (let elem of document.body.children) {
      (function () {
         if (elem.matches('a[href$="zip"]')) {
         console.log("The archive reference: " + elem.href )
       }
      })()
   }
</script>

//-----------------------------------------------------------------------------------------------------------------------------------------

// CLosest
// element.closest(css)
// The method element.closest(css) looks the nearest ancestor that matches the CSS-selector.
// The elem itself is also included in the search.
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  console.log(chapter.closest('.book')); // UL
  console.log(chapter.closest('.contents')); // DIV
  console.log(chapter.closest('h1')); // null, because h1 is not an ancestor
</script>

//-----------------------------------------------------------------------------------------------------------------------------------------

// Live collections
// All methods "getElementsBy*" return a live collection.
// Such collections always reflect the current state of the document and “auto-update” when it changes.
// In contrast, querySelectorAll returns a static collection. It’s like a fixed array of elements.
<div>First div</div>

<script>
  let divsBy = document.getElementsByTagName('div');
  let divsAll = document.querySelectorAll('div');
  console.log(divsBy.length); // 1
  console.log(divsAll.length); // 1
</script>

<div>Second div</div>

<script>
  console.log(divsBy.length); // 2
  console.log(divsAll.length); // 1
</script>

//-----------------------------------------------------------------------------------------------------------------------------------------

// Summary

/*    There are 6 main methods to search for nodes in DOM:

Method	               Searches by...	   Can call on an element?	   Live?
getElementById	         id	               -	                        -
getElementsByName	      name	            -	                        ✔
getElementsByTagName	   tag or '*'	      ✔	                        ✔
getElementsByClassName	class	            ✔	                        ✔
querySelector	         CSS-selector	   ✔	                        -
querySelectorAll	      CSS-selector	   ✔	                        -

*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// DOM Nodes
// Each DOM node belongs to the corresponding built-in class.
// The root of the hierarchy is EventTarget, that is inherited by Node, and other DOM nodes inherit from it.
/*    The classes are:
      -  EventTarget – is the root “abstract” class. Objects of that class are never created. It serves as a base, so that all DOM nodes
         support so-called “events”
      -  Node – is also an “abstract” class, serving as a base for DOM nodes. It provides the core tree functionality: parentNode,
         nextSibling, childNodes and so on (they are getters). Objects of Node class are never created. But there are concrete node classes
         that inherit from it, namely: Text for text nodes, Element for element nodes and more exotic ones like Comment for comment nodes.
      -  Element – is a base class for DOM elements. It provides element-level navigation like nextElementSibling, children and searching
         methods like getElementsByTagName, querySelector. In the browser there may be not only HTML, but also XML and SVG documents.
         The Element class serves as a base for more specific classes: SVGElement, XMLElement and HTMLElement.
      -  HTMLElement – is finally the basic class for all HTML elements. It is inherited by various HTML elements:
            HTMLInputElement – the class for <input> elements,
            HTMLBodyElement – the class for <body> elements,
            HTMLAnchorElement – the class for <a> elements
…and so on, each tag has its own class that may provide specific properties and methods. */

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - How to access?
<html>
   <body>
      <div>Users:</div>
      <ul>
         <li>John</li>
         <li>Pete</li>
      </ul>
   </body>
</html>

/* 1. The <div> DOM node?
      document.body.firstElementChild
      document.body.children[0]
      document.body.childNodes[1] // because the first node is space
   2. The <ul> DOM node?
      document.body.children[1]
      document.body.lastElementChild
   3. The second <li> (with Pete)?
      document.body.lastElementChild.lastElementChild
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - The sibling question
/*    If elem – is an arbitrary DOM element node…
   1. Is it true that elem.lastChild.nextSibling is always null?
      Yes, true. The element elem.lastChild is always the last one, it has no nextSibling, so if there are children, then yes.
   2. Is it true that elem.children[0].previousSibling is always null ?
      No, wrong, because elem.children[0] is the first child among elements. But there may be non-element nodes before it.
      So previousSibling may be a text node.
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Select all diagonal cells
<table>
   <tr>
      <td>1:1</td>
      <td>2:1</td>
      <td>3:1</td>
      <td>4:1</td>
      <td>5:1</td>
   </tr>
   <tr>
      <td>1:2</td>
      <td>2:2</td>
      <td>3:2</td>
      <td>4:2</td>
      <td>5:2</td>
   </tr>
   <tr>
      <td>1:3</td>
      <td>2:3</td>
      <td>3:3</td>
      <td>4:3</td>
      <td>5:3</td>
   </tr>
   <tr>
      <td>1:4</td>
      <td>2:4</td>
      <td>3:4</td>
      <td>4:4</td>
      <td>5:4</td>
   </tr>
   <tr>
      <td>1:5</td>
      <td>2:5</td>
      <td>3:5</td>
      <td>4:5</td>
      <td>5:5</td>
   </tr>
</table>

<script>
   let table = document.body.firstElementChild;
      
   for (let i = 0; i < table.rows.length; i++) {
      td = table.rows[i].cells[i];
      td.style.backgroundColor = 'red';
   }
</script>

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Search for elements
/* How to find?

1. The table with id="age-table".
      document.getElementById('age-table')
2. All label elements inside that table (there should be 3 of them).
      let table = document.getElementById('age-table');
      table.getElementsByTagName('label')
      document.querySelectorAll('#age-table label')
3. The first td in that table (with the word “Age”).
      table.getElementsByTagName('td')[0]
      table.rows[0].cells[0]
      table.querySelector('td')
4. The form with the name search.
      let search = document.getElementsByName('search')[0]
      document.querySelector('form[name="search"]')
5. The first input in that form.
      search.getElementByTagName('input')[0]
      form.querySelector('input')
6. The last input in that form.
      let inputs = search.querySelectorAll('input')
      inputs[inputs.length-1]
*/
