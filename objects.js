/* let user = {
    name: "John",
    age: 30
};

for( let property in user) {
  alert(property);
  alert(user[property]);
}
let key = prompt("What do you want to know about the user?", "name");
  
// access by variable
alert(key in user); // John (if enter "name")

let __proto__ = prompt("Which fruit to buy?", "apple");

let bag = { 
  __proto__: 5, // the name of the property is taken from the variable fruit
};

alert( bag.__proto__ ); // 5 if fruit="apple"

const user = {
  name: "Pete"
};

user.name = "John";

alert(user.name);

// TASK1: Hello, object

let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;

// TASK2: Check for emptiness

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
};

let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false

//TASK3:Sum object properties

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
};

let sum = 0;

for (let key in salaries) {
  sum += salaries[key];
}

alert(sum); */


//TASK4:Multiply numeric properties by 2

function multiplyNumeric(obj) {
  for (let prop in obj) {
    if (typeof obj[prop] == "number") {
      obj[prop] *= 2;
    }
  };
};

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};
for (let key in menu) {
  alert(menu[key]);
}

multiplyNumeric(menu);

for (let key2 in menu) {
  alert(menu[key2]);
}