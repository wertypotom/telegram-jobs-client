'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { useTranslation } from 'react-i18next';
import { Bell, Settings } from 'lucide-react';
import Link from 'next/link';

export function QuickActionsCard() {
  const { t } = useTranslation('dashboard');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-cyan-600" />
          {t('account.quickActions.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/settings/notifications" className="block">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Bell className="h-4 w-4" />
            {t('account.quickActions.configureNotifications')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
