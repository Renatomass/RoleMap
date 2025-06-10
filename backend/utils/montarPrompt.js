function montarPrompt({ pontoMedio, preferencias }) {
  const { latitude, longitude } = pontoMedio;
  const {
    nome_role,
    tipo_role,
    palavras_chave,
    distancia,
    preco,
    avaliacao_minima,
  } = preferencias;

  return `
  Você é um especialista em recomendação de locais.

  A missão: sugerir um local ideal para um rolê.

  Dados do grupo:
  - Localização média: Latitude ${latitude}, Longitude ${longitude}
  - Tipo de rolê: ${tipo_role}
  - Nome do rolê: ${nome_role}
  - Palavras-chave: ${palavras_chave}
  - Distância máxima: ${distancia}
  - Preço desejado: ${preco}
  - Avaliação mínima: ${avaliacao_minima}

  **Formato de resposta (sem rodeios):**
- **Nome do local:**
- **Descrição curta:**
- **Motivo da escolha:**
- **Link do Google Maps (ou especifique o nome completo e endereço para busca):**
- **Contato se disponível (telefone, site, Instagram etc):**

Seja objetivo, profissional e útil como um consultor de locais. Não invente locais fictícios. Use nomes reais e relevantes para o Brasil.`.trim();
}

module.exports = montarPrompt; 
