'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';
import { Search, Sparkles, Loader2, X, Zap, Users, FileText } from 'lucide-react';
import {
  useExploreChannels,
  useUserChannels,
  useAddChannels,
  useUnsubscribeChannel,
} from '@/shared/hooks/use-channels';
import { useCategories } from '@/shared/hooks/use-categories';
import { useAuth } from '@/shared/hooks';
import { cn } from '@/shared/utils/cn';

interface ExploreChannelsModalProps {
  open: boolean;
  onClose: () => void;
}

interface FlipCardProps {
  channel: any;
  canSubscribe: boolean;
  subscribeToChannel: any;
  handleSubscribe: (username: string) => void;
  handleUnsubscribe: (username: string) => void;
  formatMemberCount: (count?: number | string) => string;
}

function FlipCard({
  channel,
  canSubscribe,
  subscribeToChannel,
  handleSubscribe,
  handleUnsubscribe,
  formatMemberCount,
}: FlipCardProps) {
  const [showStats, setShowStats] = useState(false);

  const toggleStats = () => setShowStats(!showStats);

  const handleSubscribeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (channel.isJoined) {
      await handleUnsubscribe(channel.username);
    } else {
      await handleSubscribe(channel.username);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between h-[220px] shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
      {/* Header Section */}
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 text-lg leading-tight truncate pr-2">
            {channel.title}
          </h3>
        </div>
        <p className="text-gray-500 text-sm mb-2">{channel.username}</p>

        {/* Content Area: Swaps between Description and Stats */}
        <div className="flex-grow">
          {!showStats ? (
            <p className="text-gray-600 text-sm leading-snug line-clamp-3">
              {channel.description || 'No description available'}
            </p>
          ) : (
            <div className="space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Members</span>
                </div>
                <span className="font-bold text-gray-800 text-base">
                  {formatMemberCount(channel.memberCount)}
                </span>
              </div>
              {channel.dailyJobCount !== undefined && channel.dailyJobCount > 0 && (
                <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Avg. Daily Posts</span>
                  </div>
                  <span className="font-bold text-gray-800 text-base">{channel.dailyJobCount}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between mt-2 pt-2">
        <button
          onClick={toggleStats}
          className="text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200"
        >
          {showStats ? 'Back to info' : 'Click to see stats'}
        </button>

        <button
          onClick={handleSubscribeClick}
          disabled={!channel.isJoined && (!canSubscribe || subscribeToChannel.isPending)}
          className={`text-sm font-medium px-4 py-1.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            channel.isJoined
              ? 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-200'
              : 'bg-cyan-600 text-white hover:bg-cyan-500 focus:ring-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {channel.isJoined ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
}

export function ExploreChannelsModal({ open, onClose }: ExploreChannelsModalProps) {
  const [tab, setTab] = useState<'explore' | 'my-channels'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: user } = useAuth();
  const { data: userChannels } = useUserChannels();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: exploreData, isLoading } = useExploreChannels({
    searchQuery: searchQuery || undefined,
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
  });

  const subscribeToChannel = useAddChannels();
  const unsubscribeChannel = useUnsubscribeChannel();

  const subscribedCount = user?.subscribedChannels?.length ?? 0;
  const maxChannels = user?.plan === 'premium' ? 50 : 5;
  const canSubscribe = subscribedCount < maxChannels;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSubscribe = async (channelUsername: string) => {
    if (!user || !canSubscribe) return;
    await subscribeToChannel.mutateAsync([channelUsername]);
  };

  const handleUnsubscribe = async (channelUsername: string) => {
    await unsubscribeChannel.mutateAsync(channelUsername);
  };

  const formatMemberCount = (count?: number | string) => {
    if (!count) return 'N/A';
    if (typeof count === 'string') return count; // Already formatted in seed ("80K+")
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-cyan-600" />
            {tab === 'explore' ? 'Explore Channels' : 'My Channels'}
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
            Explore
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
            My Channels
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
                  placeholder="Search channels by name, tech stack, or keywords..."
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
                        {exploreData.missedJobsCount} jobs found in these channels!
                      </p>
                      <p className="text-sm text-gray-600">
                        Subscribe to see opportunities you're missing
                      </p>
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
                    <FlipCard
                      key={channel.username}
                      channel={channel}
                      canSubscribe={canSubscribe}
                      subscribeToChannel={subscribeToChannel}
                      handleSubscribe={handleSubscribe}
                      handleUnsubscribe={handleUnsubscribe}
                      formatMemberCount={formatMemberCount}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No channels found. Try adjusting your filters.
                </div>
              )}

              {/* Free Tier Warning */}
              {!canSubscribe && user?.plan === 'free' && (
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-amber-900">
                      Free Tier Limit Reached ({subscribedCount}/{maxChannels})
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Unsubscribe from channels in "My Channels" tab to add new ones.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            /* My Channels Tab */
            <div className="space-y-4 p-4">
              {/* Limit Counter */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      {user?.plan === 'free' ? 'Free Plan' : 'Premium Plan'}
                    </span>
                    <Badge variant={canSubscribe ? 'default' : 'destructive'}>
                      {subscribedCount}/{maxChannels} Used
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Subscribed Channels List */}
              {userChannels && userChannels.length > 0 ? (
                <div className="space-y-3">
                  {userChannels.map((channel) => (
                    <Card key={channel.username}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-gray-900">{channel.title}</h3>
                          <p className="text-xs text-gray-500">{channel.username}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnsubscribe(channel.username)}
                          disabled={unsubscribeChannel.isPending}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Unsubscribe
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="font-semibold">No channels yet</p>
                  <p className="text-sm mt-2">Switch to Explore tab to find channels</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
