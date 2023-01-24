import React, { useEffect } from 'react';
import { Text } from '../styles';
import PokemonRow from './PokemonRow';

export type IPokemonRow = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

type PokedexTable = {
    pokemonArray: IPokemonRow[]
}

function PokedexTable( {pokemonArray}: PokedexTable) {

  return (
    <div style={{border:"1px solid blue"}}>
        {
            pokemonArray.map((pokemon)=>{
                return <PokemonRow id={pokemon.id} name={pokemon.name} types={pokemon.types} sprite={pokemon.sprite}/>
            })
        }

    </div>
  );
}

export default PokedexTable;
