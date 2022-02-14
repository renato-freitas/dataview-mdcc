function convert(value) {
   return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   }).format(value)
}

function barras(data) {
   let svg_bars = d3.select("#bars");
   data.forEach((d, i) =>
      svg_bars.append("rect")
         .attr("width", d.valor / 200000)
         .attr("height", 20)
         .attr("x", 5)
         .attr("y", i * 30 + 20)
         .attr("fill", "#4e79a7")
   );
   data.forEach((d, i) =>
      svg_bars.append("text")
         .attr("x", d.valor / 200000 + 10) // Configura a posição x de acordo com o índice do vetor
         .attr("y", i * 30 + 35)
         .text(`${d.nome}: ${convert(d.valor)}`)
   );
}


function barras2(empenhos) {
   const colors = {
      domain: ["Dispensa Licitação com Exceção", "Dispensa Licitação", "Inexigibilidade de Licitação", "Processo Licitatório", "Ata de Registro de Preço"],
      range: ["#16437c", "#141b46", "#396d9d", "#58b3cc", "#009cd0"]
   };
   var yourVlSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'A simple bar chart with embedded data.',
      with: 500,
      data: {
         values: empenhos
      },
      transform: [
         {
            aggregate: [{ op: "count", as: "Count" }],
            groupby: ["tipo_processo_licitatorio"]
         }, {
            joinaggregate: [{ op: "sum", field: "Count", as: "Total" }]
         }, {
            calculate: "datum.Count/datum.Total", as: "PercentOfTotal"
         }
      ],
      mark: { type: "bar", tooltip: true },
      encoding: {
         x: {
            title: "Percentual",
            field: "PercentOfTotal",
            type: "quantitative",
            axis: {
               format: ".1~%"
            },
         },
         y: { field: "tipo_processo_licitatorio", title: null, lenged: "ops" },
      }
   };
   vegaEmbed("#b2", yourVlSpec);
}




