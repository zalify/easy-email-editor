import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { get } from 'lodash';
import prisma from 'prisma/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const emailTemplateId = req.query.id;

  const session = await getSession({ req });
  const userId = get(session, 'user.id', '') as string;
  if (!session || !userId) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'DELETE') {
    if (session) {
      const emailTemplate = await prisma.emailTemplate.deleteMany({
        where: { id: String(emailTemplateId), userId },
      });
      res.json(emailTemplate);
    }
  } else if (req.method === 'GET') {
    const result = await prisma.emailTemplate.findFirst({
      where: {
        id: String(emailTemplateId),
        userId: userId,
      },
    });
    res.json(result);
  } else if (req.method === 'PATCH') {
    const result = await prisma.emailTemplate.updateMany({
      where: {
        id: String(emailTemplateId),
        userId: userId,
      },
      data: req.body,
    });
    res.json(result);
  }
}
