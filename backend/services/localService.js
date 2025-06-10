const axios = require('axios');
const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;

exports.buscarComFoursquare = async ({ latitude, longitude, termo, raio = 3000, limite = 5 }) => {
  const url = `https://api.foursquare.com/v3/places/search`;

  const response = await axios.get(url, {
    headers: {
      Authorization: FOURSQUARE_API_KEY
    },
    params: {
      ll: `${latitude},${longitude}`,
      radius: raio,
      query: termo,
      limit,
      open_now: true,
      sort: 'RELEVANCE'
    }
  });

  return response.data.results.map((place) => ({
    nome: place.name,
    preco: place.price || '$$',
    nota: place.rating || 4,
    endereco: place.location.formatted_address,
    coordenadas: place.geocodes.main
  }));
};
