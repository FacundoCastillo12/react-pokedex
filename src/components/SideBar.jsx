import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import { useFetchGetPokemonById } from '../hooks/useSimpleFetch';
import pokeApi from '../pokeApi';
import { Link } from 'react-router-dom';
import Loading from './Loading';


const SideBar = () => {
  const { data, loading, error } = useFetchGetPokemonById(pokeApi.getPokemonLimitPokemon, 50);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="mr-4">
      <Button variant="outline-warning" onClick={handleShow}>
        Pokemon List
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Pokemon List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup defaultActiveKey="#link1" className="text-capitalize">
            {loading && <Loading />}
            {data?.results?.map((pokemon, index) => (
              <ListGroup.Item key={index}>
                <Link to={`/pokemon/${index + 1}`} onClick={handleClose}>
                  {pokemon.name}
                </Link>
              </ListGroup.Item>
            ))}
            {error && (
              <div className="alert alert-danger" role="alert">
                Error
              </div>
            )}
          </ListGroup>
        </Offcanvas.Body>
        
      </Offcanvas>
    </div>
  );
};

export default SideBar;

