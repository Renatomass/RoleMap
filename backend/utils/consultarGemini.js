const axios = require("axios");
require("dotenv").config();

// 🟡 Utilitário para extrair dados da resposta bruta
function extrairCampo(texto, campo) {
  const regex = new RegExp(`\\*\\*${campo}:\\*\\*\\s*(.+)`);
  const match = texto.match(regex);
  return match ? match[1].trim() : "";
}

function parseRespostaGemini(texto) {
  return {
    nome: extrairCampo(texto, "Nome do local"),
    descricao: extrairCampo(texto, "Descrição curta"),
    motivo: extrairCampo(texto, "Motivo da escolha"),
    nota: extrairCampo(texto, "Nota Estabelecimento"),
    link: extrairCampo(texto, "Link do Google Maps"),
  };
}

async function consultarGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("❌ API Key do Gemini não encontrada.");

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const texto = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  console.log("🟢 Resposta crua do Gemini:", texto);

  const resultado = parseRespostaGemini(texto);
  console.log("📦 Sugestão estruturada:", resultado);

  return resultado;
}

module.exports = consultarGemini;
  