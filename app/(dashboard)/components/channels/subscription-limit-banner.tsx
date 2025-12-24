'use client';

import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { useTranslation } from 'react-i18next';
import type { User } from '@/shared/types/models';

interface SubscriptionLimitBannerProps {
  user: User | null;
  limitMessage: string;
  canSubscribe: boolean;
  variant?: 'warning' | 'info';
}

export function SubscriptionLimitBanner({
  user,
  limitMessage,
  canSubscribe,
  variant = 'info',
}: SubscriptionLimitBannerProps) {
  const { t } = useTranslation('dashboard');

  if (variant === 'warning' && !canSubscribe && user?.plan === 'free') {
    return (
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <p className="text-sm font-semibold text-amber-900">
            {t('exploreChannels.freeLimitReached')} ({limitMessage})
          </p>
          <p className="text-xs text-amber-700 mt-1">{t('exploreChannels.unsubscribeToAdd')}</p>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'info') {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">
              {user?.plan === 'free'
                ? t('exploreChannels.freePlan')
                : t('exploreChannels.premiumPlan')}
            </span>
            <Badge variant={canSubscribe ? 'default' : 'destructive'}>{limitMessage}</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
