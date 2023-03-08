import React from 'react';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetchGetPokemonById } from '../hooks/useSimpleFetch';
import pokeApi from '../pokeApi';
import ButtonLink from './ButtonLink';
import Loading from './Loading';

const Pokemon = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchGetPokemonById(pokeApi.getPokemonById, id);
  const {
    data: pokemonSpecies,
    loading: pokemonLoading,
    error: pokemonError,
  } = useFetchGetPokemonById(pokeApi.getPokemonSpeciesById, id);

  if (loading && pokemonLoading) return <Loading />;

  if (error && pokemonError)
    return (
      <Alert key={'danger'} variant={'danger'} className="mt-4 text-center">
        Something went wrong
      </Alert>
    );

  if (data && pokemonSpecies) {
    const englishFlavorTexts = pokemonSpecies.flavor_text_entries.filter((entry) => entry.language.name === 'en');
    const randomEnglishFlavorText =
      englishFlavorTexts.length > 0 ? englishFlavorTexts[Math.floor(Math.random() * englishFlavorTexts.length)] : null;

    return (
      <div className="container text-center mt-4">
        <div className="row">
          <div className="col-12">
            <div className="card mb-3 bg-dark border border-primary">
              <h1 className="card-header text-capitalize text-success ">{data.name}</h1>
              <img
                src={data.sprites.other[`official-artwork`].front_default}
                className="card-img-top w-25 mx-auto d-block"
                alt={`Pokemon ${data.name}`}
              />
              <div className="card-body">
                <h5 className="card-title text-danger">
                  ID: <strong>{data.id}</strong>{' '}
                </h5>
                <p className="card-text ">
                  {randomEnglishFlavorText === null ? `Unknown` : `${randomEnglishFlavorText.flavor_text}`}
                </p>
              </div>
              <div className="container text-center text-capitalize">
                <div className="row">
                  <div className="col">
                    <ul className="list-group list-group-flush ">
                      <li className="list-group-item bg-dark text-primary">Details</li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info">EXP Base:</strong> {data.base_experience}
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info">Height:</strong> {data.height}
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info">Weight: </strong> {data.weight}
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info"> Type: </strong>
                        {data.types.length === 1 ? (
                          <div className="text-success">{data.types[0].type.name}</div>
                        ) : (
                          <div className="text-success">{data.types[1].type.name}</div>
                        )}
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info"> Species:</strong> {data.species.name}
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul className="list-group list-group-flush ">
                      <li className="list-group-item bg-dark text-primary">Details</li>
                      <li className="list-group-item bg-dark">
                        <strong className="text-info">Abilities</strong>
                        {data.abilities.length === 1 ? (
                          <div className="text-success">{data.abilities[0].ability.name}</div>
                        ) : (
                          <div className="text-success">{data.abilities[1].ability.name}</div>
                        )}
                      </li>
                      <li className="list-group-item bg-dark">
                        <strong className="text-info">Stats</strong>
                        <div className="text-warning">
                          {data.stats[0].stat.name}: <strong className="text-success">{data.stats[0].base_stat}</strong>
                        </div>
                        <div className="text-warning">
                          {data.stats[1].stat.name}: <strong className="text-success">{data.stats[1].base_stat}</strong>
                        </div>
                        <div className="text-warning">
                          {data.stats[2].stat.name}: <strong className="text-success">{data.stats[2].base_stat}</strong>
                        </div>
                        <div className="text-warning">
                          {data.stats[3].stat.name}: <strong className="text-success">{data.stats[3].base_stat}</strong>
                        </div>
                        <div className="text-warning">
                          {data.stats[4].stat.name}: <strong className="text-success">{data.stats[4].base_stat}</strong>
                        </div>
                        <div className="text-warning">
                          {data.stats[5].stat.name}: <strong className="text-success">{data.stats[5].base_stat}</strong>
                        </div>
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info">Base Happiness: </strong> {pokemonSpecies.base_happiness}
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info">Capture Rate: </strong> {pokemonSpecies.capture_rate}
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul className="list-group list-group-flush ">
                      <li className="list-group-item bg-dark text-primary">Details</li>
                      <li className="list-group-item bg-dark">
                        <strong className="text-info">Evolves from species</strong>
                        {pokemonSpecies.evolves_from_species === null ? (
                          <div className="text-success">No previous evolution</div>
                        ) : (
                          <div className="text-success">{pokemonSpecies.evolves_from_species.name}</div>
                        )}
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info">Generation:</strong> {pokemonSpecies.generation.name}
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info">Growth Rate: </strong> {pokemonSpecies.growth_rate.name}
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info"> Habitat: </strong>
                        {pokemonSpecies.habitat === null ? (
                          <div className="text-success">Unknown</div>
                        ) : (
                          <div className="text-success">{pokemonSpecies.habitat.name}</div>
                        )}
                      </li>
                      <li className="list-group-item bg-dark text-success">
                        <strong className="text-info"> Shape:</strong>
                        {pokemonSpecies.shape === null ? (
                          <div className="text-success">Unknown</div>
                        ) : (
                          <div className="text-success">{pokemonSpecies.shape.name}</div>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ButtonLink key={'back'} id={Number(id) > 1 ? Number(id) - 1 : Number(id)} nameButton={'Previous'}>
                  {' '}
                  Card link{' '}
                </ButtonLink>
                <ButtonLink key={'next'} id={Number(id) + 1} nameButton={'Next'}>
                  {' '}
                  Card link{' '}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Pokemon;
