// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type Roster = {
  id: number;
  description: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Roster | string>) {
  const { id } = req.body;

  if (id === undefined) {
    res.status(400).send('Missing roster id');
  }

  if (req.method === 'GET') {
    const roster = await prisma.roster.findUnique({
      where: {
        id: 1,
      },
    });

    if (roster) {
      res.status(200).json(roster);
    } else {
      res.status(404).send('Roster not found');
    }
  } else if (req.method === 'PUT') {
    res.status(200).json({ id: 1, description: 'Hoenn Roster' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ id: 1, description: 'Hoenn Roster' });
  }
}
