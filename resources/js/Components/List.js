import React from 'react';

export default function List({ pokemons, setPokemonSelected }) {
    return (
        <ul className="list-group">
            {pokemons.map((pokemon) => (
                <li className="list-group-item d-flex justify-content-between align-items-center text-capitalize cursor" key={pokemon.id} onClick={() => setPokemonSelected(pokemon)} style={{minHeight: "50px"}}>
                    {pokemon.name}
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/` + pokemon.id + `.svg`} style={{maxHeight: "2rem"}} />
                </li>
            ))}
        </ul>
    );
}
