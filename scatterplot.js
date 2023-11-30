var scatterplotMargin = { top: 10, right: 30, bottom: 30, left: 50 },
    scatterplotWidth = 600 - scatterplotMargin.left - scatterplotMargin.right,
    scatterplotHeight = 250 - scatterplotMargin.top - scatterplotMargin.bottom;

var scatterplotXScale = d3.scaleLinear().range([0, scatterplotWidth]);
var scatterplotYScale = d3.scaleLinear().range([scatterplotHeight, 0]);

var scatterplotXAxis = d3.axisBottom(scatterplotXScale);
var scatterplotYAxis = d3.axisLeft(scatterplotYScale);



var scatterplotSvg = d3.select("#scatterplot")
    .attr("width", scatterplotWidth + scatterplotMargin.left + scatterplotMargin.right)
    .attr("height", scatterplotHeight + scatterplotMargin.top + scatterplotMargin.bottom)
    .append("g")
    .attr("transform", "translate(" + scatterplotMargin.left + "," + scatterplotMargin.top + ")");

function updateScatterPlot(selectedVariety) {
    d3.csv("Tableau_dataset.csv").then(function(data) {
        var filteredData = selectedVariety === "All" ? data : data.filter(function(d) {
            return d.variety === selectedVariety;
        });

        scatterplotXScale.domain([0, d3.max(filteredData, function(d) { return +d.price; })]);
        scatterplotYScale.domain([d3.min(filteredData, function(d) { return +d.points; }) - 3, d3.max(filteredData, function(d) { return +d.points; })]);

        var dots = scatterplotSvg.selectAll("circle")
            .data(filteredData);


        dots.exit().remove();


        dots.transition()
            .duration(1000)
            .attr("cx", function(d) { return scatterplotXScale(d.price); })
            .attr("cy", function(d) { return scatterplotYScale(d.points); });


        dots.enter()
            .append("circle")
            .attr("r", 2)
            .style("fill", "#BA2926")
            .attr("cx", function(d) { return scatterplotXScale(d.price); })
            .attr("cy", function(d) { return scatterplotYScale(d.points); })
            .append('title')
            .text(function(d) { return d.winery; })
            .attr("opacity", 0)
            .transition()
            .duration(2000)
            .delay(function(d, i) { return i * 50; })
            .attr("opacity", 1);


        scatterplotSvg.selectAll(".axis").remove();

        scatterplotSvg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + scatterplotHeight + ")")
            .transition()
            .duration(1000)
            .call(scatterplotXAxis);

        scatterplotSvg.append("g")
            .attr("class", "y axis")
            .transition()
            .duration(1000)
            .call(scatterplotYAxis);


        scatterplotSvg.select(".x.label")
            .transition()
            .duration(1000)
            .attr("x", scatterplotWidth / 3)
            .attr("y", scatterplotHeight + scatterplotMargin.bottom);

        scatterplotSvg.select(".y.label")
            .transition()
            .duration(1000)
            .attr("x", -scatterplotHeight / 2)
            .attr("y", -30);
        scatterplotSvg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "middle")
            .attr("x", scatterplotWidth / 2)
            .attr("y", scatterplotHeight + scatterplotMargin.bottom)
            //.text("Price of Wines");

        scatterplotSvg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("x", -scatterplotHeight / 2)
            .attr("y", -30)
            .attr("transform", "rotate(-90)")
            .text("Points");
    });

}

updateScatterPlot("All");