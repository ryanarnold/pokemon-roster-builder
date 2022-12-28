// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Roster } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Roster | string>) {
  if (req.method === 'POST') {
    const { description } = req.body;

    const roster = await prisma.roster.create({
      data: {
        description,
      },
    });

    res.status(201).json(roster);
  } else {
    res.status(400).send('Specify an id in the endpoint if making a GET, PUT, or DELETE request');
  }
}
