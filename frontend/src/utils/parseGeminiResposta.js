export function parseGeminiResposta(texto) {
  return {
    nome: extrairCampo(texto, "Nome do local"),
    descricao: extrairCampo(texto, "Descrição curta"),
    motivo: extrairCampo(texto, "Motivo da escolha"),
    link: extrairCampo(texto, "Link do Google Maps"),
  };
}

function extrairCampo(texto, campo) {
  const regex = new RegExp(`\\*\\*${campo}:\\*\\*\\s*(.*)`, "i");
  const match = texto.match(regex);
  return match ? match[1].trim() : "❌ Campo não encontrado";
}
