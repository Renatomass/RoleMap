const axios = require('axios');
require('dotenv').config();
const logger = require('../utils/logger');

exports.getRespostaGemini = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const texto = response.data.candidates[0].content.parts[0].text;
    return JSON.parse(texto); 
  } catch (error) {
    logger.error("❌ Erro ao chamar Gemini:", error.message);
    throw error;
  }
};
