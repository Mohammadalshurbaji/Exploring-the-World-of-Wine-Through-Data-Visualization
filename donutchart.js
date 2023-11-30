var chartWidth = 500;
var chartHeight = 300;
var chartMargin = 10;
var chartRadius = Math.min(chartWidth, chartHeight) / 2 - chartMargin;

var svgd = d3.select("#donutchart")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .append("g")
    .attr("transform", "translate(" + 300 + "," + chartHeight / 2 + ")");

function updateDonutChart(selectedVariety) {
    d3.csv("Tableau_dataset.csv").then(function(data) {
        var filteredData = selectedVariety === "All" ? data : data.filter(function(d) {
            return d.variety === selectedVariety;
        });

        var tasterCount = d3.rollup(filteredData, v => v.length, d => d.taster_name);
        console.log("taster:", tasterCount);

        var pieData = Array.from(tasterCount, ([key, value]) => ({ key, value }));
        console.log("data", pieData);

        var color = d3.scaleOrdinal()
            .domain(pieData.map(d => d.key))
            .range(["#BA2926", "#f8dadc", "red"]);

        var pie = d3.pie().value(function(d) { return d.value; });
        var data_ready = pie(pieData);

        console.log("variety", selectedVariety);

        svgd.selectAll('path').remove();

        svgd.selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc().innerRadius(100).outerRadius(chartRadius))
            .attr('fill', d => color(d.data.key))
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            .append("title") 
            .text(d => `${d.data.key}: ${d.data.value}`);
    });
}

updateDonutChart("All");
