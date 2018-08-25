"use strict"

for (let i = 2; i<=10; i++) {
    if (i%2 == 0) {
        alert(i);
    }
}

for (let j = 0; j < 3; j++) {
    alert(`number ${j}!`);
}

let k = 0;
while (k<3) {
    alert(`number ${k}!`);
    k++;
}

let number = prompt("Type a number greather than 100", '0');
while (number <= 100 || number == '' || number == null) {
    number = prompt("Type a number once again");
}

for (let n=2; n<=10; n++) {
    for (let i=2; i<=n; i++) {
        if (n%i==0 && n!==i) {
            break;
        }
        else if (n%i==0 && n==i) {
            alert(n);
        }
    }
}


