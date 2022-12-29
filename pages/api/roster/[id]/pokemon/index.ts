import { PrismaClient, RosterPokemon } from '@prisma/client';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query;

  const roster = await prisma.roster.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });

  if (roster) {
    if (req.method === 'POST') {
      const { pokemonId } = req.body;

      const rosterPokemon = await prisma.rosterPokemon.create({
        data: {
          rosterId: roster.id,
          pokemonId,
        },
      });

      res.status(201).json(rosterPokemon);
    } else if (req.method === 'GET') {
      const rosterPokemon = await prisma.rosterPokemon.findMany({
        where: {
          rosterId: roster.id,
        },
      });

      const response: Array<any> = [];

      await Promise.all(
        rosterPokemon.map(async (pokemon) => {
          const pokemonObj: any = {
            pokemonId: pokemon.pokemonId,
            rosterId: pokemon.rosterId,
          };

          const pokeApiPokemon = (
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemonId}`, {
              headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
            })
          ).data;

          pokemonObj.name = pokeApiPokemon.name;
          pokemonObj.spriteUrl = pokeApiPokemon.sprites.front_default;
          pokemonObj.type1 = pokeApiPokemon.types[0].type.name;

          if (pokeApiPokemon.types.length > 1) {
            pokemonObj.type2 = pokeApiPokemon.types[1].type.name;
          }

          response.push(pokemonObj);
        })
      );

      res.status(200).json(response);
    } else {
      res.status(400).send('Specify an id in the endpoint if making a PUT, or DELETE request');
    }
  } else {
    res.status(400).send('Roster not found');
  }
}
