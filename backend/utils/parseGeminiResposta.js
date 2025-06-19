function parseGeminiResposta(texto) {
  const nomeMatch = texto.match(/\*{2}Nome do local:\*{2}\s*(.+)/);
  const descMatch = texto.match(/\*{2}Descrição curta:\*{2}\s*(.+)/);
  const motivoMatch = texto.match(/\*{2}Motivo da escolha:\*{2}\s*(.+)/);
  const linkMatch = texto.match(/\*{2}Link do Google Maps.*:\*{2}\s*(.+)/);

  return {
    nome: nomeMatch?.[1]?.trim() || "Local secreto",
    descricao: descMatch?.[1]?.trim() || "",
    motivo: motivoMatch?.[1]?.trim() || "",
    imagem: "https://source.unsplash.com/400x300/?restaurant", // placeholder
    distancia: "2km",
    nota: 4.5,
    link: linkMatch?.[1]?.trim() || "",
  };
}

module.exports = parseGeminiResposta;
