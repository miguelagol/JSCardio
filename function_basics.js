// function checkAge(age) {
//   if (age > 18) {
//     return true;
//   } else {
//     return confirm('Do you have your parents permission to access this page?');
//   }
// }

// function checkAge(age) {
//     return (age >18 ) ? true : confirm('Do you have your parents permission to access this page?');
// }

// function checkAge(age) {
//     return (age >18 ) || confirm('Do you have your parents permission to access this page?');
// }

function calcMin(a, b) {

    if (a < b) {
        return a;
    }

    else return b;
}

alert( calcMin(13, 13) );

function calcPow(x, n) {
    let result = 1;

    for (let i = 1; i <= n; i++) {
        result *= x;
    }

    return result;
}

let x = prompt('x?', '');
let n = prompt('n?', '');

if (n < 1) {
    alert('Please use an integer greather than 0');
}
else {
    alert( calcPow(x, n) );
}

let ask = ( confirm('Do you agree?') ) ?
    ()  =>  alert("You agreed.") :
    ()  =>  alert("You canceled the execution.") ;

ask();


function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
      result *= x;
  }

  return result;
}

let x = prompt("x?", ''),
    n = prompt("n?", '')

if (n <= 0) {
  alert(`Power ${n} is not supported,
  please enter an integer number greater than zero`);
  return NaN;
}
else {
  alert( pow(x, n) )
}


// Power test
describe("pow", function() {

    describe("raises x to power n", function() {
  
      function makeTest(x) {
        let expected = x * x * x;
        it(`${x} in the power 3 is ${expected}`, function() {
          assert.equal(pow(x, 3), expected);
        });
      }
  
      for (let x = 1; x <= 5; x++) {
        makeTest(x);
      }

      it("for negative n the result is NaN", function() {
        assert.isNaN(pow(2, -1));
      });
    
      it("for non-integer n the result is NaN", function() {
        assert.isNaN(pow(2, 1.5));
      });
  
    });
  
    // ... more tests to follow here, both describe and it can be added
});