import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      hasCompletedOnboarding?: boolean;
      plan?: 'free' | 'premium';
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    hasCompletedOnboarding?: boolean;
    plan?: 'free' | 'premium';
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    email?: string;
    providerId?: string; // Google's unique account ID
    hasCompletedOnboarding?: boolean;
    subscribedChannels?: string[];
    plan?: 'free' | 'premium';
  }
}
