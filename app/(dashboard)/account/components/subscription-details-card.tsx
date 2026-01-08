'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import type { SubscriptionStatusResponse } from '@/shared/api/payment.api';
import { useTranslation } from 'react-i18next';
import { CreditCard, Calendar, AlertCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionDetailsCardProps {
  subscription: SubscriptionStatusResponse;
}

export function SubscriptionDetailsCard({ subscription }: SubscriptionDetailsCardProps) {
  const { t } = useTranslation('dashboard');

  const isPremium = subscription.plan === 'premium';

  const getStatusBadge = () => {
    if (!subscription.status) return null;

    const statusConfig = {
      active: {
        label: t('account.subscription.status.active'),
        className: 'bg-green-100 hover:bg-green-100 text-green-800 cursor-default',
      },
      cancelled: {
        label: t('account.subscription.status.cancelled'),
        className: 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800 cursor-default',
      },
      past_due: {
        label: t('account.subscription.status.pastDue'),
        className: 'bg-red-100 hover:bg-red-100 text-red-800 cursor-default',
      },
      expired: {
        label: t('account.subscription.status.expired'),
        className: 'bg-gray-100 hover:bg-gray-100 text-gray-800 cursor-default',
      },
    };

    const config = statusConfig[subscription.status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-cyan-600" />
          {t('account.subscription.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Type */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{t('account.subscription.currentPlan')}</span>
          <Badge
            variant={isPremium ? 'default' : 'secondary'}
            className={`cursor-default ${
              isPremium
                ? 'bg-cyan-600 hover:bg-cyan-600 text-white'
                : 'bg-gray-200 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isPremium ? t('account.subscription.premium') : t('account.subscription.free')}
          </Badge>
        </div>

        {/* Status */}
        {subscription.status && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{t('account.subscription.status.label')}</span>
            {getStatusBadge()}
          </div>
        )}

        {/* Next Billing Date / Expiration */}
        {subscription.currentPeriodEnd && (
          <div className="flex items-start gap-3 pt-3 border-t">
            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">
                {subscription.cancelAtPeriodEnd
                  ? t('account.subscription.activeUntil')
                  : t('account.subscription.nextBilling')}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(subscription.currentPeriodEnd)}
              </p>
            </div>
          </div>
        )}

        {/* Cancel at period end warning */}
        {subscription.cancelAtPeriodEnd && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-yellow-800">{t('account.subscription.cancelledWarning')}</p>
          </div>
        )}

        {/* Manage Subscription Button */}
        <div className="pt-3 border-t">
          <Link href="/pricing">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              {isPremium
                ? t('account.subscription.manageSubscription')
                : t('account.subscription.upgradeToPremium')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
