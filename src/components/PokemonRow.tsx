import React, { useEffect } from 'react';
import { Text } from '../styles';

export type IPokemonRow = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

function PokemonRow({id, name, types, sprite}: IPokemonRow) {

  return (
    <div style={{width:"200px", border:"1px solid blue"}}>
        <Text>{id}</Text>
        <Text>{name}</Text>
        {
            types.map((type)=>{
                return <Text>{type}</Text>
            })
        }
        <img src={sprite} style={{height:"100px", width:"100px"}}/> 

    </div>
  );
}

export default PokemonRow;
