function intera(empenhos) {
   let i = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      // "data": { "url": "data/sp500.csv" },
      "data": { "values": empenhos },
      "hconcat": [
         // {
         //    "width": 480,
         //    "mark": "point",
         //    "encoding": {
         //       "x": {
         //          "field": "data_emissao_empenho",
         //          "type": "temporal",
         //          "timeUnit": "date",
         //          "scale": { "domain": { "param": "brush" } },
         //          "axis": { "title": "" }
         //       },
         //       "y": { "field": "valor_empenhado", "type": "quantitative" }
         //    }
         // },
         {
            "width": 480,
            "height": 200,
            "mark": "point",
            "params": [{
               "name": "brush",
               "select": { "type": "interval", "encodings": ["x"] }
            }],
            "encoding": {
               "x": {
                  "field": "data_emissao_empenho",
                  "type": "temporal",
                  "title": "Data"
               },
               "y": {
                  "field": "valor_empenhado",
                  "aggregate": "sum",
                  "type": "quantitative",
                  "axis": { "tickCount": 3, "grid": false }
               }
            }
         }, {
            with: 500,
            transform: [
               { "filter": { "param": "brush" } },
               {
                  aggregate: [{ op: "count", as: "Count" }],
                  groupby: ["tipo_processo_licitatorio"]
               }, {
                  joinaggregate: [{ op: "sum", field: "Count", as: "Total" }]
               }, {
                  calculate: "datum.Count/datum.Total", as: "PercentOfTotal"
               }
            ],
            mark: { type: "bar" },
            encoding: {
               x: {
                  title: "Percentual",
                  field: "PercentOfTotal",
                  type: "quantitative",
                  axis: {
                     format: ".1~%"
                  },
               },
               y: { field: "tipo_processo_licitatorio", title: "", },
               tooltip: [
                  { field: "PercentOfTotal", type: "quantitative", title: "Percentual", format: ".1~%" }]
            }
         }]
   }
   vegaEmbed("#intera", i);
}