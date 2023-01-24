import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DropDownBox, Text } from './styles';
import Axios from './services/axiox';
import { useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from './store/store';
import { incrementByAmount } from './store/slice/counterSlice';
import PokemonRow, { IPokemonRow } from './components/PokemonRow';
import PokedexTable from './components/PokedexTeble';


function App() {

  const [pokemons, setPokemons] = useState<IPokemonRow[]>([])

  console.log(pokemons, "check pokemons")

  const bulbasaur = {
    id: 1,
    name: "Bulbasaur",
    types: ["grass"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  }

  const formatPokemonAPIResult = (res: any) =>{
    
    const formattedPokemon = res.map((pokemon: any)=>{
      // console.log(pokemon, "check indi")
      const temp:any = {};

      temp.name = pokemon.name;
      temp.id = pokemon.id
      temp.types = pokemon.types.map((type: any) => type.type.name)
      temp.sprite = pokemon.sprites.front_default
      
      return temp

    })

    setPokemons(formattedPokemon)
  } 
 
  const getAllPokemons = async () =>{
    const getAllPokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=99"
    const response = await Axios.get(getAllPokemonURL)
    console.log(response)
    const res = await Promise.all(response.results.map(( pokemon: any)=>  Axios.get(pokemon.url)))
    console.log(res, "res from pokemon url")
    formatPokemonAPIResult(res)
  }

  useEffect(()=>{
    getAllPokemons()
  },[])


  return (
    <div className="App">
      <header className="App-header">
        <PokemonRow id={bulbasaur.id} name={bulbasaur.name} types={bulbasaur.types} sprite={bulbasaur.sprite}/>
        <PokedexTable pokemonArray={pokemons}/>
      </header>
    </div>
  );
}

export default App;
