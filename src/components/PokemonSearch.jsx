import { useState } from 'react';
import { useFetchTimeoutGetPokemon } from '../hooks/useFetchWithCache';
import pokeApi from '../pokeApi';
import Loading from './Loading';
import ButtonLink from './ButtonLink';

const PokemonSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, loading } = useFetchTimeoutGetPokemon(pokeApi.getPokemonById, searchTerm, 1000);
  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleInputChange(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }
  return (
    <div className="container text-center mt-4">
      <div className="row ">
        <div className="col-12 justify-content-center">
          <form className="form my-2 my-lg-0" onSubmit={handleSubmit}>
            <label>
              Search Pokemon by id or name:
              <input
                className="form-control mr-sm-2"
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </label>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 ">
          {loading && <Loading />}
          {data && data.name &&(
            <div className="card mb-3 bg-warning border">
              <div className="card bg-warning">
                <h1 className="card-header text-capitalize text-success ">{data.name}</h1>
                <img src={data.sprites.other[`official-artwork`].front_default} className="card-img-top w-25 mx-auto d-block" alt={`Pokemon ${data.name}`} />
                <div className="card-body">
                  <ul className="list-group list-group-flush ">
                  <h5 className="card-title text-primary">ID: {data.id}</h5>
                      <li className="list-group-item bg-warning text-dark">
                        <strong className="text-dark">EXP Base:</strong> {data.base_experience}
                      </li>
                      <li className="list-group-item bg-warning text-dark">
                        <strong className="text-dark">Height:</strong> {data.height}
                      </li>
                      <li className="list-group-item bg-warning text-dark">
                        <strong className="text-dark">Weight: </strong> {data.weight}
                      </li>
                  </ul>
                  <div className='mt-4'>
                  <ButtonLink id={data.id} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
                Verify that the name or ID is correct</div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
/*

  return (
    <>
      <div className="form-inline my-2 my-lg-0 ">
          <input
            className="form-control mr-sm-2"
            value={searchTerm}
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn btn-outline-success my-2 my-sm-0">
            Search
          </button>
      </div>
      {loading && <Loading />}
      {data === Object ? <div>
        Este es un objeto. {data.name}
      </div>: <div>
        Esto no es un objeto
        </div>}
      {error === null ? <div>Algo anduvo mal</div>: <div>Algo anduvo mal pero no se que</div>}
    </>
  );
};
*/
