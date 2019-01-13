/* 
Document Object Model (DOM)
According to Document Object Model (DOM), every HTML-tag is an object. Nested tags are called “children” of the enclosing one.
Tags are called element nodes (or just elements). Nested tags become children of the enclosing ones. 

Tables always have <tbody>

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
  
let table = document.body.firstElementChild;

for (let i = 0; i < table.rows.length; i++) {
   td = table.rows[i].cells[i];
   td.style.backgroundColor = 'red';
}