import React from 'react';
import RosterPokemon from '../types/roster-pokemon';
import Image from 'next/image';

type Props = {
  pokemon: RosterPokemon;
};

function PokemonItem({ pokemon }: Props) {
  return (
    <div className="mb-5 grid grid-cols-[1fr_4fr] place-content-center rounded-md border border-slate-400">
      <div>
        <img
          src={pokemon.spriteUrl}
          alt={pokemon.pokemonId.toString()}
          className=" ml-auto mr-auto"
        />
      </div>
      <div>
        <h3 className="mt-4 font-bold">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        {pokemon.type2 ? (
          <p>
            {pokemon.type1} • {pokemon.type2}
          </p>
        ) : (
          <p>{pokemon.type1}</p>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default PokemonItem;
