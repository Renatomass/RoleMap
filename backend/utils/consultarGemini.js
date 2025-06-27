const axios = require("axios");
require("dotenv").config();
const { parseGeminiResposta } = require("./parseGeminiResposta.js");

function calcularDistanciaKm(origem, destino) {
  const toRad = (grau) => (grau * Math.PI) / 180;
  const R = 6371; 

  const dLat = toRad(destino.latitude - origem.latitude);
  const dLon = toRad(destino.longitude - origem.longitude);

  const lat1 = toRad(origem.latitude);
  const lat2 = toRad(destino.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function extrairCoordenadas(link) {
  if (!link) return null;

  const regexAt = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const regexQ = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/;

  let match = link.match(regexAt);
  if (match) {
    return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
  }

  match = link.match(regexQ);
  if (match) {
    return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
  }

  return null;
}


async function consultarGemini(prompt, pontoMedio) {
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

    const resultado = parseGeminiResposta(texto);

    const coords = extrairCoordenadas(resultado.link);
  if (coords) {
    resultado.latitude = coords.latitude;
    resultado.longitude = coords.longitude;
    if (pontoMedio) {
      resultado.distancia = calcularDistanciaKm(pontoMedio, coords).toFixed(2);
    }
  }

  console.log("📦 Sugestão estruturada:", resultado);

  return resultado;
}

module.exports = consultarGemini;
  