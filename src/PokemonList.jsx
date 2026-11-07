import { Link } from "react-router-dom";

const PokemonList = ({ pokemonList }) => {
  return (
    <div className="list-container">
      {pokemonList.map(({ id, name }) => (
        <Link key={id} to={`/pokemon/${name}`} className="list-item">
          <span className="list-item-number">#{String(id).padStart(3, "0")}</span>
          <img
            className="list-item-sprite"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt=""
            loading="lazy"
          />
          <div className="list-item-name">
            {name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
