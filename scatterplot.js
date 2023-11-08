var sc_margin = { top: 10, right: 30, bottom: 30, left: 50 }, 
    sc_width = 400 - sc_margin.left - sc_margin.right, 
    sc_height = 400 - sc_margin.top - sc_margin.bottom;

var xScale = d3.scaleLinear()
    .range([0, sc_width]);

var yScale = d3.scaleLinear()
    .range([sc_height, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var svg = d3.select("#scatterplot").attr("width", sc_width + sc_margin.left + sc_margin.right)
    .attr("height", sc_height + sc_margin.top + sc_margin.bottom).append("g")
    .attr("transform", "translate(" + sc_margin.left + "," + sc_margin.top + ")");

function updateScatterPlot(selectedProvince) {
    d3.csv("Tableau_dataset_copy_114.csv").then(function (d1) {
        var new_data = selectedProvince === "All" ? d1 : d1.filter(function (d) {
            return d.province === selectedProvince;
        });

        xScale.domain([0, d3.max(new_data, function (d) { return +d.price; })]);
        yScale.domain([d3.min(new_data, function (d) { return +d.points; }), d3.max(new_data, function (d) { return +d.points; })]);

        var dots = svg.selectAll("circle")
        .data(new_data);
    
    dots.enter()
        .append('circle')
        .attr("r", 5)
        .style("fill", "red");
    
    dots.exit().remove();
    
    dots.attr("cx", function (d) { return xScale(d.price); })
        .attr("cy", function (d) { return yScale(d.points); });
    

        svg.selectAll(".axis").remove(); 

        svg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + sc_height + ")").call(xAxis);

        svg.append("g").attr("class", "y axis").call(yAxis);
        svg.append("text").attr("class", "x label").attr("text-anchor", "middle").attr("x", sc_width / 2)
        .attr("y", sc_height + 30).text("Price");
        svg.append("text").attr("class", "y label").attr("text-anchor", "middle")
        .attr("x", -sc_height / 2).attr("y", -30).attr("transform", "rotate(-90)").text("Points");
    });
    
}

updateScatterPlot("All");

