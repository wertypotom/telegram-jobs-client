import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './lib/mongodb';

// Validate required environment variables
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not set in environment variables');
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Yandex OAuth provider
    {
      id: 'yandex',
      name: 'Yandex',
      type: 'oauth',
      authorization: 'https://oauth.yandex.com/authorize',
      token: 'https://oauth.yandex.com/token',
      userinfo: 'https://login.yandex.ru/info?format=json',
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name || profile.real_name,
          email: profile.default_email,
          image: profile.default_avatar_id
            ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
            : null,
        };
      },
    },
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM || 'noreply@example.com',
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Persist user id and data to token on signin
      if (user) {
        token.id = user.id;
        token.hasCompletedOnboarding = user.hasCompletedOnboarding;
        token.subscribedChannels = user.subscribedChannels || [];
        token.plan = user.plan || 'free';
      }

      // When update() is called, fetch fresh user data from database
      if (trigger === 'update' && token.id) {
        try {
          const { ObjectId } = await import('mongodb');
          const clientPromise = (await import('@/lib/mongodb')).default;
          const client = await clientPromise;
          const db = client.db();

          const freshUser = await db.collection('users').findOne(
            { _id: new ObjectId(token.id) },
            {
              projection: {
                hasCompletedOnboarding: 1,
                subscribedChannels: 1,
                plan: 1,
              },
            }
          );

          if (freshUser) {
            token.hasCompletedOnboarding = freshUser.hasCompletedOnboarding;
            token.subscribedChannels = freshUser.subscribedChannels || [];
            token.plan = freshUser.plan || 'free';
          }
        } catch (error) {
          console.error('Failed to fetch updated user data:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add userId and user data to session from token
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.hasCompletedOnboarding = token.hasCompletedOnboarding as boolean;
        session.user.subscribedChannels = token.subscribedChannels as string[];
        session.user.plan = token.plan as 'free' | 'premium';
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  // Cookie config removed temporarily for debugging - using NextAuth defaults
};

export default NextAuth(authOptions);
