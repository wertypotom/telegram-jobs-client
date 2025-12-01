'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui';
import { TelegramAuthForm } from './components/telegram-auth-form';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
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
