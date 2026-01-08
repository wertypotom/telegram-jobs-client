'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks';
import { useSubscription, useUserChannels, useUnsubscribeChannel } from './hooks/use-account-data';
import { UserInfoCard } from './components/user-info-card';
import { SubscriptionDetailsCard } from './components/subscription-details-card';
import { MyChannelsCard } from './components/my-channels-card';
import { QuickActionsCard } from './components/quick-actions-card';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/shared/ui/skeleton';
import { useChannelsStore } from '@/shared/store/channels-store';

export default function AccountPage() {
  const { t } = useTranslation('dashboard');
  const router = useRouter();
  const { data: user, isLoading: authLoading } = useAuth();
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription();

  // Get channels from Zustand store for instant sync
  const { userChannels, isLoading: channelsLoading } = useChannelsStore();

  // Still call the hook to trigger data fetching
  useUserChannels();

  const unsubscribeChannelMutation = useUnsubscribeChannel();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user?.id) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const handleUnsubscribe = async (username: string) => {
    await unsubscribeChannelMutation.mutateAsync(username);
  };

  // Don't render if no user
  if (!user?.id) {
    return null;
  }

  const isLoading = authLoading || subscriptionLoading || channelsLoading;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('account.title')}</h1>
          <p className="text-gray-500 mt-2">{t('account.subtitle')}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Info Card */}
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <UserInfoCard
                user={user}
                swapsRemaining={subscription?.plan === 'premium' ? -1 : undefined}
              />
            )}

            {/* Quick Actions Card */}
            <QuickActionsCard />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subscription Details Card */}
            {subscriptionLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : subscription ? (
              <SubscriptionDetailsCard subscription={subscription} />
            ) : null}

            {/* My Channels Card */}
            {channelsLoading ? (
              <Skeleton className="h-96 w-full" />
            ) : (
              <MyChannelsCard
                channels={userChannels || []}
                onUnsubscribe={handleUnsubscribe}
                isLoading={unsubscribeChannelMutation.isPending}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
