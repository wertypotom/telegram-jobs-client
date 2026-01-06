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
    async jwt({ token, user, account, trigger }) {
      // On initial sign-in with OAuth provider
      if (user && account) {
        if (process.env.NODE_ENV === 'development') {
          console.log('[AUTH] New sign-in:', {
            userId: user.id,
            email: user.email,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          });
        }

        token.id = user.id;
        token.email = user.email || undefined;
        token.providerId = account.providerAccountId; // Store Google's unique ID
        token.hasCompletedOnboarding = user.hasCompletedOnboarding;
        token.subscribedChannels = user.subscribedChannels || [];
        token.plan = user.plan || 'free';
        return token;
      }

      // On subsequent requests, token already exists
      // This is normal for JWT strategy - token persists across requests

      // When update() is called, fetch fresh user data from database
      if (trigger === 'update' && token.id) {
        try {
          const { ObjectId } = await import('mongodb');
          const clientPromise = (await import('./lib/mongodb')).default; // Corrected path
          const client = await clientPromise;
          const db = client.db();

          const freshUser = await db.collection('users').findOne(
            { _id: new ObjectId(token.id as string) }, // Cast token.id to string
            {
              projection: {
                email: 1,
                hasCompletedOnboarding: 1,
                subscribedChannels: 1,
                plan: 1,
              },
            }
          );

          if (freshUser) {
            token.email = freshUser.email;
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
        session.user.email = token.email as string;
        session.user.hasCompletedOnboarding = token.hasCompletedOnboarding as boolean;
        session.user.subscribedChannels = token.subscribedChannels as string[];
        session.user.plan = token.plan as 'free' | 'premium';

        if (process.env.NODE_ENV === 'development') {
          console.log('[AUTH] Session created for:', {
            userId: session.user.id,
            email: session.user.email,
          });
        }
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[AUTH EVENT] Sign in:', {
          userId: user.id,
          userEmail: user.email,
          provider: account?.provider,
          providerAccountId: account?.providerAccountId,
          profileEmail: profile?.email,
          isNewUser,
        });
      }
    },
    async signOut({ token }) {
      // Explicitly log sign-out to track session cleanup
      if (process.env.NODE_ENV === 'development') {
        console.log('[AUTH EVENT] Sign out - clearing token:', {
          userId: token?.id,
          email: token?.email,
          providerId: token?.providerId,
        });
      }
      // Token will be cleared by NextAuth cookie deletion
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 60 * 60, // 1 hour - sync with DB more frequently for payment updates
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  // Cookie config removed temporarily for debugging - using NextAuth defaults
};

export default NextAuth(authOptions);
