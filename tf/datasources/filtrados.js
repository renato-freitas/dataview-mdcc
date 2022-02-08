function filtrados(empenhos, selectedCity) {
   if (selectedCity !== "Todas") {
      return empenhos.filter(e => e.nome_municipio.includes(selectedCity))
   }
   return empenhos;
}