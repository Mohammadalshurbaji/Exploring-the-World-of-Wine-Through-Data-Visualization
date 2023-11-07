d3.csv("Tableau_dataset_copy_114.csv").then(function (dataset) {
  d3.json("mydata.json").then(function (mapdata) {
      var provinceCounts = {};
      dataset.forEach(function (d) {
          var province = d.province;
          provinceCounts[province] = (provinceCounts[province] || 0) + 1;
      });

      var size = 1000;
      var svg = d3.select("#map")
          .attr("width", size)
          .attr("height", size / 2);

      var projection = d3.geoEquirectangular()
          .fitWidth(size, { type: "Sphere" });

      var pathGenerator = d3.geoPath().projection(projection);

      svg.append("path")
          .attr("d", pathGenerator({ type: "Sphere" }))
          .attr("fill", "lightblue");

      var colorScale = d3.scaleSequential()
          .domain([d3.min(Object.values(provinceCounts)), d3.max(Object.values(provinceCounts))])
          .interpolator(d3.interpolateOranges);

      // Tooltip setup
      var tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

      svg.selectAll(".country")
          .data(mapdata.features)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", pathGenerator)
          .attr("fill", d => colorScale(provinceCounts[d.properties.name]))
          .on("mouseover", function (event, d) {
              // Update the scatterplot with the hovered province
              updateScatterPlot(d.properties.name);
              updateSankeyDiagram(d.properties.name);
              // Show the tooltip
              tooltip.transition()
                  .duration(200)
                  .style("opacity", .9);
              tooltip.html(d.properties.name + ": " + provinceCounts[d.properties.name] + " wines")
                  .style("left", (event.pageX) + "px")
                  .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function (d) {
              // Optionally, you could update the scatterplot to show all data again
              // updateScatterPlot("All");

              // Hide the tooltip
              tooltip.transition()
                  .duration(500)
                  .style("opacity", 0);
          });
  });
});

// This function must be defined in the scatterplot.js or in a <script> tag before this script
function updateScatterPlot(selectedProvince) {
  // Implementation that updates the scatterplot with the data from the selected province
}
function updateSankeyDiagram(selectedProvince) {
    // Implementation that updates the scatterplot with the data from the selected province
  }
