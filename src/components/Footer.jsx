import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
`;

const Footer = () => {
    return (
      <FooterContainer className='mt-3'>
        <p>Pokedex created in <a href='https://create-react-app.dev/'>React</a> using <a href='https://pokeapi.co/'>PokeApi</a> by <a href='https://github.com/FacundoCastillo12'>Facundo Castillo</a> </p>
      </FooterContainer>
    );
};
export default Footer;