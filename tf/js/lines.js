function line(empenhos) {
   let l1 = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "Stock prices of 5 Tech Companies over Time.",
      "data": { "values": empenhos },
      "width": 400,
      "mark": {
         "type": "line",
         "point": true
      },
      "encoding": {
         "x": { "timeUnit": "year", "field": "data_emissao_empenho", "title": "Ano" },
         "y": { "aggregate": "count", "field": "numero_empenho", "type": "quantitative", "title": "Quantidade" }
      }
   }
   vegaEmbed("#line", l1);
}

function line2(empenhos) {
   let l2 = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "Stock prices of 5 Tech Companies over Time.",
      "data": { "values": empenhos },
      "width": 400,
      "mark": {
         "type": "line",
         "point": true
      },
      "encoding": {
         "x": { "timeUnit": "year", "field": "data_emissao_empenho", "title": "Ano" },
         "y": { "aggregate": "sum", "field": "valor_empenhado", "type": "quantitative", "title": "Montante" }
      }
   }
   vegaEmbed("#line2", l2);
}