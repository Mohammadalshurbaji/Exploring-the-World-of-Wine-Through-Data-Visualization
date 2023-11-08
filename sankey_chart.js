var sankey_data;

var sankey_margin = { top: 10, right: 30, bottom: 10, left: 100 },sankey_width = 700 - sankey_margin.left - sankey_margin.right,sankey_height = 400 - sankey_margin.top - sankey_margin.bottom;

var sankey_svg = d3.select("#sankey_chart").append("svg").attr("width", sankey_width + sankey_margin.left + sankey_margin.right).attr("height", sankey_height + sankey_margin.top + sankey_margin.bottom)
  .append("g").attr("transform","translate(" + sankey_margin.left + "," + sankey_margin.top + ")");

var sankey_chart = d3.sankey().nodeWidth(36).nodePadding(40).extent([[1, 1], [sankey_width - 1, sankey_height - 5]]);

d3.csv("Tableau_dataset_copy_114.csv").then(function(data) {
    sankey_data = data;
    updateSankeyDiagram("All");
});

function updateSankeyDiagram(selectedProvince) {
    var filteredData = selectedProvince === "All" ? sankey_data : sankey_data.filter(function(d) {
        return d.province === selectedProvince;
    });

    var chart_data = {
        nodes: [],
        links: []
    };

    function findOrAddNode(name) {
        var node = chart_data.nodes.find(n => n.name === name);
        if (!node) {
            node = { name: name };
            chart_data.nodes.push(node);
        }
        return chart_data.nodes.indexOf(node);
    }

    filteredData.forEach(function(d) {
        var sourceIndex = findOrAddNode(d.variety);
        var targetIndex = findOrAddNode(d.winery);
        var link = { source: sourceIndex, target: targetIndex, value: 1 };
        chart_data.links.push(link);
    });

    sankey_chart(chart_data);

    sankey_svg.selectAll(".link").remove(); 
    var link = sankey_svg.append("g").selectAll(".link").data(chart_data.links).enter()
        .append("path").attr("class", "link").attr("d", d3.sankeyLinkHorizontal()).style("stroke-width", d => Math.max(1, d.width));

    sankey_svg.selectAll(".node").remove(); 
    var node = sankey_svg.append("g").selectAll(".node").data(chart_data.nodes).enter().append("g")
          .attr("class", "node").attr("transform", d => `translate(${d.x0},${d.y0})`);

    node.append("rect").attr("height", d => d.y1 - d.y0).attr("width", sankey_chart.nodeWidth()).style("fill", "#d3d3d3");

    node.append("text").attr("x", -6).attr("y", d => (d.y1 - d.y0) / 2).attr("dy", "0.35em")
        .attr("text-anchor", "end").text(d => d.name);
}

window.updateSankeyDiagram = updateSankeyDiagram;
