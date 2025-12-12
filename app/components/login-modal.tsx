'use client';

import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { Sparkles, X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoginModal } from '@/shared/stores/use-login-modal';

export function LoginModal() {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('auth');
  const { isOpen, closeModal } = useLoginModal();

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

  const handleClose = () => {
    closeModal();
    // Reset state after animation
    setTimeout(() => {
      setEmail('');
      setIsEmailSent(false);
      setIsLoading(false);
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in-0 duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="bg-white rounded-2xl shadow-2xl">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-6 top-6 rounded-full p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors z-10"
          >
            <X size={20} />
          </button>
          {/* Header */}
          <div className="text-center pt-8 px-6 pb-4">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-12 w-12 text-cyan-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('login.title')}</h2>
            <p className="text-sm text-slate-600">{t('login.subtitle')}</p>
          </div>

          {/* Content */}
          <div className="px-6 pb-8 space-y-6">
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
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">{t('login.or')}</span>
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
                <p className="text-sm text-slate-600">{t('login.checkEmail')}</p>
                <Button variant="ghost" size="sm" onClick={() => setIsEmailSent(false)}>
                  {t('login.useDifferentEmail')}
                </Button>
              </div>
            )}

            <div className="text-center text-xs text-slate-500">
              <p>
                {t('login.termsAgree')}{' '}
                <a href="#" className="underline hover:text-slate-900">
                  {t('login.termsOfService')}
                </a>{' '}
                {t('login.and')}{' '}
                <a href="#" className="underline hover:text-slate-900">
                  {t('login.privacyPolicy')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
