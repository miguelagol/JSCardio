let foo = 'blach';

function x() {
    const foo = 'fooo';
    return function y() {
        return 'Misio ma ' + foo + ' lat';
    }
}
console.log(x()());
