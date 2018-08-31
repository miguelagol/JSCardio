/* let user = { name: "John" };
let id = Symbol("id");

user[id] = "ID Value"; */

let id = Symbol.for("id");

let idAdmin = Symbol.for("id");

alert( id === idAdmin );
alert( Symbol.keyFor(idAdmin) );

let id2 = Symbol.for("name");


alert( Symbol.keyFor(Symbol.for("name")) );


  
