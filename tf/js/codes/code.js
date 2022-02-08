const emp = require('./empenhos.json')
let empp = emp.map(e => {
   return {
      ...e,
      tipo_processo_licitatorio: mapeaTipoLicitacao(e.tipo_processo_licitatorio),
      codigo_tipo_negociante: mapeaTipoCredor(e.codigo_tipo_negociante)
   }
});

function mapeaTipoLicitacao(tipoLicitacao) {
   switch (tipoLicitacao) {
      case "D":
         return "Dispensa Licitação com Exceção";
         break;
      case "F":
         return "Dispensa Licitação";
         break;
      case "I":
         return "Inexigibilidade de Licitação";
         break;
      case "N":
         return "Processo Licitatório";
         break;
      case "R":
         return "Ata de Registro de Preço";
         break;
      case "P":
         return "Regras Próprias Org. Internacionais"
         break
      default:
         break;
   }
}

function mapeaTipoCredor(tipoCredor) {
   switch (tipoCredor) {
      case 1:
         return "CNPJ";
         break;
      case 2:
         return "CPF";
         break;
      case 6:
         return "Folha de Pagamento";
         break;
      case 7:
         return "Diárias";
         break;
      default:
         break;
   }
}

// let t = {}
// function getTiposNegociantes(tipo) {
//    t[tipo] = tipo
// }
console.log(empp)