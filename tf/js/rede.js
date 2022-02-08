function rede(empenhos) {

   let calculate_edges = d3.scaleSqrt()
      .domain(d3.extent(empenhos.nodes, (d) => d.edges))
      .range([5, 20]);

   var svg = d3.select("#rede"),
      width = 530,
      height = 380;

   var color = d3.scaleOrdinal(d3.schemeCategory20);

   var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function (d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

   var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(empenhos.links)
      .enter().append("line")
      .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

   var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(empenhos.nodes)
      .enter().append("g")

   var circles = node.append("circle")
      .attr("r", function (d) { return calculate_edges(d.edges); })
      .attr("fill", function (d) { return color(d.group); });

   // Create a drag handler and append it to the node object instead
   var drag_handler = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

   drag_handler(node);

   // var lables = node.append("text")
   //    .text(function (d) {
   //       let cont = 0
   //       if (cont < 4 && d.group === 2) {
   //          cont++
   //          return d.id;
   //       }
   //    })
   //    .attr('x', 6)
   //    .attr('y', 3);

   node.append("title")
      .text(function (d) { return `${d.id}\nConexões: ${d.edges}`; });

   simulation
      .nodes(empenhos.nodes)
      .on("tick", ticked);

   simulation.force("link")
      .links(empenhos.links);

   function ticked() {
      link
         .attr("x1", function (d) { return d.source.x; })
         .attr("y1", function (d) { return d.source.y; })
         .attr("x2", function (d) { return d.target.x; })
         .attr("y2", function (d) { return d.target.y; });

      node
         .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
         })
   }

   function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
   }

   function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
   }

   function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
   }

}

