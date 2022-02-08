function filtra_grafo(grafo, cidade) {
   const N = 50
   let CIDADE = "";
   let nos_target = [];
   let nodesFound = {};
   let allFoundLinks = [];
   let linksByCidade = [];

   if (cidade !== "TODAS") {
      CIDADE = cidade.toUpperCase();
      linksByCidade = grafo.links.filter((f) => f.source == CIDADE);
   } else {
      for (let i = 0; i <= N; i++) {
         linksByCidade.push(grafo.links[i]);
      }
   }

   linksByCidade.forEach((fl) => {
      grafo.links.forEach((l) => {
         if (fl.target == l.target) {
            allFoundLinks.push(l);
         }
      });
   });

   allFoundLinks.forEach((fl) => {
      grafo.nodes.forEach((no) => {
         if (!nodesFound[fl.source] && fl.source == no.id) {
            nos_target.push(no);
            nodesFound[fl.source] = no;
         }
         if (!nodesFound[fl.target] && fl.target == no.id) {
            nos_target.push(no);
            nodesFound[fl.target] = no;
         }
      });
   });

   let no = [];
   if (cidade !== "TODAS") {
      no = grafo.nodes.find((e) => e.id == CIDADE);
      nos_target.push(no);
   } else {
      for (let j = 0; j <= N; j++) {
         no = grafo.nodes[j];
         nos_target.push(no);
      }
   }

   return { nodes: nos_target, links: allFoundLinks };
}