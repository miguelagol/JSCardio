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
<ol id="list">
   <li>0</li>
   <li>1</li>
</ol>;

let newLi = document.createElement('li');
newLi.innerHTML = 'Hello';
list.appendChild(newLi);
/* 1. 0
   2. 1
   3. Hello
*/

// parentElem.insertBefore(node, nextSibling)
// Inserts node before nextSibling into parentElem
<ol id="list2">
   <li>0</li>
   <li>1</li>
</ol>;

let newLi2 = document.createElement('li');
newLi2.innerHTML = 'Hello';
list2.insertBefore(newLi2, list2.children[0]);
/* 1. Hello
   2. 0
   3. 1
*/

// parentElem.replaceChild(node, oldChild)
// Replaces oldChild with node among children of parentElem
<ol id="list3">
   <li>0</li>
   <li>1</li>
   <li>2</li>
</ol>;

let newLi3 = document.createElement('li');
newLi3.innerHTML = 'Hello';
list3.replaceChild(newLi3, list3.children[1]);
/* 1. 0
   2. Hello
   3. 2
*/
// ^ ^ ^ ^ ^ These methods are “old school”

// prepend/append/before/after
/* This set of methods provides more flexible insertions:
   - node.append(...nodes or strings) – append nodes or strings at the end of node,
   - node.prepend(...nodes or strings) – insert nodes or strings into the beginning of node,
   - node.before(...nodes or strings) –- insert nodes or strings before the node,
   - node.after(...nodes or strings) –- insert nodes or strings after the node,
   - node.replaceWith(...nodes or strings) –- replaces node with the given nodes or strings.
*/
<ol id="ol">
   <li>0</li>
   <li>1</li>
   <li>2</li>
</ol>;

ol.before('before');
ol.after('after');

let prependLi = document.createElement('li');
prependLi.innerHTML = 'Prepend li';
ol.prepend(prependLi);

let appendLi = document.createElement('li');
appendLi.innerHTML = 'Append li';
ol.append(appendLi);
/* 
   before
      1. Prepend li
      2. 0
      3. 1
      4. 2
      5. Append li
   after
*/

// We can insert multiple lists of nodes and text pieces in a single call.
<div id="div" />;

div.before('<p>Hello</p>', document.createElement('hr'));
// strings are inserted in a safe way, like element.textContent does it.
/*    &lt;p&gt;Hello&lt;/p&gt;
      <hr>
      <div id="div"></div>
*/

//--------------------REMEMBER-------------------
// these methods can only be used to insert DOM nodes or text pieces.

// insertAdjacentHTML/Text/Element
// element.insertAdjacentHTML(where, html)
/* The first parameter is a string, specifying where to insert.
      - "beforebegin" – insert html before elem,
      - "afterbegin" – insert html into elem, at the beginning,
      - "beforeend" – insert html into elem, at the end,
      - "afterend" – insert html after elem.
*/
<div id="div" />;

div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
div.insertAdjacentHTML('afterend', '<p>Bye</p>');
/*    <p>Hello</p>
      <div id="div"></div>
      <p>Bye</p>
*/

// element.insertAdjacentText(where, text) – the same syntax, but a string of text is inserted “as text” instead of HTML

// element.insertAdjacentElement(where, elem) – the same syntax, but inserts an element

//----------------------------------------------------------------------------------------------------------------------------------------

// Cloning nodes
// element.cloneNode(boolean)
/* The call element.cloneNode(true) creates a "deep" clone of the element,
      with all atributes and subelements
   If we call element.cloneNode(false), then the clone is made without child elements
*/
<div class="alert" id="div">
   <strong>Hi there!</strong> You've read an important message.
</div>;

let div2 = div.cloneNode(true);
div2.querySelector('strong').innerHTML = 'Bye there';

div.after(div2);
/* Hi there! You've read an important message.
   Bye there You've read an important message.
*/

//----------------------------------------------------------------------------------------------------------------------------------------

//Removal methods

// parentElem.removeChild(node)
// removes node from parentElem (assuming it's a child)

//node.remove()
// removes the node from its place

//--------------------REMEMBER-------------------
// All insertion methods automatically remove the node from the old place.

// if we want to move an element to another place - there's no need to remove it from the old one
<body>
   <div id="first">First</div>
   <div id="second">Second</div>
</body>;

second.after(first);

//----------------------------------------------------------------------------------------------------------------------------------------

// document.write(HTML) (ancient method)
// The call to document.write(html) writes the html into page "right here and now"
<body>
   <p>Somewhere in the page...</p>
   <script>
      document.write('
      <b>Hello from JS</b>
      ');
   </script>
   <p>The end</p>
</body>;

//--------------------REMEMBER-------------------
// The call to document.write only works while the page is loading
// If we call it afterwards, the existing document content is erased
<body>
   <p>After one second the content of this page will be replaced...</p>
   <script>
      setTimeout(() => document.write('
      <b>... by this.</b>
      '), 1000);
   </script>
</body>;

// Let make an alert
let messageDiv = document.createElement('div');
messageDiv.class = 'alert alert-success';
messageDiv.innerHTML =
   "<strong>Hi there!</strong> You're read an important message.";
document.body.appendChild(messageDiv);
/* or 
   document.body.insertAdjacentHTML("afterbegin", `<div class="alert alert-success">
      <strong>Hi there!</strong> You're read an important message.
      </div>`);
*/
setTimeout(() => messageDiv.remove(), 2000);

//----------------------------------------------------------------------------------------------------------------------------------------

// Summary

/* Methods to create new nodes:
      - document.createElement(tag) – creates an element with the given tag,
      - document.createTextNode(value) – creates a text node (rarely used),
      - elem.cloneNode(deep) – clones the element, if deep==true then with all descendants.

   Insertion and removal of nodes:
      From the parent:     -> All these methods return node.
         - parent.appendChild(node)
         - parent.insertBefore(node, nextSibling)
         - parent.removeChild(node)
         - parent.replaceChild(newElem, node)
      Given a list of nodes and strings:     -> Text strings are inserted “as text”.
         - node.append(...nodes or strings) – insert into node, at the end,
         - node.prepend(...nodes or strings) – insert into node, at the beginning,
         - node.before(...nodes or strings) –- insert right before node,
         - node.after(...nodes or strings) –- insert right after node,
         - node.replaceWith(...nodes or strings) –- replace node.
         - node.remove() –- remove the node.
      Given a piece of HTML: elem.insertAdjacentHTML(where, html), inserts depending on where:
         - "beforebegin" – insert html right before elem,
         - "afterbegin" – insert html into elem, at the beginning,
         - "beforeend" – insert html into elem, at the end,
         - "afterend" – insert html right after elem.
         Also there are similar methods elem.insertAdjacentText and elem.insertAdjacentElement,
         they insert text strings and elements, but they are rarely used.

   To append HTML to the page before it has finished loading:
      - document.write(html)
   After the page is loaded such a call erases the document.
*/

//----------------------------------------------------------------------------------------------------------------------------------------

// Styles and classes

/* There are generally two ways to style an element:
      - Create a class in CSS and add it:       <div class="...">
      - Write properties directly into style:   <div style="...">.

CSS is always the preferred way. We should only manipulate the style property if classes “can’t handle it”.

For instance, style is acceptable if we calculate coordinates of an element dynamically and want to set them from JavaScript.
*/

//--------------------------------------------------------------------------------------------------

// className and classList

// the elem.className corresponds to the "class" attribute
<body class="main page" />;
console.log(document.body.className); // main page

// If we assign something to element.className, it replaces the whole strings of classes.
document.body.className = 'something';
console.log(document.body.className); // something

// If we want to add/remove a single class we use element.classList
// The elem.classList is a special object with methods to add/remove/toggle classes.
document.body.classList.add('article');
console.log(document.body.className); // something article

/* -  elem.classList.add/remove("class") – adds/removes the class.
   -  elem.classList.toggle("class") – if the class exists, then removes it, otherwise adds it.
   -  elem.classList.contains("class") – returns true/false, checks for the given class.
*/

// classList is iterable, so we can list all classes
for (let name of document.body.classList) {
   console.log(name); // something, article
}

//--------------------------------------------------------------------------------------------------

// element.style
// The property elem.style is an object that corresponds to what’s written in the "style" attribute.
// For multi-word property the camelCase is used
element.style.backgroundColor = prompt('background color?', 'green');
element.style.borderLeftWidth = prompt('norder left width', '20px');

// Browser-prefixed properties like -moz-border-radius, -webkit-border-radius also follow the same rule
button.style.MozBorderRadius = '5px';

//--------------------------------------------------------------------------------------------------

// Resetting the style property
// If we want to assign a style property, and later remove it we should assign an empty line to it.
document.bosy.style.display = 'none'; // hide
setTimeout(() => (document.body.style.display = ''), 1000); // back to normal

// style.cssText
// style.* is to assign individual style property, to set the full style as a string,
// there's a spectial property
<div id="div">Button</div>;
div.style.cssText = `color: red !important;
   background-color: yellow;
   width: 100px;
   text-align: center;
   `;
alert(div.style.cssText); // background-color: yellow; width: 100px; text-align: center; color: red !important;
// such assignment removes all existing styles: it does not add, but replaces them

//--------------------------------------------------------------------------------------------------

//--------------------REMEMBER-------------------
// Mind the units

// this doesn't work
document.body.style.margin = 20;
alert(document.body.style.margin); // '' (empty string, the assignment is ignored)

// it works
document.body.style.margin = '20px';
alert(document.body.style.margin); // 20px
alert(document.body.style.marginTop); // 20px

//--------------------------------------------------------------------------------------------------

// Computed styles
// getComputedStyle(element[, pseudo])
//    element  - element to read the value for
//    pseudo   - a pseudo-element if required
// the result is an object with style properties

//--------------------REMEMBER-------------------
// The style property operates only on the value of the "style" attribute, without any CSS cascade.
// So we can’t read anything that comes from CSS classes using elem.style.
{
   /* <style> body { color: red; margin: 5px } </style> */
}

alert(document.body.style.color); // ''
alert(document.body.style.margin); // ''

let computedStyle = getComputedStyle(document.body);

alert(computedStyle.color); // rgb(255, 0, 0)
alert(computedStyle.marginTop); // 5px

//--------------------------------------------------------------------------------------------------

// Computed and resolved values
/* There are two concepts in CSS:
   - A computed style value   is the value after all CSS rules and CSS inheritance is applied,
                              as the result of the CSS cascade.
                              It can look like height:1em or font-size:125%.
   - A resolved style value   is the one finally applied to the element.
                              Values like 1em or 125% are relative.
                              The browser takes the computed value and makes all units fixed and absolute,
                              for instance: height:20px or font-size:16px.
                              For geometry properties resolved values may have a floating point, like width:50.5px.

   Nowadays getComputedStyle actually returns the resolved value of the property
*/

//--------------------REMEMBER-------------------
// getComputedStyle requires the full property name
// We should always ask for the exact property that we want, like paddingLeft or marginTop or borderTopWidth.
// Otherwise the correct result is not guaranteed.

//--------------------REMEMBER-------------------
// “Visited” links styles are hidden!
// Visited links may be colored using :visited CSS pseudoclass.
// But getComputedStyle does not give access to that color, because otherwise an arbitrary page
// could find out whether the user visited a link by creating it on the page and checking the styles.

//----------------------------------------------------------------------------------------------------------------------------------------

// Summary

/* To manage classes, there are two DOM properties:
      -  className – the string value, good to manage the whole set of classes.
      -  classList – the object with methods add/remove/toggle/contains, good for individual classes.
   
   To change the styles:
      -  The style property is an object with camelCased styles. Reading and writing to it has the same meaning
         as modifying individual properties in the "style" attribute. To see how to apply important and other rare stuff,
         there’s a list of methods at MDN.
      -  The style.cssText property corresponds to the whole "style" attribute, the full string of styles.

   To read the resolved styles (with respect to all classes, after all CSS is applied and final values are calculated):
      -  The getComputedStyle(elem[, pseudo]) returns the style-like object with them. Read-only.
*/

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - createTextNode vs innerHTML vs textContent
/* We have an empty DOM element elem and a string text.

   Which of these 3 commands do exactly the same?
   - elem.append(document.createTextNode(text))
   - elem.innerHTML = text
   - elem.textContent = text
*/

/* 1 and 3
   Both commands result in adding the text "as text" into the elem
*/
<body>
   <div id="elem1" />
   <div id="elem2" />
   <div id="elem3" />
</body>;

let text = '<b>text</b>';

elem1.append(document.createTextNode(text)); // <b>text</b>
elem2.textContent = text; // <b>text</b>
elem3.innerHTML = text; // text

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Clear the element
<ol id="elem">
   <li>Hello</li>
   <li>World</li>
</ol>;

function clear(elem) {
   let lis = elem.querySelectorAll('li');
   for (let li of lis) {
      li.remove();
   }
}

clear(elem);

// or
function clear2(elem) {
   while (elem.firstChild) {
      elem.firstChild.remove();
   }
}

// or
function clear3(elem) {
   elem.innerHTML = '';
}

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Why does 'aaa' remain?
<table id="table">
   aaa
   <tr>
      <td>Test</td>
   </tr>
</table>;

alert(table); // [object HTMLTableElement]
table.remove();
// why there's still aaa in the document?

/* Because of autocorrection.
   The HTML in the task is incorrect.
   According to the spec only table-specific tags are allowed inside the <table>.
   There may be no text inside.
   The browser adds "aaa" before the <table>
*/

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Create a list
/* Write an interface to create a list from user input.
   For every list item:
      - Ask a user about its content using prompt.
      - Create the <li> with it and add it to <ul>.
      - Continue until the user cancels the input (by pressing Esc or CANCEL in prompt).
*/
<p>Your list</p>;

let ul = document.createElement('ul');
document.body.append(ul);

while (true) {
   let liContent = prompt('Enter the li content', '');
   if (!liContent) break;
   let li = document.createElement('li');
   li.textContent = liContent;
   ul.append(li);
}

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Create a tree from the object
// Write a function createTree that creates a nested ul/li list from the nested object.
// Solution 1 - Create tree nodes and append with DOM methods
<div id="container" />;

let data = {
   Fish: {
      trout: {},
      salmon: {},
   },
   Tree: {
      Huge: {
         sequoia: {},
         oak: {},
      },
      Flowering: {
         redbud: {},
         magnolia: {},
      },
   },
};

function isEmpty(object) {
   for (let key in object) {
      return false;
   }
   return true;
}

function createTree(where, what) {
   if (!isEmpty(what)) {
      let ul = document.createElement('ul');
      where.append(ul);

      for (let key in what) {
         let li = document.createElement('li');
         li.innerText = key;

         ul.append(li);
         createTree(li, what[key]);
      }
   }
}

// or
function createTree2(container, obj) {
   container.append(createTreeDom(obj));
}

function createTreeDom(obj) {
   // if there's no children, then the call returns undefined
   // and the <ul> won't be created
   if (!Object.keys(obj).length) return;

   let ul = document.createElement('ul');

   for (let key in obj) {
      let li = document.createElement('li');
      li.innerHTML = key;
      let childrenUl = createTreeDom(obj[key]);
      if (childrenUl) {
         li.append(childrenUl);
      }
      ul.append(li);
   }
   return ul;
}

let container = document.getElementById('container');
createTree(container, data);

// Solution 2 - Create the HTML for the tree and then assign to container.innerHTML
function createTree2(container, data) {
   container.innerHTML = createText(data);
}

function createText(data) {
   let text;
   let li = '';
   if (!li) {
      for (let key in data) {
         li += '<li>' + key;
         li += createText(data[key]);
         li += '</li>';
      }
      text = '<ul>' + li + '</ul>';
      return text;
   }
}

// or
function createText2(obj) {
   // standalone recursive function
   let li = '';
   let ul;
   for (let key in obj) {
      li += '<li>' + key + createTreeText(obj[key]) + '</li>';
   }
   if (li) {
      ul = '<ul>' + li + '</ul>';
   }
   return ul || '';
}

let container = document.getElementById('container');
createTree2(container, data);

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Show descendants in a tree
<ul>
   <li>
      Animals
      <ul>
         <li>
            Mammals
            <ul>
               <li>Cows</li>
               <li>Donkeys</li>
               <li>Dogs</li>
               <li>Tigers</li>
            </ul>
         </li>
         <li>
            Other
            <ul>
               <li>Snakes</li>
               <li>Birds</li>
               <li>Lizards</li>
            </ul>
         </li>
      </ul>
   </li>
   <li>
      Fishes
      <ul>
         <li>
            Aquarium
            <ul>
               <li>Guppy</li>
               <li>Angelfish</li>
            </ul>
         </li>
         <li>
            Sea
            <ul>
               <li>Sea trout</li>
            </ul>
         </li>
      </ul>
   </li>
</ul>;

let lis = document.querySelectorAll('li');
for (let li of lis) {
   let count = li.getElementsByTagName('li').length;
   let ul = li.querySelector('ul');
   if (ul) {
      ul.before('[' + count + ']');
   }
}

// or
let lis = document.getElementsByTagName('li');
for (let li of lis) {
   let descendantsCount = li.getElementsByTagName('li').length;
   if (!descendantsCount) continue;
   li.firstChild.data += ' [' + descendantsCount + ']';
}

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Create a calendar
{
   /*
   <style>
      table {
         border-collapse: collapse;
      }

      td, th {
         border: 1px solid black;
         padding: 3px;
         text-align: center;
      }

      th {
         font-weight: bold;
         background-color: #E6E6E6;
      }
   </style>
*/
}

<body>
   <div id="calendar" />
</body>;

function createCalendar(elem, year, month) {
   elem.innerHTML = createTable(year, month);
}

function createTable(year, month) {
   let text = '<table>';
   let date = new Date(year, month - 1, 1);

   let firstDay = getFirstDay(date);
   let countDay = getLastDayOfMonth(year, month);

   //let tableTr = createTableTr(firstDay, countDay, table);
   text += createTableTh();
   text += createTableTr(firstDay, countDay);

   text += '</table>';
   return text;
}

function createCell(i, start, end) {
   let cell = '';
   let td = i - start + 1;
   if (i < start) {
      cell += '<td></td>';
   } else if (i % 7 == 0 && i != end + 7 - (end % 7)) {
      cell += '<td>' + td + '</td>';
      cell += '</tr><tr>';
   } else if (td <= end) {
      cell += '<td>' + td + '</td>';
   } else {
      cell += '<td></td>';
   }
   return cell;
}

function createTableTr(start, end) {
   let tr = '<tr>';

   if (end % 7 == 0 && start == 1) {
      for (let i = 1; i <= end; i++) {
         tr += createCell(i, start, end);
      }
   } else if (end % 7 == 0 && start != 1) {
      for (let i = 1; i <= end + 7; i++) {
         tr += createCell(i, start, end);
      }
   } else if ((start == 7 && end == 30) || (start >= 6 && end == 31)) {
      for (let i = 1; i <= end + 14 - (end % 7); i++) {
         let cell = '';
         let td = i - start + 1;
         if (i < start) {
            cell += '<td></td>';
         } else if (i % 7 == 0 && i != end + 14 - (end % 7)) {
            cell += '<td>' + td + '</td>';
            cell += '</tr><tr>';
         } else if (td <= end) {
            cell += '<td>' + td + '</td>';
         } else {
            cell += '<td></td>';
         }
         tr += cell;
      }
   } else {
      for (let i = 1; i <= end + 7 - (end % 7); i++) {
         tr += createCell(i, start, end);
      }
   }
   tr += '</tr>';
   return tr;
}

function createTableTh() {
   let weekDay = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
   let week = '<tr>';
   for (let i = 0; i < weekDay.length; i++) {
      week += '<th>' + weekDay[i] + '</th>';
   }
   week += '</tr>';
   return week;
}

function getLastDayOfMonth(year, month) {
   let date = new Date(year, month);
   date.setDate(date.getDate() - 1);
   return date.getDate();
}

function getFirstDay(date) {
   let firstDay = date.getDay();
   if (firstDay == 0) {
      firstDay = 7;
   }
   return firstDay;
}

let element = document.getElementById('calendar');
createCalendar(element, 2002, 2);

// or
function createCalendar2(elem, year, month) {
   let month = month - 1; // months in JS are 0..11, not 1..12
   let date = new Date(year, mon);

   let table =
      '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';

   // spaces for the first row
   // from Monday till the first day of the month
   // * * * 1  2  3  4
   for (let i = 0; i < getDay(date); i++) {
      table += '<td></td>';
   }

   // <td> with actual dates
   while (date.getMonth() == month) {
      table += '<td>' + date.getDate() + '</td>';

      if (getDay(date) % 7 == 6) {
         // sunday, last day of week - newline
         table += '</tr><tr>';
      }

      date.setDate(date.getDate() + 1);
   }

   // add spaces after last days of month for the last row
   // 29 30 31 * * * *
   if (getDay(date) != 0) {
      for (let i = getDay(date); i < 7; i++) {
         table += '<td></td>';
      }
   }

   // close the table
   table += '</tr></table>';

   elem.innerHTML = table;
}

function getDay(date) {
   // get day number from 0 (monday) to 6 (sunday)
   let day = date.getDay();
   if (day == 0) day = 7; // make Sunday (0) the last day
   return day - 1;
}

createCalendar2(calendar, 2012, 9);

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 8 - Colored clock with setInterval
// click on this button calls clockStart()
<div id="clock">
   <span class="hour" />:<span class="min" />:<span class="sec" />
</div>;

<input type="button" onclick="clockStart()" value="Start" />;
<input type="button" onclick="clockStop()" value="Stop" />;

let timer;

function updateTime() {
   let clock = document.getElementById('clock');
   let time = new Date();

   let hours = time.getHours();
   if (hours < 10) hours = '0' + hours;
   clock.children[0].innerHTML = hours;

   let minutes = time.getMinutes();
   if (minutes < 10) minutes = '0' + minutes;
   clock.children[1].innerHTML = minutes;

   let seconds = time.getSeconds();
   if (seconds < 10) seconds = '0' + seconds;
   clock.children[2].innerHTML = seconds;
}

function clockStart() {
   timer = setInterval(updateTime, 1000);
   updateTime();
}

function clockStop() {
   clearInterval(timer);
}

clockStart();

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 9 - Insert the HTML in the list
<ul id="ul">
   <li id="one">1</li>
   <li id="two">4</li>
</ul>;

let li1 = document.getElementById('one');
let li4 = document.getElementById('two');

let li2 = document.createElement('li');
let li3 = document.createElement('li');

li2.textContent = 2;
li3.textContent = 3;

li1.after(li2);
li4.before(li3);

// or
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 10 - Sort a table
<table id="table">
   <tr>
      <th>Name</th>
      <th>Surname</th>
      <th>Age</th>
   </tr>
   <tr>
      <td>John</td>
      <td>Smith</td>
      <td>10</td>
   </tr>
   <tr>
      <td>Pete</td>
      <td>Brown</td>
      <td>15</td>
   </tr>
   <tr>
      <td>Ann</td>
      <td>Lee</td>
      <td>5</td>
   </tr>
</table>;

let sortedRows = Array.from(table.rows)
   .slice(1)
   .sort((rowA, rowB) =>
      rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1,
   );

table.tBodies[0].append(...sortedRows);

/* The HTMLTableElement.tBodies
      read-only property returns a live HTMLCollection of the bodies in a <table>.
      Although the property is read-only, the returned object is live and allows the modification of its content.
      The collection returned includes implicit <tbody> elements
*/

//----------------------------------------------------------------------------------------------------------------------------------------

// TASK 11 - Create a notification
{
   /* <style>
   .notification {
      position: fixed;
      z-index: 1000;
      padding: 5px;
      border: 1px solid black;
      font-size: 20px;
      background: white;
      text-align: center;
   }
 
   .welcome {
      background: #b80000;
      color: yellow;
   }
</style> */
}

function showNotification(options) {
   let div = document.createElement('div');
   div.className = 'notification';
   if (className) {
      notification.classList.add(className);
   }
   div.innerHTML = html;
   div.style.top = top + 'px';
   div.style.right = right + 'px';

   document.body.append(div);

   setTimeout(() => div.remove(), 1500);
}

// shows an element with the text "Hello" near the right-top of the window
let i = 1;
setInterval(() => {
   showNotification({
      top: 10, // 10px from the top of the window (by default 0px)
      right: 10, // 10px from the right edge of the window (by default 0px)
      html: 'Hello ' + i++, // the HTML of notification
      className: 'welcome', // an additional class for the div (optional)
   });
}, 2000);
