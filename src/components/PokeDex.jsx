import React, { useState } from 'react';
import Card from './Card';
import pokeApi from '../pokeApi';
import { useFetchGetPokemon } from '../hooks/useSimpleFetch';
import Loading from './Loading';
import { Alert } from 'react-bootstrap';

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

  if (error) return <Alert key={'danger'} variant={'danger'} className="mt-4 text-center" >Something went wrong</Alert>;

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
