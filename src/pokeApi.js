const BASE_URL = 'https://pokeapi.co/api/v2';

const getResource = async (resourceUrl) => {
  const response = await fetch(resourceUrl);
  if (!response.ok) {
    throw new Error('API Error');
  }
  return response.json();
};

const pokeApi = {
  getPokemonById: (id) => getResource(`${BASE_URL}/pokemon/${id}`),
  getPokemonSpeciesById: (id) => getResource(`${BASE_URL}/pokemon-species/${id}`),
  getPokemonOffsetLimit: (limit) => getResource(`${BASE_URL}/pokemon?limit=20&offset=${limit}`),
  getPokemonLimitPokemon: (number) => getResource(`${BASE_URL}/pokemon?limit=${number}`),
  getPokemonUrl: (url) => getResource(`${url}`),
  searchPokemon: (searchTerm) =>
    getResource(`${BASE_URL}/pokemon/${encodeURIComponent(searchTerm)}`),
};

export default pokeApi;
