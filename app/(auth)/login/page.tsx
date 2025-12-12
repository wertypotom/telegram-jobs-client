'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('auth');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn('email', { email, redirect: false });
      setIsEmailSent(true);
    } catch (error) {
      console.error('Email login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <Link
          href="/"
          className="flex justify-center mb-4 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Sparkles className="h-12 w-12 text-primary" />
        </Link>
        <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
        <CardDescription>{t('login.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn('google', { callbackUrl: '/jobs' })}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t('login.continueWithGoogle')}
          </Button>

          {/* <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn('yandex', { callbackUrl: '/jobs' })}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 2h-3v20h3v-9h2.5l3.5 9h3.5l-4-10c2-1 3-3 3-5.5C22 3.5 19.5 2 16 2h-2.5zm0 3h2.5c1.5 0 2.5.5 2.5 2s-1 2-2.5 2h-2.5V5z" />
            </svg>
            Continue with Yandex
          </Button> */}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">{t('login.or')}</span>
          </div>
        </div>

        {/* Email Login */}
        {!isEmailSent ? (
          <form onSubmit={handleEmailLogin} className="space-y-3">
            <Input
              type="email"
              placeholder={t('login.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('login.sending') : t('login.continueWithEmail')}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">{t('login.checkEmail')}</p>
            <Button variant="ghost" size="sm" onClick={() => setIsEmailSent(false)}>
              {t('login.useDifferentEmail')}
            </Button>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>
            {t('login.termsAgree')}{' '}
            <Link href="#" className="underline hover:text-foreground">
              {t('login.termsOfService')}
            </Link>{' '}
            {t('login.and')}{' '}
            <Link href="#" className="underline hover:text-foreground">
              {t('login.privacyPolicy')}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
