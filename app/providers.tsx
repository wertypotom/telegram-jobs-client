'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryProvider } from '@/shared/providers/query-provider';
import { Toaster } from 'sonner';
import '@/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <QueryProvider>
        {children}
        <Toaster richColors position="top-right" />
      </QueryProvider>
    </SessionProvider>
  );
}
