const empenhos_em_rede = () => {
   let _rede = {};
   let mun = {};
   let empresas = {};
   let links = [];

   //Nós dos municípios
   let nos_municipios = empenhos
      .filter((e) => {
         if (!mun[e.nome_municipio]) {
            mun[e.nome_municipio] = e.nome_municipio;
            return e;
         }
      })
      .map((mun) => ({ no: mun.nome_municipio, group: 1 }));

   //Nós das empresas
   let nos_negociantes = empenhos
      .filter((e) => {
         //gerando os linkes entre os nós
         links.push({ source: e.nome_municipio, target: e.nome_negociante });

         if (!mun[e.nome_negociante]) {
            mun[e.nome_negociante] = e.nome_negociante;
            return e;
         }
      })
      .map((mun) => ({ no: mun.nome_negociante, group: 2 }));

   _rede["nodes"] = nos_municipios.concat(nos_negociantes);
   _rede["links"] = links;

   let nodesWithCountedEdges = _rede.nodes.map((node) => {
      let count = 0;
      _rede.links.forEach((li) => {
         if (li.source === node.no || li.target === node.no) {
            count = count + 1;
         }
      });
      return { ...node, edges: count };
   });

   _rede["nodes"] = nodesWithCountedEdges

   return _rede;
}


function joinPopComEmpenhosAgrupados() {
   let saida = [];
   pop.forEach((p) => {
      // empenhos_agrupados_por_municipio.forEach(e => {
      for (let i = 0; i < empenhos_agrupados_por_municipio.length; i++) {
         if (p.cidade === empenhos_agrupados_por_municipio[i].nome) {
            saida.push({ nome: empenhos_agrupados_por_municipio[i].nome, valor: empenhos_agrupados_por_municipio[i].valor, pop: p.pop });
            break;
         }
      }
   });


   let op = []
   pop.forEach(p => {
      let res = empenhos_agrupados_por_municipio.filter(e => p.cidade == e.nome);
      if (res.length <= 0) { op.push({ nome: p.cidade, valor: 0, pop: p.pop }) }
   })

   // return op; 
   return saida.concat(op);
}