import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'Your email' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.NEXTAUTH_URL + '/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials && credentials.email,
            password: credentials && credentials.password
          })
        });
        const user = await res.json();
        console.log(user);
        if(res.ok && user) {
          return user;
        } else {
          return null;
        }
      }
    }),
  ],
  session: {
    maxAge: 60 * 60,
    updateAge: 5 * 60
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    }
  }
};