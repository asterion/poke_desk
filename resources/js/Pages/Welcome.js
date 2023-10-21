import React, { Fragment, useState, useEffect } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Card from '@/Components/Card';
import List from '@/Components/List';
import Pagination from 'react-bootstrap/Pagination';

export default function Welcome(props) {
    const [pokemonSelected, setPokemonSelected] = useState(props.pokemon);
    const [pokemonFiltered, setPokemonFiltered] = useState(props.pokemons);
    const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
    const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
    const [pages] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const [searchInput, setSearchInput] = useState('');

    const setCurrentPage = (number) => {
        setPage(number);
        setIndexOfFirstRecord((number*10)-10);
        setIndexOfLastRecord(number*10);
    }

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
            <div className='container'>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Logo" height="24" className="d-inline-block align-text-top" />
                            Los primero 100 pokemon
                        </a>
                    </div>
                </nav>
            </div>
            <div className='container mt-2'>
                <div className='row'>
                    <div className='col-12 col-md-6 order-last order-md-first'>
                        <Fragment>
                            <div className="form-floating mb-3">
                                <input type="search" className="form-control" id="search" placeholder="Buscar..." onChange={e => setSearchInput(e.target.value)}  />
                                <label htmlFor="search">Buscar</label>
                            </div>
                            <div className='mb-1'>
                                <List pokemons={pokemonFiltered.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput.toLocaleLowerCase())).slice(indexOfFirstRecord, indexOfLastRecord)} setPokemonSelected={setPokemonSelected} />
                            </div>
                            <Pagination size="sm">
                                {pages.map(number => (
                                    <Pagination.Item key={number} active={number === page} onClick={e => setCurrentPage(number)}>
                                        {number}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </Fragment>
                    </div>
                    <div className='col-12 col-md-6 order-first order-md-last'>
                        <Card pokemon={pokemonSelected} />
                    </div>
                </div>
            </div>
        </>
    );
}
