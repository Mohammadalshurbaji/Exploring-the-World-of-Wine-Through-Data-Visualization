d3.csv("Tableau_dataset_copy_114.csv").then(function (dataset) {

  d3.json("mydata.json").then(function (map_data) {

      var province_counts = {};
      dataset.forEach(function (d) {
          var province = d.province;
          province_counts[province] = (province_counts[province] || 0) + 1;
      });

      var size_hm = 1000;
      var svg = d3.select("#map")
          .attr("width", size_hm)
          .attr("height", size_hm / 2);

      var projection = d3.geoEquirectangular().fitWidth(size_hm, { type: "Sphere" });

      var pathGenerator = d3.geoPath().projection(projection);

      svg.append("path").attr("d", pathGenerator({ type: "Sphere" })).attr("fill", "lightblue");

      var colorScale = d3.scaleSequential().domain([d3.min(Object.values(province_counts)), d3.max(Object.values(province_counts))])
          .interpolator(d3.interpolateOranges);

      var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

      svg.selectAll(".country")
          .data(map_data.features)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", pathGenerator)
          .attr("fill", d => colorScale(province_counts[d.properties.name]))
          .on("mouseover", function (event, d) {
              updateScatterPlot(d.properties.name);
              updateSankeyDiagram(d.properties.name);
              tooltip.transition()
                  .duration(200)
                  .style("opacity", .9);
              tooltip.html(d.properties.name + ": " + province_counts[d.properties.name] + " wines")
                  .style("left", (event.pageX) + "px")
                  .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function (d) {
              tooltip.transition()
                  .duration(500)
                  .style("opacity", 0);
          });
  });
});
function updateScatterPlot(selectedProvince) {
}
function updateSankeyDiagram(selectedProvince) {
  }
