import * as d3 from "d3";

const yScale = d3.scaleLinear().domain([0, 1]).range([2, 3]);

console.log(yScale(0));
