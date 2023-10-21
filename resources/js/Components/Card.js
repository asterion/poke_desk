import React from 'react';

export default function Card({ pokemon }) {
    return (
        <div className="card mb-3">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/` + pokemon.id + `.svg`} className="img-fluid rounded-start p-1" style={{maxHeight: "20rem"}}/>
            <h5 className="card-header text-capitalize text-center">
                {pokemon.name}
            </h5>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Altura
                        <span className="badge bg-primary rounded-pill">{pokemon.height}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Peso
                        <span className="badge bg-primary rounded-pill">{pokemon.weight}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Experiencia base
                        <span className="badge bg-primary rounded-pill">{pokemon.base_experience}</span>
                    </li>

                    {pokemon.abilities.map((ability) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center text-capitalize" key={ability.id}>
                            {ability?.ability?.name || ability?.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
