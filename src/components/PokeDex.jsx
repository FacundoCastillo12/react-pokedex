import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Card from './Card';
import pokeApi from '../pokeApi';
import { useFetchGetPokemon } from '../hooks/useSimpleFetch';
import Loading from './Loading';

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
  return {
    count,
    page,
    handleLoadPrevious,
    handleLoadNext
  };
}

function Pokedex() {
  const { count, page, handleLoadPrevious, handleLoadNext } = useHandbleLoadPokemon(0);
  const { data, error, loading } = useFetchGetPokemon(
    pokeApi.getPokemonOffsetLimit,
    pokeApi.getPokemonUrl,
    count
  );

  if (loading) return <Loading />;

  if (error) {
    return (
      <Alert key="danger" variant="danger" className="mt-4 text-center">
        Something went wrong
      </Alert>
    );
  }

  if (data) {
    return (
      <div className="container">
        {!loading && (
          <div className="d-flex justify-content-center mt-3">
            <button type="button" className="btn btn-primary" onClick={handleLoadPrevious}>
              Previous
            </button>
            <strong className="btn btn-info">{page}</strong>
            <button type="button" className="btn btn-primary" onClick={handleLoadNext}>
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
            <button type="button" className="btn btn-primary" onClick={handleLoadPrevious}>
              Previous
            </button>
            <strong className="btn btn-info">{page}</strong>
            <button type="button" className="btn btn-primary" onClick={handleLoadNext}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Pokedex;
