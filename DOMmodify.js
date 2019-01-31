// Creating an element

// document.createElement(tag)
let div = document.createElement('div');

// document.createTextNode(text)
let textNode = document.createTextNode('Here I am');

//----------------------------------------------------------------------------------------------------------------------------------------

// Insertion methods
// To insert a node into a parent element we can use these methods:

// parentElem.appendChild(node)
// Appends node as the last child of parentElem
(
   <ol id="list">
      <li>0</li>
      <li>1</li>
   </ol>
)
let newLi = document.createElement('li');
newLi.innerHTML = 'Hello';
list.appendChild(newLi);
/* 1. 0
   2. 1
   3. Hello
*/

// parentElem.insertBefore(node, nextSibling)
// Inserts node before nextSibling into parentElem
(
   <ol id="list2">
      <li>0</li>
      <li>1</li>
   </ol>
)
let newLi2 = document.createElement('li');
newLi2.innerHTML = 'Hello';
list2.insertBefore(newLi2, list2.children[0]);
/* 1. Hello
   2. 0
   3. 1
*/

// parentElem.replaceChild(node, oldChild)


// prepend/append/before/after
//----------------------------------------------------------------------------------------------------------------------------------------

// Cloning nodes

//----------------------------------------------------------------------------------------------------------------------------------------

//Removal methods

//----------------------------------------------------------------------------------------------------------------------------------------

// document.write



let messageDiv = document.createElement('div');
messageDiv.class = 'alert alert-success';
messageDiv.innerHTML = "<strong>Hi there!</strong> You're read an important message."
document.body.appendChild(messageDiv)

//----------------------------------------------------------------------------------------------------------------------------------------

// Summary

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - createTextNode vs innerHTML vs textContent

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Clear the element

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Why does 'aaa' remain?

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Create a list

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Create a tree from the object

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Show descendants in a tree

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Create a calendar

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 8 - Colored clock with setInterval

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 9 - Insert the HTML in the list

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 10 - Sort a table
