'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui';
import { TelegramAuthForm } from './components/telegram-auth-form';
import { Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { data: user, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/jobs');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Sparkles className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome to JobSniper</CardTitle>
        <CardDescription>
          Login with your Telegram account to access job feeds from your groups
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <TelegramAuthForm />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            By logging in, you agree to our{' '}
            <Link href="#" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
