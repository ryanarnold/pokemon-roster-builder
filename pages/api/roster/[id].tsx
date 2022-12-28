import { PrismaClient, Roster } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Roster | string>) {
  const { id } = req.query;

  if (id === undefined) {
    res.status(400).send('Missing roster id');
  }

  const roster = await prisma.roster.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });

  if (roster) {
    if (req.method === 'GET') {
      res.status(200).json(roster);
    } else if (req.method === 'PUT') {
      const { description } = req.body;

      const updatedRoster = await prisma.roster.update({
        where: {
          id: roster.id,
        },
        data: {
          description: description,
        },
      });

      res.status(200).json(updatedRoster);
    } else if (req.method === 'DELETE') {
      await prisma.roster.delete({
        where: {
          id: roster.id,
        },
      });

      res.status(200).send('Roster deleted');
    }
  } else {
    res.status(400).send('Roster not found');
  }
}
