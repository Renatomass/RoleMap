
function extrairCampo(texto, campos) {
  const listaCampos = Array.isArray(campos) ? campos : [campos];

  for (const campo of listaCampos) {
    const regex = new RegExp(`\\*\\*${campo}:\\*\\*\\s*(.+)`, "i");
    const match = texto.match(regex);
    if (match) return match[1].trim().replace(/\*\*/g, "");
  }

  return "";
}

function parseGeminiResposta(texto) {
  const placeholderImg = "../assets/restaurante.jpg";
  const imagemExtraida = extrairCampo(texto, [
    "Imagem",
    "Imagem do local",
    "Imagem do local (URL real de imagem)",
    "Imagem do estabelecimento",
  ]);

  return {
    nome: extrairCampo(texto, "Nome do local"),
    descricao: extrairCampo(texto, "Descrição curta"),
    motivo: extrairCampo(texto, "Motivo da escolha"),
    distancia: extrairCampo(texto, "Distancia"),
    nota: extrairCampo(texto, ["Nota", "Nota do Estabelecimento"]),
    link: extrairCampo(texto, "Link"),
    imagem: imagemExtraida || placeholderImg
  };
}

module.exports = { parseGeminiResposta };
