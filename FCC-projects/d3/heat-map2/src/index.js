import * as d3 from "d3";
const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const colors = [
  "#00a4ff",
  "#00c4ff",
  "#00e4ff",
  "#00ffd0",
  "#00ff5c",
  "#b0ff00",
  "#fdff00",
  "#FFf000",
  "#FFdc00",
  "#FFc800",
  "#FFaa00",
  "#FF9600",
  "#FF8200",
];

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const dataset = data["monthlyVariance"];

    const w = 1600;
    const h = 1000;
    const padding = 200;

    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, (d) => d["year"]),
        d3.max(dataset, (d) => d["year"]),
      ])

      .range([padding, w - padding]);

    const yScale = d3
      .scaleBand()
      .domain(month)
      .range([padding, h - padding]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

    const yAxis = d3.axisLeft(yScale);

    const svg = d3
      .select("#container")
      .append("svg")
      .style("background-color", "white")
      .attr("width", w)
      .attr("height", h);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d["year"]))
      .attr("y", (d) => ((h - 2 * padding) / 12) * (d["month"] - 1) + padding)
      .attr("height", (h - 2 * padding) / 12)
      .attr("width", 5)
      .attr("class", "bars")
      .style("fill", (d) =>
        colorByTemp(data["baseTemperature"] + d["variance"])
      )
      .append("title")
      .text(
        (d) =>
          `temperature: ${data["baseTemperature"] + d["variance"]} year: ${
            d["year"]
          }`
      );

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

    function colorByTemp(temp) {
      let color;

      colors.forEach((value, index) => {
        if (temp >= index + 1 && temp < index + 2) color = value;
      });

      return color;
    }

    svg
      .append("text")
      .attr("x", w / 2 + padding - 200)
      .attr("y", padding / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "22px")
      .text("Monthly Global Land-Surface Temperature");

    //Legend Axes

    const xScaleLegend = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, (d) => data["baseTemperature"] + d["variance"]),
        d3.max(dataset, (d) => data["baseTemperature"] + d["variance"]),
      ])
      .range([3 * padding, w - 3 * padding])
      .nice();

    const colorScale = d3.scaleQuantize().domain([1, 14]).range(colors);

    const xAxisLegend = d3.axisBottom(xScaleLegend);

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h - padding / 2) + ")")
      .call(xAxisLegend);

    svg
      .selectAll(".rect-legend")
      .data([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
      .enter()
      .append("rect")
      .attr("x", (d) => 3 * padding + ((w - 6 * padding) * (d - 1)) / 13)
      .attr("y", h - padding / 2 - 20)
      .attr("height", 20)
      .attr("width", (w - 6 * padding) / 13)
      .style("fill", (d) => colorScale(d))
      .attr("class", "rect-legend");
  });
