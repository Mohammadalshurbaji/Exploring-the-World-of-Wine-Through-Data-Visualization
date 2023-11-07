var sankeyData;

var sankeyMargin = { top: 10, right: 30, bottom: 10, left: 100 },
    sankeyWidth = 700 - sankeyMargin.left - sankeyMargin.right,
    sankeyHeight = 400 - sankeyMargin.top - sankeyMargin.bottom;

var sankeySvg = d3.select("#sankey_chart")
  .append("svg")
    .attr("width", sankeyWidth + sankeyMargin.left + sankeyMargin.right)
    .attr("height", sankeyHeight + sankeyMargin.top + sankeyMargin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + sankeyMargin.left + "," + sankeyMargin.top + ")");

var sankeyChart = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .extent([[1, 1], [sankeyWidth - 1, sankeyHeight - 5]]);

d3.csv("Tableau_dataset_copy_114.csv").then(function(data) {
    sankeyData = data;
    updateSankeyDiagram("All");
});

function updateSankeyDiagram(selectedProvince) {
    var filteredData = selectedProvince === "All" ? sankeyData : sankeyData.filter(function(d) {
        return d.province === selectedProvince;
    });

    var chartData = {
        nodes: [],
        links: []
    };

    function findOrAddNode(name) {
        var node = chartData.nodes.find(n => n.name === name);
        if (!node) {
            node = { name: name };
            chartData.nodes.push(node);
        }
        return chartData.nodes.indexOf(node);
    }

    filteredData.forEach(function(d) {
        var sourceIndex = findOrAddNode(d.variety);
        var targetIndex = findOrAddNode(d.winery);
        var link = { source: sourceIndex, target: targetIndex, value: 1 };
        chartData.links.push(link);
    });

    sankeyChart(chartData);

    sankeySvg.selectAll(".link").remove(); 
    var link = sankeySvg.append("g")
        .selectAll(".link")
        .data(chartData.links)
        .enter()
        .append("path")
          .attr("class", "link")
          .attr("d", d3.sankeyLinkHorizontal())
          .style("stroke-width", d => Math.max(1, d.width));

    sankeySvg.selectAll(".node").remove(); 
    var node = sankeySvg.append("g")
        .selectAll(".node")
        .data(chartData.nodes)
        .enter()
        .append("g")
          .attr("class", "node")
          .attr("transform", d => `translate(${d.x0},${d.y0})`);

    node.append("rect")
        .attr("height", d => d.y1 - d.y0)
        .attr("width", sankeyChart.nodeWidth())
        .style("fill", "#d3d3d3");

    node.append("text")
        .attr("x", -6)
        .attr("y", d => (d.y1 - d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .text(d => d.name);
}

window.updateSankeyDiagram = updateSankeyDiagram;
