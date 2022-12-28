import { PrismaClient, RosterPokemon } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RosterPokemon | string>
) {
  const { id, pokemonId } = req.query;

  if (id === undefined) {
    res.status(400).send('Missing roster id');
  }

  if (pokemonId === undefined) {
    res.status(400).send('Missing pokemon id');
  }

  const roster = await prisma.roster.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });

  if (roster) {
    const rosterPokemon = await prisma.rosterPokemon.findFirst({
      where: {
        rosterId: roster.id,
        pokemonId: parseInt(pokemonId as string),
      },
    });

    if (rosterPokemon) {
      if (req.method === 'GET') {
        res.status(200).json(rosterPokemon);
      } else if (req.method === 'DELETE') {
        await prisma.rosterPokemon.delete({
          where: {
            pokemonId_rosterId: {
              pokemonId: parseInt(pokemonId as string),
              rosterId: roster.id,
            },
          },
        });

        res.status(200).send('Roster pokemon deleted');
      }
    } else {
      res.status(400).send('Roster pokemon not found');
    }
  } else {
    res.status(400).send('Roster not found');
  }
}
