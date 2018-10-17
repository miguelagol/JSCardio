let randomFunction = () => {
    this.attribute = 'This is a new attribute to be created on the invoking object';
    console.log(this);
}

randomFunction();



function randomFunction(){
    console.log(this);
  }
  
  let newObj = {
    description : "This is a new Object"
  }
  
/*   console.log(randomFunction.bind(newObj)());
  console.log(randomFunction.call(newObj)); */
  console.log(randomFunction.apply(newObj));