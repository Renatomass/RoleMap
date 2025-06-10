const axios = require("axios");
require("dotenv").config(); 
async function consultarGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("❌ API Key do Gemini não encontrada no .env");
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const resposta = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return resposta || "Nenhuma sugestão retornada pelo Gemini.";
  } catch (error) {
    console.error("❌ Erro ao consultar Gemini:", error.response?.data || error.message);
    throw new Error("Falha ao consultar Gemini");
  }
}

module.exports = consultarGemini;
