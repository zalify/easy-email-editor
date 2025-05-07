import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { get } from 'lodash';
import jwt from 'jsonwebtoken';

function generateLoginToken(
  userData: { email: string; name: string },
  secretKey: string,
  expiresIn = 3600,
) {
  const payload = {
    email: userData.email,
    name: userData.name,
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  };

  return jwt.sign(payload, secretKey);
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const userId = get(session, 'user.id', '') as string;
  if (!session?.user || !userId) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'GET') {
    if (!session.user.email) {
      res.redirect('https://admin.easyemail.pro/?utm_source=open-source-version');
      return;
    }
    const loginToken = generateLoginToken(
      {
        email: session.user.email,
        name: session.user.name || session.user.email,
      },
      process.env.TOKEN_SECRET!,
      15 * 60,
    );

    res.redirect(`https://admin.easyemail.pro/token-login?token=${loginToken}`);
    // res.redirect(`http://localhost:3003/token-login?token=${loginToken}`);
  }
}
