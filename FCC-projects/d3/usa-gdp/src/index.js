import "d3/dist/d3.js";
import "bootstrap/dist/css/bootstrap.css";

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

function makeRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();
    xhr.onload = () => {
      resolve(JSON.parse(xhr.response));
    };
  });
}

makeRequest("GET", url).then((data) => {
  const w = 1100;
  const h = 500;
  const padding = 60;

  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => d["Year"]) - 2,
      d3.max(data, (d) => d["Year"]),
    ])
    .range([padding, w - padding]);

  console.log(xScale(1994));

  const yScale = d3
    .scaleTime()
    .domain([
      new Date(d3.min(data, (d) => d["Seconds"] * 1000)),
      new Date(d3.max(data, (d) => d["Seconds"] * 1000)),
    ])
    .range([padding, h - padding]);

  console.log(yScale(2210));

  const svg = d3
    .select("#container")
    .append("svg")
    .style("background-color", "#944743")
    .attr("width", w)
    .attr("height", h);

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d["Year"]))
    .attr("cy", (d) => yScale(new Date(d["Seconds"] * 1000)))
    .attr("r", 8)
    .attr("class", (d) => (d["Doping"] === "" ? "circle" : "circle_d"))
    .append("title")
    .text((d) => `${d["Name"]} ${d["Nationality"]}`);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  svg
    .append("rect")
    .attr("x", 800)
    .attr("y", 200)
    .attr("width", 200)
    .attr("height", 50)
    .attr("fill", "white");

  svg
    .append("circle")
    .attr("cx", 820)
    .attr("cy", 215)
    .attr("r", 8)
    .attr("class", "circle");

  svg
    .append("text")
    .attr("x", 835)
    .attr("y", 219)
    .attr("class", "legend")
    .text("No doping allegations");

  svg
    .append("circle")
    .attr("cx", 820)
    .attr("cy", 235)
    .attr("r", 8)
    .attr("class", "circle_d");

  svg
    .append("text")
    .attr("x", 835)
    .attr("y", 238)
    .attr("class", "legend")
    .text("Riders with doping allegations");

  svg
    .append("text")
    .attr("x", (w - padding) / 2)
    .attr("y", padding)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Doping in Professional Bicycle Racing");
});
