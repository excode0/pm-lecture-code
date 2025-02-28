import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma'; // Pastikan path sesuai

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan password diperlukan.');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('User tidak ditemukan.');
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password,
        );
        if (!isValidPassword) {
          throw new Error('Password salah.');
        }

        return {
          id: user.id.toString(), // Pastikan ID dikembalikan sebagai string
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          createdAt: user.createdAt,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string; // Tambahkan ID ke session user
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Pastikan ID masuk ke token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
