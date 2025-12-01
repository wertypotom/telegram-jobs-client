'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSendTelegramCode, useVerifyTelegramCode, useVerifyTelegramPassword } from '@/shared/hooks';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui';
import { Phone, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';

export function TelegramAuthForm() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'code' | 'password'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { mutate: sendCode, isPending: isSendingCode } = useSendTelegramCode();
  const { mutate: verifyCode, isPending: isVerifyingCode } = useVerifyTelegramCode();
  const { mutate: verifyPassword, isPending: isVerifyingPassword } = useVerifyTelegramPassword();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneNumber.startsWith('+')) {
      setError('Phone number must include country code (e.g., +1234567890)');
      return;
    }

    sendCode(
      { phoneNumber },
      {
        onSuccess: () => {
          setStep('code');
        },
        onError: (error: any) => {
          setError(error.response?.data?.message || 'Failed to send code');
        },
      }
    );
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    verifyCode(
      { phoneNumber, code },
      {
        onSuccess: (data: any) => {
          // Check if 2FA is required
          if (data.requires2FA) {
            setStep('password');
          } else {
            router.push('/jobs');
          }
        },
        onError: (error: any) => {
          setError(error.response?.data?.message || 'Invalid code');
        },
      }
    );
  };

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    verifyPassword(
      { phoneNumber, password },
      {
        onSuccess: () => {
          router.push('/jobs');
        },
        onError: (error: any) => {
          console.log("ERROR ,💥", error)

          setError(error.response?.data?.message || 'Invalid 2FA password');
        },
      }
    );
  };

  if (step === 'phone') {
    return (
      <form onSubmit={handleSendCode} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Include country code (e.g., +1 for US, +44 for UK)
          </p>
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSendingCode}>
          {isSendingCode ? 'Sending Code...' : 'Send Verification Code'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    );
  }

  if (step === 'password') {
    return (
      <form onSubmit={handleVerifyPassword} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            2FA Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your Telegram 2FA password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter your Telegram two-factor authentication password
          </p>
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Button type="submit" className="w-full" disabled={isVerifyingPassword}>
            {isVerifyingPassword ? 'Verifying...' : 'Verify Password'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setStep('phone');
              setCode('');
              setPassword('');
              setError('');
            }}
          >
            Start Over
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyCode} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="code" className="text-sm font-medium">
          Verification Code
        </label>
        <Input
          id="code"
          type="text"
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
        />
        <p className="text-xs text-muted-foreground">
          Enter the code sent to {phoneNumber}
        </p>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={isVerifyingCode}>
          {isVerifyingCode ? 'Verifying...' : 'Verify Code'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => {
            setStep('phone');
            setCode('');
            setError('');
          }}
        >
          Change Phone Number
        </Button>
      </div>
    </form>
  );
}
