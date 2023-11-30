var sc_margin = { top: 10, right: 30, bottom: 30, left: 150 },
    sc_width = 600 - sc_margin.left - sc_margin.right,
    sc_height = 250 - sc_margin.top - sc_margin.bottom;

var yScale = d3.scaleBand()
    .range([0, sc_height])
    .padding(0.1);

var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom()
    //.scale(d3.scaleLinear().domain([0, 100]).range([0, sc_width]));

var svg = d3.select("#barchart")
    .attr("width", sc_width + sc_margin.left + sc_margin.right)
    .attr("height", sc_height + sc_margin.top + sc_margin.bottom)
    .append("g")
    .attr("transform", "translate(" + sc_margin.left + "," + sc_margin.top + ")");

function updateBarChart(selectedVariety) {
    d3.csv("Tableau_dataset.csv").then(function(data) {
        var filteredData = selectedVariety === "All" ? data : data.filter(function(d) {
            return d.variety === selectedVariety;
        });

        var wineryCounts = d3.rollup(filteredData, v => v.length, d => d.winery);
        
        var topWineries = Array.from(wineryCounts, ([key, value]) => ({ winery: key, count: value }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
        console.log(topWineries)
        yScale.domain(topWineries.map(d => d.winery));
        xAxis.scale(d3.scaleLinear().domain([0, topWineries[0].count]).range([0, sc_width]));
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(topWineries, d => d.count)])
            .range([0, sc_width]);

        var bars = svg.selectAll(".bar")
            .data(topWineries);

        bars.enter()
            .append('rect')
            .attr("class", "bar")
            .attr("y", d => yScale(d.winery))
            .attr("height", yScale.bandwidth())
            .attr("x", 0)
            .attr("width", 0)
            .attr("fill", "#BA2926")
            .merge(bars)
            .transition()
            .duration(1000)
            .delay(function(d, i) { return i * 100; })
            .attr("width", d => xScale(d.count));

        bars.exit().remove();

        svg.selectAll(".axis").remove();

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + sc_height + ")")
            .call(xAxis);
        var yAxisGen = d3.axisBottom().scale(yAxis)
        yAxisGen.tickFormat((d) => { return d })
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .style("transform", `translateX(${ 0}px)`)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-35)")
        yAxisGen.ticks(10);

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "middle")
            .attr("x", sc_width / 2)
            .attr("y", sc_height + sc_margin.bottom)
            .text("Number of Wines");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("x", -sc_height / 2)
            .attr("y", -100)
            .attr("transform", "rotate(-90)")
            .text("Winery");
    });
}

updateBarChart("All");