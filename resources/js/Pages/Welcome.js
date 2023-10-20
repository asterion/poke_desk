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
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                Log in
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-4">
                                <div>
                                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <Fragment>
                                            <div className='py-3 px-0'>
                                                <label>Filtro</label>
                                                <input id="filtered" name="filtered" onChange={e => setSearchInput(e.target.value)} />
                                            </div>
                                            <div className="relative overflow-x-auto">
                                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="px-2 py-1">
                                                                #
                                                            </th>
                                                            <th scope="col" className="px-2 py-1">
                                                                Pokemon
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {props.pokemons.filter(p => p.name.includes(searchInput)).map((pokemon) => (
                                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={pokemon.id}>
                                                                <th>{pokemon.id}</th>
                                                                <th scope="row" className="capitalize px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white" onClick={() => setPokemonSelected(pokemon)}>
                                                                    { pokemon.name }
                                                                </th>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Fragment>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 md:border-t-0 md:border-l">
                                <div className="flex items-center">
                                    <div className="ml-4 text-lg leading-7 font-semibold">
                                        <h1 className="underline text-gray-900 dark:text-white capitalize">
                                            {pokemonSelected.name}
                                        </h1>
                                        <img src={pokemonSelected.image} />
                                        <ul>
                                            <li className=' dark:text-white'>Height : {pokemonSelected.height}</li>
                                            <li className=' dark:text-white'>Weight : {pokemonSelected.weight}</li>
                                            <li className=' dark:text-white'>Base Experience : {pokemonSelected.base_experience}</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
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
