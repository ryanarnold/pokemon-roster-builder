import { PrismaClient, Roster } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Roster | Roster[] | string>
) {
  if (req.method === 'POST') {
    const { description } = req.body;

    const roster = await prisma.roster.create({
      data: {
        description,
      },
    });

    res.status(201).json(roster);
  } else if (req.method === 'GET') {
    const rosters = await prisma.roster.findMany();

    res.status(201).json(rosters);
  } else {
    res.status(400).send('Specify an id in the endpoint if making a PUT, or DELETE request');
  }
}
