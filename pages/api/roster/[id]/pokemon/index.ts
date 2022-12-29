import { PrismaClient, RosterPokemon } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RosterPokemon | RosterPokemon[] | string>
) {
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

      res.status(200).json(rosterPokemon);
    } else {
      res.status(400).send('Specify an id in the endpoint if making a PUT, or DELETE request');
    }
  } else {
    res.status(400).send('Roster not found');
  }
}
