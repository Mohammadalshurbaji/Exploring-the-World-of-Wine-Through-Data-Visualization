// Load data from CSV
d3.csv("Tableau_dataset_copy_114.csv").then(function(dataset) {
    // Define margin, width, and height
    var margin = { top: 20, right: 30, bottom: 30, left: 40 };
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    // Create an SVG element
    var svg = d3.select("#scatter-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create scales for x and y axes
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return +d.price; })])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return +d.points; })])
        .range([height, 0]);

    // Create x and y axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // Append the axes to the SVG
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    // Create the scatter plot points
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(+d.price); })
        .attr("cy", function(d) { return yScale(+d.points); })
        .attr("r", 5) // Adjust the radius as needed
        .attr("fill", "red"); // Change the point color

    // Add labels for the points
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) { return d.variety; })
        .attr("x", function(d) { return xScale(+d.price) + 10; }) // Adjust the label position
        .attr("y", function(d) { return yScale(+d.points); })
        .attr("font-size", "12px")
        .attr("fill", "black"); // Change the label color
});