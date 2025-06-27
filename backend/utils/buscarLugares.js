const axios = require("axios");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

function montarFotoURL(photoRef) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${photoRef}&key=${GOOGLE_API_KEY}`;
}

function calcularDistanciaEmKm(metros) {
  return (metros / 1000).toFixed(1) + "km";
}

async function buscarLugares(preferencias, pontoMedio) {
  const { tipo_role, palavras_chaves, distancia_lugar, rate_lugar } = preferencias;

  const location = `${pontoMedio.lat},${pontoMedio.lng}`;
  const keyword = encodeURIComponent(`${tipo_role} ${palavras_chaves}`);
  const radius = parseInt(distancia_lugar) * 1000; // metros

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${keyword}&key=${GOOGLE_API_KEY}`;

  try {
    const res = await axios.get(url);
    const resultados = res.data.results;
    console.log("🔍 Google retornou", resultados.length, "lugares:");
    console.dir(resultados.map(r => r.name), { depth: null });

    const lugaresFiltrados = resultados
    .filter((lugar) => lugar.rating && lugar.rating >= parseFloat(rate_lugar))
      .map((lugar) => ({
        nome: lugar.name,
        nota: lugar.rating,
        endereco: lugar.vicinity,
        imagem: lugar.photos?.[0] ? montarFotoURL(lugar.photos[0].photo_reference) : "/img/imagem_padrao.svg",
        distancia: calcularDistanciaEmKm(lugar.distance_meters || radius),
        link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.name)}`
      }));

    return lugaresFiltrados;
  } catch (err) {
    console.error("Erro ao buscar lugares no Google:", err.message);
    return [];
  }
}

module.exports = buscarLugares;
