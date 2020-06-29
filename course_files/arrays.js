let arr = [100, 4, 20, 18, 20, 1002, 1002];

//additing alements in array

arr.push('a','b');
arr.unshift('c');
arr.splice(2,0,'xxx','yyy');


//finding elements in array (Primitives)

in1 = arr.indexOf(100);
in2 = arr.lastIndexOf(1002);
in3 = arr.includes(1002);
in4 = arr.indexOf(20,6);


//removing alements from array

last = arr.pop();
first = arr.shift();
inMiddle = arr.splice(2,3);


//emptying array

let arr2 = [1, 2, 3];
let arr3 = arr2;
//remove all elements
arr2.length = 0;
//redefine array with empty array
arr2 = [];


//Combining slicing arrays

let f1 = [1, {a:2}, 3];
let f2 = ['a', 'b', 'c'];

//combining
concatF = f1.concat(f2);
concatF1 = [...f1, 'a', ...f2, 'b'];

//slicing
sliceF = concatF1.slice(1,4);

//copying, objects copies by reference
copyF = f1.slice();
copyF1 = [...f1];


//Join and Split

const arrSplitJoin = [1, 2, 3];
varJoin = arrSplitJoin.join(',  ');
varSplit = varJoin.split(',');


//finding elements in array (Reference types)

let persons = [
    {name: 'Mary', year: 1985},
    {name: 'Kate', year: 1988},
    {name: 'John', year: 1981}
]

const person = persons.find(function (element){
    return element.year === '1988';
})


const indexOfPerson = persons.findIndex(function (element){
    return element.year === '1988';
})


const person2 = persons.find(element => element.year === '1988');



//iterating in Array

persons.forEach((person, index) => person.name += index);

//Mapping Array
map = persons.map((person, index) => person.name + index);

//Filtering Array

filtered = persons.filter(person => person.year > 1982);
let list1982 = persons
    .filter(person => person.year > 1982)
    .map(person => '<li>'+person.name+'</li>');

let html = '<ul>'+list1982.join(',')+'</ul>';


//sorting Array

persons.sort((a, b) => {if (a.name <= b.name) return -1
    else return 1
});

//Every and Some

every = persons.every(person => person.year > 1982);
some = persons.some(person => person.year > 1982);



//Reduce Array

const averageYear = persons.reduce((acumulator, person) => acumulator += person.year, 0)/persons.length;













