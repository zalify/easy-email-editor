import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from './prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import prisma from 'prisma/prisma';

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      session: async ({ session, token }: { session: any; token: any }) => {
        if (session?.user) {
          session.user.id = token.uid;
        }
        return session;
      },
      jwt: async ({ user, token }: { user: any; token: any }) => {
        if (user) {
          token.uid = user.id;
        }
        return token;
      },
    },
  } as any);
export default authHandler;
