import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';
import { Search, Sparkles, Loader2, Zap } from 'lucide-react';
import {
  useExploreChannels,
  useUserChannels,
  useAddChannels,
  useUnsubscribeChannel,
} from './hooks/use-channels';
import { useCategories } from './hooks/use-categories';
import { useAuth } from '@/shared/hooks';
import { cn } from '@/shared/utils/cn';
import { useTranslation } from 'react-i18next';
import { canSubscribeToChannel, getChannelLimitMessage } from '@/shared/domain';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error-utils';
import { ChannelCard } from './channel-card';
import { SubscriptionLimitBanner } from './subscription-limit-banner';
import { MyChannelsList } from './my-channels-list';
import { useChannelsStore } from '@/shared/store/channels-store';

interface ExploreChannelsModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExploreChannelsModal({ open, onClose }: ExploreChannelsModalProps) {
  const { t } = useTranslation('dashboard');
  const [tab, setTab] = useState<'explore' | 'my-channels'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: user } = useAuth();

  // Get channels from Zustand store for instant sync
  const { userChannels } = useChannelsStore();

  // Still call the hook to trigger data fetching
  useUserChannels();

  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: exploreData, isLoading } = useExploreChannels({
    searchQuery: searchQuery || undefined,
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
  });

  const subscribeToChannel = useAddChannels();
  const unsubscribeChannel = useUnsubscribeChannel();

  // Use domain layer for business logic
  const subscribedCount = userChannels?.length ?? 0;
  const canSubscribe = canSubscribeToChannel(user, subscribedCount);
  const limitMessage = getChannelLimitMessage(user, subscribedCount);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSubscribe = async (channelUsername: string) => {
    if (!user) return;

    try {
      const result = await subscribeToChannel.mutateAsync([channelUsername]);

      // UI feedback with swap remaining info from server
      if (result.swapsRemaining !== undefined && result.swapsRemaining >= 0) {
        toast.info(`Channel added! ${result.swapsRemaining} swaps remaining this month.`);
      } else {
        toast.success('Channel added successfully!');
      }
    } catch (error) {
      // ✅ Server provides user-friendly error messages
      // e.g., "Plan limit exceeded. Free plan allows max 5 channels total."
      toast.error(getErrorMessage(error));
    }
  };

  const handleUnsubscribe = async (channelUsername: string) => {
    try {
      const result = await unsubscribeChannel.mutateAsync(channelUsername);

      // UI feedback with swap remaining info from server
      if (result.swapsRemaining !== undefined && result.swapsRemaining >= 0) {
        toast.info(`Unsubscribed! ${result.swapsRemaining} swaps remaining this month.`);
      } else {
        toast.success('Unsubscribed successfully!');
      }
    } catch (error) {
      // ✅ Server provides user-friendly error messages
      // e.g., "You have used all 6 channel swaps this month. Upgrade to Premium for unlimited changes."
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-cyan-600" />
            {tab === 'explore' ? t('exploreChannels.title') : t('exploreChannels.myChannels')}
          </DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setTab('explore')}
            className={cn(
              'px-4 py-2 font-semibold transition-colors border-b-2',
              tab === 'explore'
                ? 'border-cyan-600 text-cyan-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            {t('exploreChannels.explore')}
          </button>
          <button
            onClick={() => setTab('my-channels')}
            className={cn(
              'px-4 py-2 font-semibold transition-colors border-b-2 flex items-center gap-2',
              tab === 'my-channels'
                ? 'border-cyan-600 text-cyan-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            {t('exploreChannels.myChannels')}
            {(userChannels?.length ?? 0) > 0 && (
              <Badge variant={tab === 'my-channels' ? 'default' : 'secondary'} className="text-xs">
                {userChannels?.length ?? 0}
              </Badge>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {tab === 'explore' ? (
            <div className="space-y-6 p-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t('exploreChannels.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Chips */}
              <div className="flex flex-wrap gap-2">
                {loadingCategories ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                ) : (
                  categories?.map((category: string) => (
                    <Button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                      size="sm"
                      className={cn(
                        'rounded-full',
                        selectedCategories.includes(category) &&
                          'bg-cyan-600 hover:bg-cyan-500 text-white'
                      )}
                    >
                      {category}
                    </Button>
                  ))
                )}
              </div>

              {/* Hero FOMO Banner */}
              {!isLoading && exploreData && exploreData.missedJobsCount > 0 && (
                <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Zap className="h-6 w-6 text-cyan-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-lg text-gray-900">
                        {exploreData.missedJobsCount} {t('exploreChannels.missedJobs')}
                      </p>
                      <p className="text-sm text-gray-600">{t('exploreChannels.subscribeTo')}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Channel Cards Grid */}
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
                </div>
              ) : exploreData && exploreData.channels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exploreData.channels.map((channel) => (
                    <ChannelCard
                      key={channel.username}
                      channel={channel}
                      canSubscribe={canSubscribe}
                      onSubscribe={handleSubscribe}
                      onUnsubscribe={handleUnsubscribe}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  {t('exploreChannels.noChannelsFound')}
                </div>
              )}

              {/* Limit Warning Banner */}
              <SubscriptionLimitBanner
                user={user}
                limitMessage={limitMessage}
                canSubscribe={canSubscribe}
                variant="warning"
              />
            </div>
          ) : (
            <MyChannelsList
              channels={userChannels || []}
              onUnsubscribe={handleUnsubscribe}
              isUnsubscribing={unsubscribeChannel.isPending}
              limitBanner={
                <SubscriptionLimitBanner
                  user={user}
                  limitMessage={limitMessage}
                  canSubscribe={canSubscribe}
                  variant="info"
                />
              }
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
