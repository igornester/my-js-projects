// Every object (except the root object) has a prototype (parent). 
// To get the prototype of an object:
Object.getPrototypeOf(obj); 

// In Chrome, you can inspect "__proto__" property. But you should 
// not use that in the code. 

// To get the attributes of a property:
Object.getOwnPropertyDescriptor(obj, 'propertyName');

// To set the attributes for a property:
Object.defineProperty(obj, 'propertyName', {
    configurable: false,    // cannot be deleted
    writable: false,
    enumerable: false
});

// Constructors have a "prototype" property. It returns the object 
// that will be used as the prototype for objects created by the constructor. 
Object.prototype === Object.getPrototypeOf({})
Array.prototype === Object.getPrototypeOf([])

// All objects created with the same constructor will have the same prototype. 
// A single instance of this prototype will be stored in the memory. 
const x = {};
const y = {};
Object.getPrototypeOf(x) === Object.getPrototypeOf(y); // returns true 

// Any changes to the prototype will be immediately visible to all objects 
// referencing this prototype. 

// When dealing with large number of objects, it's better to put their
// methods on their prototype. This way, a single instance of the methods
// will be in the memory. 
Circle.prototype.draw = function() {}

// To get the own/instance properties:
Object.keys(obj);

// To get all the properties (own + prototype): 
for (let key in obj) {}



//My part
function Map(size){
    this.size = size;
}

map1 = new Map(1); //Defenition not obligatory after defeniton of show metod
map2 = new Map(2);

Map.prototype.show = function(){
    console.log('showing map '+this.size);
}

console.log(Map.prototype === Object.getPrototypeOf(map1));
console.log(Map.prototype === Object.getPrototypeOf(map2));

/////////


function Circle(radius){
    this.radius = radius;
}

function Square(size){
    this.size = size;
}

function Shape(dLocation){
    this.defaultLocation = dLocation;
}


Shape.prototype.move = function(){
    console.log('Moving...');
}



//Circle.prototype = Object.create(Shape.prototype);
Square.prototype = Object.create(Shape.prototype);
//Square.prototype.constructor = Square;


c = new Circle(1);  //Defenition obligatory after defeniton of show metod
sq = new Square(2);
sh = new Shape(22);

// Why inner variables of Constructor Function live in scope of objet which was constracted by that function?
// Why object gives property and methods which was added before declaration of this object