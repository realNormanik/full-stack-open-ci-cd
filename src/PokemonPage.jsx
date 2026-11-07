import { Link, useParams } from "react-router-dom";

import { useApi } from "./useApi";
import ErrorMessage from "./ErrorMessage";
import PokemonAbility from "./PokemonAbility";
import LoadingSpinner from "./LoadingSpinner";

const formatName = (nameWithDash) => nameWithDash.replace("-", " ");

const PokemonPage = ({ previous, next }) => {
  const { name } = useParams();
  const { data: pokemon, error, isLoading } = useApi(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (isLoading) {
    return <LoadingSpinner />
  };

  if (error) {
    return <ErrorMessage error={error} />
  };

  const { type } = pokemon.types.find((type) => type.slot === 1)
  const stats = pokemon.stats.map((stat) => ({ name: formatName(stat.stat.name), value: stat.base_stat })).reverse();
  const normalAbility = pokemon.abilities.find((ability) => !ability.is_hidden);
  const hiddenAbility = pokemon.abilities.find((ability) => ability.is_hidden === true);

  // eslint-disable-next-line no-console
  console.log("hiddenAbility=", hiddenAbility);

  return (
    <>
      <div className="links">
        {previous ? (
          <Link to={`/pokemon/${previous.name}`} className="nav-pill">Previous</Link>
        ) : <span aria-hidden="true" />}
        <Link to="/" className="nav-pill-brand">Home</Link>
        {next ? (
          <Link to={`/pokemon/${next.name}`} className="nav-pill">Next</Link>
        ) : <span aria-hidden="true" />}
      </div>
      <div className={`pokemon-page pokemon-type-${type.name}`}>
        <div className="pokemon-hero">
          <span className="ball pokemon-ball" aria-hidden="true" />
          <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className="pokemon-info">
          <div className="pokemon-title">
            <h1 className="pokemon-name">{pokemon.name}</h1>
            <span className="pokemon-chip">{type.name}</span>
          </div>
          <div className="pokemon-stats" data-testid="stats">
            <table>
              <tbody>
                {stats.map(({ name, value }) => (
                  <tr key={name}>
                    <td className="pokemon-stats-name">{name}</td>
                    <td className="pokemon-stats-value">{value}</td>
                    <td className="stat-cell">
                      <div className="stat-track">
                        <div className="stat-fill" style={{ width: `${Math.min((value / 160) * 100, 100)}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pokemon-abilities">
            {normalAbility && <PokemonAbility abilityName={formatName(normalAbility.ability.name)} />}
            {hiddenAbility && <PokemonAbility abilityName={formatName(hiddenAbility.ability.name)} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
