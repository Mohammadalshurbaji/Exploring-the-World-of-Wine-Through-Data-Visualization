d3.csv("Tableau_dataset_copy_114.csv").then(
    function(dataset) {
        d3.json("mydata.json").then(function(mapdata) {
            var provinceCounts = {};
            console.log(mapdata)
            d3.map(dataset, function(d) {
                var province = d.province;
                provinceCounts[province] = (provinceCounts[province] || 0) + 1;
            });
            console.log(provinceCounts)
            var size = 800;

            var svg = d3.select("svg")
                .attr("width", size)
                .attr("height", size / 2);

            /*var projection = d3.geoEqualEarth()
                                .fitWidth(size,{type:"Sphere"})*/
            var projection = d3.geoOrthographic()
                .fitWidth(size / 3, { type: "Sphere" })

            var pathGenerator = d3.geoPath(projection)
            console.log(pathGenerator)
            var earth = svg.append("path")
                .attr("d", pathGenerator({ type: "Sphere" }))
                .attr("fill", "lightblue")

            var graticulae = svg.append("path")
                .attr("d", pathGenerator(d3.geoGraticule10()))
                .attr("stroke", "gray")
                .attr("fill", "none")
            console.log(d3.max(Object.values(provinceCounts)))

            var colorScale = d3.scaleSequential()
                .domain([d3.min(Object.values(provinceCounts)), d3.max(Object.values(provinceCounts))])
                .interpolator(d3.interpolateReds);

            var countries = svg.append("g")
                .selectAll(".country")
                .data(mapdata.features) // Use topojson.feature to extract the countries feature
                .enter()
                .append("path")
                .attr("class", "country")
                .attr("d", d => pathGenerator(d))
                .attr("fill", d => colorScale(provinceCounts[d.properties.name]))


        })
    })