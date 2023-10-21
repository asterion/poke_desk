import React, { Fragment, useState, useEffect } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Card from '@/Components/Card';
import List from '@/Components/List';

export default function Welcome(props) {
    const [pokemonSelected, setPokemonSelected] = useState(props.pokemon);
    const [pokemonFiltered, setPokemonFiltered] = useState(props.pokemons);
    const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
    const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    const [searchInput, setSearchInput] = useState('');

    const setSlice = (first, last) => {
        setIndexOfFirstRecord(first);
        setIndexOfLastRecord(last);
    };

    const queryPokemons = `query pokemons {
        pokemons: pokemon_v2_pokemon(limit: 100, offset: 0) {
          id
          name
          height
          base_experience
          weight
          abilities: pokemon_v2_pokemonabilities {
            id
            ability: pokemon_v2_ability {
              id
              name
            }
          }
          sprites: pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }`;

    useEffect(() => {
        fetch('https://beta.pokeapi.co/graphql/v1beta', {
            credentials: "omit",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: queryPokemons
            }),
            method: "POST"
          })
          .then((response) => response.json())
          .then((pokemons) => {
            console.log(pokemons.data.pokemons)
            setPokemonFiltered(pokemons.data.pokemons);
            setIsLoading(false);
          }).catch((error) => {
            console.log(error);
            setIsLoading(false);
            setPokemonFiltered(props.pokemons);
          });
    }, []);

    if (isLoading) {
        return (
            <div className='container mt-2'>
                Loading...
            </div>
        )
    }

    return (
        <>
            <Head title="PokeDesk MZZO" />
            <div className='container mt-2'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <Fragment>
                            <div className="form-floating mb-3">
                                <input type="search" className="form-control" id="search" placeholder="Buscar..." onChange={e => setSearchInput(e.target.value)}  />
                                <label htmlFor="search">Buscar</label>
                            </div>
                            <div className='mb-1'>
                                <List pokemons={pokemonFiltered.slice(indexOfFirstRecord, indexOfLastRecord)} setPokemonSelected={setPokemonSelected} />
                            </div>
                            <nav aria-label="Page navigation pokemons">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(0, 10)}>1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(10, 20)}>2</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(20, 30)}>3</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(30, 40)}>4</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(40, 50)}>5</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(50, 60)}>6</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(60, 70)}>7</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(70, 80)}>8</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(80, 90)}>9</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => setSlice(90, 100)}>10</a>
                                    </li>
                                </ul>
                            </nav>
                        </Fragment>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Card pokemon={pokemonSelected} />
                    </div>
                </div>
            </div>
        </>
    );
}
