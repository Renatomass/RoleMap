function montarPrompt({ pontoMedio, preferencias }) {
  const { latitude, longitude } = pontoMedio;
  const { tipo_role, palavras_chave, distancia, preco, avaliacao_minima } = preferencias;

  const promptFinal = `
Você é um especialista em recomendação de locais.

A missão: sugerir um local ideal para um rolê.

Dados do grupo:
- Localização média: Latitude ${latitude}, Longitude ${longitude}
- Tipo de rolê: ${tipo_role}
- Palavras-chave: ${palavras_chave}
- Distância máxima: ${distancia}
- Preço desejado: ${preco}
- Avaliação mínima: ${avaliacao_minima}

📝 **Formato de resposta (exato e direto, sem variações nos nomes dos campos):**
- **Nome do local:** [nome exato]
- **Descrição curta:** [descrição com no máximo 2 linhas]
- **Motivo da escolha:** [resuma em uma frase o motivo da escolha]
- **Distancia:** [Distancia do ponto medio para o local sugerido]
- **Nota:** [número de 0 a 5 com base no Google]
- **Link:** [endereço completo do local no Google Maps]
- **Imagem:** [URL real da imagem do local - busque online se necessário, preferencialmente do site oficial, Google Maps ou redes sociais. Não invente.]

Atenção:
- Não invente lugares fictícios.
- Use locais reais no Brasil, especialmente próximos à localização fornecida.
- Seja profissional, conciso e evite rodeios.

`.trim();

  console.log("🟡 Prompt final para o Gemini:\n", promptFinal);
  return promptFinal;
}

module.exports = montarPrompt;
