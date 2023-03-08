import React, { useState } from 'react';
import Card from './Card';
import pokeApi from '../pokeApi';
import { useFetchGetPokemon } from '../hooks/useFetchWithCache';
import Loading from './Loading';

// Objetivo. Quiero crear la api, que reciba por id. Que cargue los veite primeros y luego que cargue de tanto a tanto.
// Quiero crear un componente para pasar los datos de cuando vaya a un id, basicamente un Pokemon individual. Mostrar un panel bonito
// con todos los detalles.
// Segundo. Configurar el useFechReducer, configurarlo para funcione tanto como individual como con cada uno.
// Por ejemplo, un fech que de todo, basicamente. Un fech que pedir los primeros veinte y luego pedir individualmente a cada uno.
// Luego añadir tambien el buscador. En barra superior como asi tambien, en una parte en solitario.
// Basicamente el useHook sera completo. Para pedir individual como para todos.
// Crear o buscar un cargador automatico, tal vez una pokeball de carga. Tanto para el inicio como para en cada momento. Incluso cuando esta buscando.

function useHandbleLoadPokemon(initialCount) {
  const [count, setCount] = useState(initialCount);
  const [page, setPage] = useState(1);
  const handleLoadPrevious = () => {
    setCount((prevCount) => Math.max(0, prevCount - 20));
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };
  const handleLoadNext = () => {
    setCount((prevCount) => prevCount + 20);
    setPage((prevPage) => prevPage + 1);
  };
  return { count, page, handleLoadPrevious, handleLoadNext };
}

const Pokedex = () => {
  const { count, page, handleLoadPrevious, handleLoadNext } = useHandbleLoadPokemon(0);
  const { data, error, loading } = useFetchGetPokemon(pokeApi.getPokemonOffsetLimit, pokeApi.getPokemonUrl, count);

  if (loading) return <Loading />;

  if (error) return 'Something went wrong';

  if (data)
    return (
      <div className="container">
        {!loading && (
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={handleLoadPrevious}>
              Previous
            </button>
            <strong className="btn btn-info">{page}</strong>
            <button className="btn btn-primary" onClick={handleLoadNext}>
              Next
            </button>
          </div>
        )}
        <div className="row">
          {data.map((pokemon) => (
            <Card key={pokemon.name} pokemon={pokemon} />
          ))}
          {loading && <Loading />}
        </div>
        {!loading && (
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={handleLoadPrevious}>
              Previous
            </button>
            <strong className="btn btn-info">{page}</strong>
            <button className="btn btn-primary" onClick={handleLoadNext}>
              Next
            </button>
          </div>
        )}
      </div>
    );
};

export default Pokedex;
/*
    useEffect(() => {
      const fetchPokemonList = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (result) => {
            const response = await fetch(result.url);
            const data = await response.json();
            return data;
          })
        );
        setPokemonList(pokemonData);
        setLoading(false); // Actualizar estado
      };
      fetchPokemonList();
    }, []);
  
    const loadMorePokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pokemonList.length}`
      );
      const data = await response.json();
      const pokemonData = await Promise.all(
        data.results.map(async (result) => {
          const response = await fetch(result.url);
          const data = await response.json();
          return data;
        })
      );
      setPokemonList([...pokemonList, ...pokemonData]);
    };
    ----Vuelve a cargar todo de vuelta incluyendo lso viejos:
      const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(20);
  const { data, error, loading } = useFetchGetTwentyPokemon(pokeApi.getPokemonLimitPokemon, pokeApi.getPokemonUrl, count);

  useEffect(() => {
    if (data) {
      setPokemonList(prevList => [...prevList, ...data]);
    }
  }, [data]);

  const handleLoadMore = () => {
    setCount(prevCount => prevCount + 20);
  };

*/
