import React, { useState } from 'react';
import RosterPokemon from '../types/roster-pokemon';
import Image from 'next/image';

type Props = {
  pokemon: RosterPokemon;
  handleRemove: (pokemon: RosterPokemon) => void;
};

function PokemonItem({ pokemon, handleRemove }: Props) {
  const invokeRemove = async () => {
    handleRemove(pokemon);
  };

  return (
    <div className="mb-5 grid grid-cols-[1fr_4fr_1fr] place-content-center rounded-md border border-slate-400 p-3">
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
      <div>
        <button
          className="h-full w-full pr-5 text-right text-red-500 hover:underline"
          onClick={invokeRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default PokemonItem;
