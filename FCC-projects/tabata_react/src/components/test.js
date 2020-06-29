function Circle(value) {
  this.radius = value;
  this.move = function () {
    console.log("move");
  };
}

f1 = new Circle(1);

function Shape(value) {
  return {
    radius: value,
    move: function () {
      console.log("move");
    },
  };
}

f3 = new Shape(4);
