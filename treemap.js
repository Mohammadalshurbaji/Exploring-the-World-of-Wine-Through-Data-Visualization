function updateScatterPlot(variety) {}

function updateBarChart(variety) {}

function updateDonutChart(variet) {}

document.addEventListener('DOMContentLoaded', () => {
    fetch("./new_dataset.json")
        .then(res => res.json())
        .then(res => {
            drawTreeMap(res);
        });
});

const drawTreeMap = (dataset) => {
    const hierarchy = d3.hierarchy(dataset)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    const treemap = d3.treemap()
        .size([600, 250])
        .padding(1);

    const root = treemap(hierarchy);

    const colorScale = d3.scaleLinear()
        .domain([0, d3.max(root.leaves(), d => d.data.value)])
        .range(["#DB5957","#651715"]);

    const svg = d3.select("#treemap").append("svg")
        .attr("width", 600)
        .attr("height", 250);

    svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => colorScale(d.data.value))
        .attr("stroke", "#fff")
        .on("click", function(event, d) {
            console.log(d.data.name)
            updateScatterPlot(d.data.name)
            updateBarChart(d.data.name);
            updateDonutChart(d.data.name);
        })
        .append("title")
        .text(d => `${d.data.name}: ${d.data.value}`);


    svg.selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", d => (d.x0 + d.x1) / 2)
        .attr("y", d => (d.y0 + d.y1) / 2)
        .attr("dy", "0.35em")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .text(d => d.data.name)
        .each(function(d) {
            const textWidth = this.getComputedTextLength();
            const textHeight = parseInt(window.getComputedStyle(this).fontSize);

            if (textWidth < (d.x1 - d.x0) && textHeight < (d.y1 - d.y0)) {
                d3.select(this).style("visibility", "visible");
            } else {
                d3.select(this).style("visibility", "hidden");
            }
        });
};