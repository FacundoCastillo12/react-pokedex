import styled from '@emotion/styled/macro';
import ButtonLink from './ButtonLink';
import cardImg from '../assents/img/card.png';

const CardComplete = styled.div`
  border: 4px solid black;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 1);
  -webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 1
    
`;
const PokemonName = styled.h5`
  font-size: 2em;
  text-align: center;
  font-family: 'Teko', sans-serif;
  text-transform: capitalize;
`;

const ContainerImage = styled.div`
  background-color: #9b030d;
  border: none;
  transition-duration: 500ms;
  img {
    display: block;
    margin: auto;
  }
`;

const CardInformation = styled.div`
  overflow: hidden;
  height: 0;
  transition: all 0.5s ease-in-out;
  color: rgb(0, 0, 0);
  font-size: 22px;
  font-family: 'Teko', sans-serif;
  text-transform: capitalize;
  background-image: url('${cardImg}');
  background-size: cover;
  background-position: center;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  border: none;
  text-align: left;
  overflow: hidden;
  &:hover > ${CardInformation} {
    width: 100%;
    height: 240px;
    display: block;
  }
`;

const Card = (props) => {
  return (
    <div className="col-md-3 mt-4">
      <CardComplete className={'card-group'}>
        <CardContainer className={'card'}>
          <ContainerImage className={'card'}>
            <PokemonName className={'card-title'}>{props.pokemon.name}</PokemonName>
            <img
              src={props.pokemon.sprites.other[`official-artwork`].front_default}
              className="card-img-top"
              alt={'hola'}
            />
            <ButtonLink key={props.pokemon.id} id={props.pokemon.id} />
          </ContainerImage>

          <CardInformation>
            <p className="card-text">
              ID: <strong>{props.pokemon.id}</strong>
            </p>
            <p className="card-text">
              EXP BASE: <strong>{props.pokemon.base_experience}</strong>
            </p>
            <p className="card-text">
              HEIGHT: <strong>{props.pokemon.height}</strong>
            </p>
            <p className="card-text">
              WEIGHT: <strong>{props.pokemon.weight}</strong>
            </p>
            <p className="card-text">
              TYPE: <strong>{props.pokemon.types[0].type.name}</strong>
            </p>
          </CardInformation>
        </CardContainer>
      </CardComplete>
    </div>
  );
};
export default Card;
