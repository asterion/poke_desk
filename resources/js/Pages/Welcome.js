import React, { Fragment, useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    const [pokemonSelected, setPokemonSelected] = useState(props.pokemon);
    const [pokemonFiltered, setPokemonFiltered] = useState(props.pokemons);
    const [searchInput, setSearchInput] = useState('');

    const searchItems = (e) => {
        let data = props.pokemons;
        if (e.target.value) {
            console.log(searchInput);
            data = props.pokemons.filter((p) => {
                return p.name.toLowerCase().includes(searchInput.toLowerCase())
            })
        }

        setPokemonFiltered(data)
    };

    return (
        <>
            <Head title="PokeDesk MZZO" />
            <div className='container mt-2'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <Fragment>
                            <div class="form-floating mb-3">
                                <input type="search" class="form-control" id="search" placeholder="Buscar..." onChange={e => setSearchInput(e.target.value)}  />
                                <label for="search">Buscar</label>
                            </div>
                            <div>
                                <table className='table table-sm'>
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                #
                                            </th>
                                            <th scope="col">
                                                Pokemon
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.pokemons.filter(p => p.name.includes(searchInput)).map((pokemon) => (
                                            <tr key={pokemon.id} className='cursor'>
                                                <th>{pokemon.id}</th>
                                                <th scope="row" onClick={() => setPokemonSelected(pokemon)} className='text-capitalize'>
                                                    { pokemon.name }
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Fragment>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={pokemonSelected.image} className="img-fluid rounded-start" />
                                </div>
                                <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title text-capitalize">{pokemonSelected.name}</h5>
                                    <ul className="card-text">
                                        <li>Height : {pokemonSelected.height}</li>
                                        <li>Weight : {pokemonSelected.weight}</li>
                                        <li>Base Experience : {pokemonSelected.base_experience}</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
