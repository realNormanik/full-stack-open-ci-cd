import { Routes, Route, Link, useMatch } from "react-router-dom";

import { useApi } from "./useApi";
import PokemonPage from "./PokemonPage";
import PokemonList from "./PokemonList";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

const mapResults = (({ results }) => results.map(({ url, name }) => ({
  url,
  name,
  id: parseInt(url.match(/\/(\d+)\//)[1])
})));

const Shell = ({ children }) => (
  <div className="shell">
    <header className="site-header">
      <Link to="/" className="site-logo">
        <span className="ball" aria-hidden="true" />
        <span className="site-logo-name">Pokédex</span>
      </Link>
      <p className="site-tagline">Gotta catch ’em all</p>
    </header>
    <main className="site-main">{children}</main>
  </div>
);

const App = () => {
  const match = useMatch("/pokemon/:name");
  const { data: pokemonList, error, isLoading } = useApi("https://pokeapi.co/api/v2/pokemon/?limit=50", mapResults);

  if (isLoading) {
    return <Shell><LoadingSpinner /></Shell>
  };

  if (error) {
    return <Shell><ErrorMessage error={error} /></Shell>
  };

  let next = null
  let previous = null

  if (match && match.params) {
    const pokemonId = pokemonList.find(({ name }) => name === match.params.name).id
    previous = pokemonList.find(({ id }) => id === pokemonId - 1)
    next = pokemonList.find(({ id }) => id === pokemonId + 1)
  };

  return (
    <Shell>
      <Routes>
        <Route exact path="/" element={<PokemonList pokemonList={pokemonList} />} />
        <Route exact path="/pokemon/:name" element={
          <PokemonPage pokemonList={pokemonList} previous={previous} next={next} />
        } />
      </Routes>
    </Shell>
  );
};

export default App;
