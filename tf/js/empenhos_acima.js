function scatters(empenhos) {
   let minDotacao = d3.min(empenhos.map((e) => e.valor_anterior_saldo_dotacao));
   let maxDotacao = d3.max(empenhos.map((e) => e.valor_anterior_saldo_dotacao));
   let minValor = d3.min(empenhos.map((e) => e.valor_empenhado));
   let maxValor = d3.max(empenhos.map((e) => e.valor_empenhado));

   const margin = { top: 30, right: 10, bottom: 50, left: 80 };
   const svgwidth = (window.screen.width / 2) - margin.left - margin.right;
   const svgheight = (window.screen.height / 2.1) - margin.top - margin.bottom;


   let svg_scatters = d3.select("#scatters")
      .append("svg")
      .attr("width", (window.screen.width / 2) + margin.left + margin.right)
      .attr("height", svgheight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



   const xScale = d3
      .scaleLinear()
      .domain([0, maxDotacao])
      .range([1, svgwidth]);

   const yScale = d3
      .scaleLinear()
      .domain([0, maxValor])
      .range([svgheight, 10]);

   const xAxis = d3.axisBottom().scale(xScale);
   const yAxis = d3.axisLeft().scale(yScale);


   svg_scatters.append("g")
      .attr("transform", "translate(0, " + svgheight + ")")
      .call(xAxis);

   svg_scatters.append("g")
      .call(yAxis);


   svg_scatters.selectAll("circle")
      .data(empenhos)
      .enter()
      .append("circle")
      .attr("fill", (d) =>
         d.valor_empenhado > d.valor_anterior_saldo_dotacao
            ? "#f28e2c"
            : "#3b84d1"
         // : "#4e79a7"
      )
      .attr("stroke-width", 1.5)
      .attr("fill-opacity", 0.6)
      .attr("cx", (d) => xScale(d.valor_anterior_saldo_dotacao))
      .attr("cy", (d) => yScale(d.valor_empenhado))
      .attr("r", 4)
      .attr(
         "transform",
         "translate(20,0)"
      );

   svg_scatters
      .append("text")
      .attr(
         "transform",
         "translate(" + svgheight + "," + (svgheight + margin.bottom) + ")"
      )
      .style("text-anchor", "middle")
      .text("Saldo Dotação");

   svg_scatters
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - svgheight / 2)
      .attr("dy", "0.65em")
      .style("text-anchor", "middle")
      .text("Valores Empenhados");
}