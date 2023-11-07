var margin = { top: 10, right: 30, bottom: 30, left: 50 }, // Adjust the margins as needed
    width = 400 - margin.left - margin.right, // Adjust the width as needed
    height = 400 - margin.top - margin.bottom;

var xScale = d3.scaleLinear()
    .range([0, width]);

var yScale = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var svg = d3.select("#scatterplot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function updateScatterPlot(selectedProvince) {
    d3.csv("Tableau_dataset_copy_114.csv").then(function (data) {
        var filteredData = selectedProvince === "All" ? data : data.filter(function (d) {
            return d.province === selectedProvince;
        });

        xScale.domain([0, d3.max(filteredData, function (d) { return +d.price; })]);
        yScale.domain([d3.min(filteredData, function (d) { return +d.points; }), d3.max(filteredData, function (d) { return +d.points; })]);
        var circles = svg.selectAll("circle")
            .data(filteredData);

        circles.enter()
            .append("circle")
            .merge(circles) 
            .transition() 
            .duration(500)
            .attr("cx", function (d) { return xScale(d.price); })
            .attr("cy", function (d) { return yScale(d.points); })
            .attr("r", 5)
            .attr("fill", "steelblue");

        circles.exit().remove();

        svg.selectAll(".axis").remove(); 

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    });
}

updateScatterPlot("All");
