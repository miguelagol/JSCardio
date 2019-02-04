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

console.log(elem); // <div id='elem'><div id='elem-content'>Element</div></div>
console.log(window.elem); // <div id='elem'><div id='elem-content'>Element</div></div>
console.log(window['elem-content']); // <div id='elem-content'>Element</div>

// but if we declare the same-named variable...
<div id="elem"></div>

let elem = 5;

console.log(elem); // 5, the variable overrides the element

//-------------------------------------------------------------------------------

// document.getElementById(id)

//--------------------REMEMBER--------------------
// The method getElementById that can be called only on document object. 

console.log(document.getElementById('elem')); // that's work

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

console.log(table.getElementsByTagName('label')); // HTMLCollection [label] 0: labellength: 1__proto__: HTMLCollection
console.log(table.getElementsByTagName('label').value); // undefined, doesn't work, it's a collection!
console.log(table.getElementsByTagName('input')[0].value); //young, that's work

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
<body>
   <ul>
      <li>The</li>
      <li>test</li>
   </ul>
   <ul>
      <li>has</li>
      <li>passed</li>
   </ul>
</body>

let elements = document.querySelectorAll('ul > li:last-child');

for (let elem of elements) {
   console.log(elem.innerHTML) // "test", "passed"
}

//-------------------------------------------------------------------------------

// element.querySelector(css)
// The call to elem.querySelector(css) returns the first element for the given CSS selector.

//-----------------------------------------------------------------------------------------------------------------------------------------

// Matches
// element.matches(css)
// The element.matches(css) does not look for anything, it merely checks if elem matches the given CSS-selector. It returns true or false.
<body>
   <a href="http://example.com/file.zip">...</a>
   <a href="http://ya.ru">...</a>
</body>

for (let elem of document.body.children) {
   (function () {
      if (elem.matches('a[href$="zip"]')) {
         console.log("The archive reference: " + elem.href); // The archive reference: http://example.com/file.zip
      }
   })()
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// Closest
// element.closest(css)
// The method element.closest(css) looks the nearest ancestor that matches the CSS-selector.
// The elem itself is also included in the search.
<body>
   <h1>Contents</h1>
   <div class="contents">
      <ul class="book">
         <li class="chapter">Chapter 1</li>
         <li class="chapter">Chapter 1</li>
      </ul>
   </div>
</body>

let chapter = document.querySelector('.chapter');

console.log(chapter.closest('.book')); // UL
console.log(chapter.closest('.contents')); // DIV
console.log(chapter.closest('h1')); // null, because h1 is not an ancestor

//-----------------------------------------------------------------------------------------------------------------------------------------

// Live collections
// All methods "getElementsBy*" return a live collection.
// Such collections always reflect the current state of the document and “auto-update” when it changes.
// In contrast, querySelectorAll returns a static collection. It’s like a fixed array of elements.
<div>First div</div>

let divsBy = document.getElementsByTagName('div');
let divsAll = document.querySelectorAll('div');
console.log(divsBy.length); // 1
console.log(divsAll.length); // 1

<div>Second div</div>

console.log(divsBy.length); // 2
console.log(divsAll.length); // 1

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
…and so on, each tag has its own class that may provide specific properties and methods.
*/
console.log(document.body); // [object HTMLBodyElement]

// We can use instanceof to check the inheritance:
console.log(document.body instanceof HTMLBodyElement); // true
console.log(document.body instanceof HTMLElement); // true
console.log(document.body instanceof Element); // true
console.log(document.body instanceof Node); // true
console.log(document.body instanceof EventTarget); // true

//--------------------REMEMBER--------------------
/* console.dir(elem) versus console.log(elem)
   Most browsers support two commands in their developer tools: console.log and console.dir.
   They output their arguments to the console. For JavaScript objects these commands usually do the same.

   But for DOM elements they are different:
      - console.log(elem) shows the element DOM tree.
      - console.dir(elem) shows the element as a DOM object, good to explore its properties.
*/

// IDL in the spec
/* In the specification, classes are described not using JavaScript, but a special INTERFACE DESCRIPTION LANGUAGE (IDL)
   In IDL all properties are prepended with their types. For instance, DOMString, boolean and so on.
*/

/* Define HTMLInputElement
The colon ":" means that HTMLInputElement inherits from HTMLElement
*/
/* interface HTMLInputElement: HTMLElement {
      // here go properties and methods of <input> elements
      // "DOMString" means that the value of these properties are strings
      attribute DOMString accept; 
      attribute DOMString alt;
      attribute DOMString autocomplete;
      attribute DOMString value;

      // boolean value property (true/false)
      attribute boolean autofocus;

      // now the method: "void" means that the method returns no value
      void select();
   }
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// the "nodeType" property
/*    The nodeType property provides an old-fashioned way to get the “type” of a DOM node.
   It has a numeric value:
      - elem.nodeType == 1 for element nodes,
      - elem.nodeType == 3 for text nodes,
      - elem.nodeType == 9 for the document object,
      - there are few other values in the specification.
*/
let elem = document.body;

// let's examine what it is?
alert(elem.nodeType); // 1 => element

// and the first child is...
alert(elem.firstChild.nodeType); // 3 => text

// for the document object, the type is 9
alert(document.nodeType); // 9 => document

// In modern scripts, we can use instanceof and other class-based tests to see the node type, but sometimes nodeType may be simpler.
// We can only read nodeType, not change it.

//-----------------------------------------------------------------------------------------------------------------------------------------

// Tag: nodeName and tagName
alert(document.body.nodeName); // BODY
alert(document.body.tagName); // BODY

/* The difference between tagName and nodeName:
      - The tagName property exists only for Element nodes.
      - The nodeName is defined for any Node:
         - for elements it means the same as tagName.
         - for other node types (text, comment, etc.) it has a string with the node type.
*/

// for comment
alert(document.body.firstChild.tagName); // undefined (no element)
alert(document.body.firstChild.nodeName); // #comment

// for document
alert(document.tagName); // undefined (not element)
alert(document.nodeName); // #document

//--------------------REMEMBER--------------------
// The tag name is always uppercase except XHTML
// In HTML mode tagName/nodeName is always uppercased: it’s BODY either for <body> or <BoDy>.
// In XML mode the case is kept “as is”. Nowadays XML mode is rarely used.

//-----------------------------------------------------------------------------------------------------------------------------------------

// innerHTML: the contents
//The innerHTML property allows to get the HTML inside the element as a string. We can also modify it
<body>
   <p>A paragraph</p>
   <div>A div</div>
</body>;

alert(document.body.innerHTML); // read the current contents
document.body.innerHTML = 'The new BODY!'; // replace it

//--------------------REMEMBER--------------------
// If innerHTML inserts a <script> tag into the document – it doesn’t execute.

/* Beware: “innerHTML+=” does a full overwrite
      1. The old contents is removed.
      2. The new innerHTML is written instead (a concatenation of the old and the new one).
      (As the content is “zeroed-out” and rewritten from the scratch, all images and other resources will be reloaded.)
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// outerHTML: full HTML of the element
// The outerHTML property contains the full HTML of the element. That’s like innerHTML plus the element itself.
<div id="elem">Hello <b>World</b></div>

alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
alert(elem.innerHTML); // Hello World

//--------------------REMEMBER--------------------
/* Beware: unlike innerHTML, writing to outerHTML does not change the element. Instead, it replaces it as a whole in the outer context. */

<div>Hello, world!</div>

let div = document.querySelector('div');

// replace div.outerHTML with <p>...</p>
div.outerHTML = '<p>A new element!</p>'; // (*)

// Wow! The div is still the same!
alert(div.outerHTML); // <div>Hello, world!</div>

// In the line (*) we take the full HTML of <div>...</div> and replace it by <p>...</p>.
// In the outer document we can see the new content instead of the <div>. But the old div variable is still the same.
// The outerHTML assignment does not modify the DOM element, but extracts it from the outer context and inserts
// a new piece of HTML instead of it!!!

//-----------------------------------------------------------------------------------------------------------------------------------------

// nodeValue/data: text node content
// The innerHTML property is only valid for element nodes.
// Other node types have their counterpart: nodeValue and data properties.
// These two are almost the same for practical use, there are only minor specification differences.
<body>
   Hello
   {/* <!-- Comment --> */}
</body>

let text = document.body.firstChild;
alert(text.data); // Hello

let comment = text.nextSibling;
alert(comment.data); // Comment

// For text nodes we can imagine a reason to read or modify them, but why comments? Usually, they are not interesting at all,
// but sometimes developers embed information into HTML in them, like this:
<body>
   {/* <!-- if isAdmin --> */}
   <div>Welcome, Admin!</div>
   {/* <!-- /if --> */}
</body>;
// …Then JavaScript can read it and process embedded instructions.

//-----------------------------------------------------------------------------------------------------------------------------------------

// textContent: pure text
// The textContent provides access to the text inside the element: only text, minus all <tags>.
<div id="news">
   <h1>Headline!</h1>
   <p>Martians attack people!</p>
</div>

alert(news.textContent); // Headline! Martians attack people!

//------------------------------------------------------------------------------------------------

// innerHTML vs textContent
/*    - With innerHTML we’ll have it inserted “as HTML”, with all HTML tags.
      - With textContent we’ll have it inserted “as text”, all symbols are treated literally.
*/
<body>
   <div id="elem1"></div>
   <div id="elem2"></div>
</body>

let name = prompt("What's your name?", "<b>Winnie-the-pooh!</b>");

elem1.innerHTML = name; // Winnie-the-pooh!
elem2.textContent = name; // <b>Winnie-the-pooh!</b>

//-----------------------------------------------------------------------------------------------------------------------------------------

// the "hidden" property
// The “hidden” attribute and the DOM property specifies whether the element is visible or not.
<body>
   <div>Both divs below are hidden</div>
   <div hidden>With the attribute "hidden"</div>
   <div id="elem">JavaScript assigned the property "hidden"</div>
</body>

elem.hidden = true;

<div id="elem">A blinking element</div>

setInterval(() => elem.hidden = !elem.hidden, 1000);

//-----------------------------------------------------------------------------------------------------------------------------------------

// More properties
/*  DOM elements also have additional properties, many of them provided by the class:
   -  value – the value for <input>, <select> and <textarea> (HTMLInputElement, HTMLSelectElement…).
   -  href – the “href” for <a href="..."> (HTMLAnchorElement).
   -  id – the value of “id” attribute, for all elements (HTMLElement).
   -  …and much more…
*/

// Most standard HTML attributes have the corresponding DOM property, and we can access it like that.
<input type="text" id="elem" value="value" />

alert(elem.type); // text
alert(elem.id); // elem
alert(elem.value); // value

//-----------------------------------------------------------------------------------------------------------------------------------------

// DOM Attributes and Properties
/* When the browser loads the page, it “reads” (another word: “parses”) the HTML and generates DOM objects from it.
   For element nodes, most standard HTML attributes automatically become properties of DOM objects.
*/

// DOM properties
// DOM nodes are regular JavaScript objects. We can alter them.
//    - They can have any value.
//    - They are case-sensitive (write elem.nodeType, not elem.NoDeTyPe).

// we can, create new property, add a method
document.body.myData = {
   name: 'Cesar',
   title: 'Imperator',
   sayTagName() {
      alert(this.tagName);
   }
};

alert(document.body.myData.title); // Imperator

// We can also modify built-in prototypes like Element.prototype and add new methods to all elements:
Element.prototype.sayHi = function () {
   alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY

//------------------------------------------------------------------------------------------------

// HTML Attributes
/* When the browser parses the HTML to create DOM objects for tags,
   it recognizes standard attributes and creates DOM properties from them.
   So when an element has id or another standard attribute, the corresponding property gets created.
   But that doesn’t happen if the attribute is non-standard.
*/
<body id="test" something="non-standard">
   <script>
      alert(document.body.id); // test
      alert(document.body.something); // undefined
   </script>
</body>;

// standard attribute for one element can be unknown for another one.
// For instance, "type" is standard for <input> (HTMLInputElement), but not for <body> (HTMLBodyElement).
/* All attributes are accessible by using the following methods:
      - elem.hasAttribute(name) – checks for existence.
      - elem.getAttribute(name) – gets the value.
      - elem.setAttribute(name, value) – sets the value.
      - elem.removeAttribute(name) – removes the attribute.
*/
<body id="body" type="non-standard">
   <input id="input" type="text" />
   <script>
      alert(input.type); // text
      alert(body.type); // undefined
      alert(body.getAttribute('type')); // non-standard
   </script>
</body>;

// We can read all attributes using elem.attributes:
// a collection of objects that belong to a built-in Attr class

//--------------------REMEMBER--------------------
/* HTML attributes have the following features:
      - Their name is case-insensitive (id is same as ID).
      - Their values are always strings.
*/
<body>
   <div id="element" about="Elephant"></div>
   <script>
      alert(element.getAttribute('About')); // Elephant

      element.setAttribute('Test', 123);

         alert(element.outerHTML); {/* <div id="elem" about="Elephant" test="123"></div> */}

      for (let attribute of element.attributes) {
         alert(`${attribute.name} = ${attribute.value}`) /* id = element, about = Elephant, test = 123 */
      }
   </script>
</body>;

//------------------------------------------------------------------------------------------------

// Property-attribute synchronization
// When a standard attribute changes, the corresponding property is auto-updated, and vice versa.
<body>
   <input />
   <script>
      let input = document.querySelector('input');

   // attribute => property
      input.setAttribute('id', 'id');
      alert(input.id); // id

   // property => attribute
      input.id = 'newId';
      alert(input.getAttribute('id')); // newId

   // there are exclusions
   // attribute => property
      input.setAttribute('value', 'text');
      alert(input.value); // text

   // NOT property => attribute
      input.value = 'newValue';
      alert(input.getAttribute('value')); // text
   </script>
</body>;

//------------------------------------------------------------------------------------------------

// DOM Properties are typed
// DOM properties are not always strings
<body>
   <input id="input" type="checkbox" checked /> checkbox
      <div id="div" style="color: red; font-size: 120%">Hello</div>
   <a id="a" href="#hello">link</a>
   <script>
      // The checked attribute is a string, but the input.checked property (for checkboxes) is a boolean
      alert(input.getAttribute('checked')); // '' empty string
      alert(input.checked); // true

      // The style attribute is a string, but the style property is an object
      alert(div.getAttribute('style')); // color: red; font-size: 120%
      alert(div.style); // [object CSSStyleDeclaration]
      alert(div.style.color); // red

      //the href DOM property is always a full URL, even if the attribute contains a relative URL or just a #hash.
      alert(a.getAttribute('href')); // hello
      alert(a.href); // http://site.com/page#hello
   </script>
</body>;

//------------------------------------------------------------------------------------------------

// Non-standard attributes, dataset
// Sometimes non-standard attributes are used to pass custom data from HTML to JavaScript,
// or to “mark” HTML-elements for JavaScript.
<body>
   <div show-info="name"></div>
   <div show-info="age"></div>
</body>

let user = {
   name: 'Jack',
   age: 32,
};

let divs = document.querySelectorAll('[show-info]');
for (let div of divs) {
   let info = div.getAttribute('show-info');
   div.innerHTML = user[info]
}

// we can use it to style an element
{/* <style>
   .order[order-state="new"] {
      color: red;
   }
   .order[order-state="old"] {
      color: blue
   }
</style> */}
<body>
   <div class="order" order-state="new">
      New order
      </div>
   <div class="order" order-state="old">
      Old order
      </div>
</body>;

// All attributes starting with “data-” are reserved for programmers’ use.
// They are available in the dataset property.
<body data-about="Elephants">
   <script>
      alert(document.body.dataset.about); // Elephants
   </script>
</body>;
// Multiword attributes like data-order-state become camel-cased: dataset.orderState.

//------------------------------------------------------------------------------------------------

// Summary
/*    Attributes – is what’s written in HTML.
      Properties – is what’s in DOM objects.
 
      Properties	                                 Attributes
Type	Any value, standard properties have types    A string
      described in the spec	
Name	Name is case-sensitive                       Name is not case-sensitive
 
Methods to work with attributes are:
   - elem.hasAttribute(name) – to check for existence.
   - elem.getAttribute(name) – to get the value.
   - elem.setAttribute(name, value) – to set the value.
   - elem.removeAttribute(name) – to remove the attribute.
   - elem.attributes is a collection of all attributes.
*/

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
</html>;

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

let table = document.body.firstElementChild;

for (let i = 0; i < table.rows.length; i++) {
   td = table.rows[i].cells[i];
   td.style.backgroundColor = 'red';
}

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

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Count descendants
/* Write the code that for each <li> shows:
   -  What’s the text inside it (without the subtree)
   -  The number of nested <li> – all descendants, including the deeply nested ones.
*/
<ul>
   <li>Animals
         <ul>
         <li>Mammals
               <ul>
               <li>Cows</li>
               <li>Donkeys</li>
               <li>Dogs</li>
               <li>Tigers</li>
            </ul>
         </li>
         <li>Other
               <ul>
               <li>Snakes</li>
               <li>Birds</li>
               <li>Lizards</li>
            </ul>
         </li>
      </ul>
   </li>
   <li>Fishes
         <ul>
         <li>Aquarium
               <ul>
               <li>Guppy</li>
               <li>Angelfish</li>
            </ul>
         </li>
         <li>Sea
               <ul>
               <li>Sea trout</li>
            </ul>
         </li>
      </ul>
   </li>
</ul>

for (let li of document.querySelectorAll('li')) {
   let first = li.firstChild.data;
   let count = li.getElementsByTagName('li').length;
   alert(first + ': ' + count);
}

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - What's in the nodeType?
<html>
   <body>
      <script>
         alert(document.body.lastChild.nodeType);
      </script>
   </body>
</html>

// At the time of <script> execution the last DOM node is exactly <script>, because the browser did not process the rest of the page yet.
// So the result is 1 (element node).

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 8 - Tag in comment.
// What does this code show?
let body = document.body;

body.innerHTML = "<!--" + body.tagName + "-->";

alert(body.firstChild.data); // what's here?

// BODY
/* 1. The content of <body> is replaced with the comment. The comment is <!--BODY-->, because body.tagName == "BODY".
      As we remember, tagName is always uppercase in HTML.
   2. The comment is now the only child node, so we get it in body.firstChild.
   3. The data property of the comment is its contents (inside <!--...-->): "BODY".
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 9 - Where's the "document" in the hierarchy?
/* 1. Which class does the document belong to?
      document is an instance of HTMLDocument class.
      alert(document); // [object HTMLDocument]
      alert(document.constructor.name); // HTMLDocument

   2. What’s its place in the DOM hierarchy?
   3. Does it inherit from Node or Element, or maybe HTMLElement?
      As we know, methods of a class are in the prototype of the constructor. For instance,
      HTMLDocument.prototype has methods for documents.
      Also, there’s a reference to the constructor function inside the prototype:
      alert(HTMLDocument.prototype.constructor === HTMLDocument); // true

      For built-in classes in all prototypes there’s a constructor reference,
      and we can get constructor.name to see the name of the class.
      alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
      alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
      alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
*/

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 10 - Get the attribute
// Write the code to select the element with data-widget-name attribute from the document and to read its value.
<div data-widget-name="menu">Choose the genre</div>

let div = document.querySelector('[data-widget-name]');
alert(div.getAttribute('data-widget-name'))
// or
alert(div.dataset.widgetName);

//-----------------------------------------------------------------------------------------------------------------------------------------

// TASK 11 - Make external links orange
/* A link is external if:
      - Its href has :// in it
      - But doesn’t start with http://internal.com.
*/
{/* <style>
      .external {
         color: orange
      }
   </style> */}
<body>
   <a name="list">the list</a>
   <ul>
      <li><a href="http://google.com">http://google.com</a></li>
      <li><a href="/tutorial">/tutorial.html</a></li>
      <li><a href="local/path">local/path</a></li>
      <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
      <li><a href="http://nodejs.org">http://nodejs.org</a></li>
      <li><a href="http://internal.com/test">http://internal.com/test</a></li>
   </ul>
</body>

let anchors = document.querySelectorAll("[href*='://']:not([href^='http://internal.com'])");
for (let anchor of anchors) {
   anchor.setAttribute('class', 'external')
}
