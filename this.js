/* let user = {
    name: "John",
    age: 30,
  
    sayHi() {
      alert( this.name ); // leads to an error
    }
  
  };
  
  
  let admin = user;

 /*  user = null;
  admin.sayHi(); */

/*   user = null;
for(let key in admin) {
  alert(key)
} */

/* let user = {};

let admin = user;
admin.name = "asdbjdf";
user = null;
alert(admin.name); */

/* 
function makeUser() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
};

let user = makeUser();

alert( user.ref().name ); // John
 */

/* let calculator = {
  read() { 
    this.x = +prompt('x?', '');
    this.y = +prompt('y?', '');
  },
  sum() {
    let sum = this.x + this.y;
    return sum;
  },
  mul() {
    let mul = this.x * this.y;
    return mul;
  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() ); */


/* let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() { // shows the current step
    alert( this.step );
    return this;
  }
};
/* 
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); */
/*
ladder.up().down().down().showStep(); // 1 */


/* let user = {
  firstName: "Ilya",
  call() {
    let callFN = () => { alert(this.firstName); }
    callFN();
  },
};
  
user.call(); // Ilya */

/* let user = {
    firstName: "Ilya",
    callFN() { alert(this.firstName) }
    };
    

    const x =
    user.callFN(); // Ilya */


/* const x = {
  result: 0,
  y: 2,
  half(num) {
    this.result = num / this.y;
    return this
  },
  mult(x) {
    this.result += this.y * x;

  }
}


console.log(x.half(10).mult(2));



function blach(x) {
  const y = { ...x };
  y.y = 0;
}
blach(x);
console.log(x.half(4));





let x;
function identify() {
  let
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

var me = {

  name: "Kyle"
};

var you = {
  name: "Reader"
};

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER

    function identify(context) {
      return context.name.toUpperCase();
    }
    
    function speak(context) {
      var greeting = "Hello, I'm " + identify( context );
      console.log( greeting );
    }
    
    identify( you ); // READER
    speak( me ); // Hello, I'm KYLE */





/* function User(name) {
  this.name = name;
  this.sayHi = function () {
    console.log("My name is:" + this.name);
  };
}

let john = new User("John");

john.sayHi(); */


/* function Calculator() {

  this.read = function (a, b) {
    this.a = a;
    this.b = b;
  };

  this.mul = function () {
    return this.a * this.b;
  };

  this.sum = function () {
    return this.a + this.b;
  };
}

let calculator = new Calculator();
calculator.read(3, 6);

console.log("Sum = " + calculator.sum());
console.log("Mul = " + calculator.mul()); */


/* function Accumulator(startingValue) {
  this.value = startingValue;
  this.read = function (addValue) {
    this.value += addValue;
  };
}

let accumulator = new Accumulator(1);
accumulator.read(6);
accumulator.read(2);
console.log(accumulator.value);


function Accumulator2(startingValue) {
  this.value = startingValue;
  this.read = function() {
    this.value += +prompt('How much do you want to add?', 0);
  }
}

let accumulator2 = Accumulator2(1);
accumulator2.read();
accumulator2.read();
alert(accumulator2.value); */