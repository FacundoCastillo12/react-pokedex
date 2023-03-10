import styled from '@emotion/styled';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Pokedex from './Pokedex';
import PokemonSearch from './PokemonSearch';
import Footer from './Footer';
import Pokemon from './Pokemon';
import { CacheProvider } from '../CacheContext';

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #267871, #136a8a);
  color: white;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <div className="app">
      <CacheProvider>
        <HashRouter>
          <NavBar />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Pokedex />} />
              <Route path="/search" element={<PokemonSearch />} />
              <Route path="/pokemon/:id" element={<Pokemon />} />
            </Routes>
          </Wrapper>
          <Footer />
        </HashRouter>
      </CacheProvider>
    </div>
  );
}

export default App;
