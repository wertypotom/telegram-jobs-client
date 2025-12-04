'use client';

import { useState } from 'react';
import { useUserChannels, useAvailableChannels } from '@/shared/hooks/use-channels';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { X, Plus, Loader2 } from 'lucide-react';
import type { ChannelInfo } from '@/shared/api/channel.api';
import { channelApi } from '@/shared/api/channel.api';
import { useQueryClient } from '@tanstack/react-query';

export function DebugChannelWidget() {
  const { data: subscribedChannels, isLoading: loadingSubscribed } = useUserChannels();
  const { data: availableChannels, isLoading: loadingAvailable } = useAvailableChannels();
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  const subscribedUsernames = subscribedChannels?.map((c) => c.username) || [];

  const handleToggleChannel = async (username: string) => {
    setIsUpdating(true);
    try {
      const isSubscribed = subscribedUsernames.includes(username);
      const updated = isSubscribed
        ? subscribedUsernames.filter((u) => u !== username)
        : [...subscribedUsernames, username];

      await channelApi.subscribeToChannels(updated);
      await queryClient.invalidateQueries({ queryKey: ['user-channels'] });
      await queryClient.invalidateQueries({ queryKey: ['jobs'] });
    } catch (error) {
      console.error('Failed to toggle channel:', error);
      alert(error instanceof Error ? error.message : 'Failed to update subscription');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loadingSubscribed || loadingAvailable) {
    return (
      <Card className="mb-6 border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <Loader2 className="h-4 w-4 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">🔧 Debug: Channel Subscriptions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Subscribed Channels */}
        <div>
          <h3 className="text-xs font-semibold text-gray-700 mb-2">
            My Subscribed Channels ({subscribedChannels?.length || 0})
          </h3>
          <div className="flex flex-wrap gap-2">
            {subscribedChannels && subscribedChannels.length > 0 ? (
              subscribedChannels.map((channel: ChannelInfo) => (
                <Badge
                  key={channel.username}
                  variant="default"
                  className="px-3 py-1 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700"
                >
                  {channel.title || channel.username}
                  <button
                    onClick={() => handleToggleChannel(channel.username)}
                    disabled={isUpdating}
                    className="hover:text-red-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                No channels subscribed. Choose from available channels below.
              </p>
            )}
          </div>
        </div>

        {/* Available Channels */}
        <div>
          <h3 className="text-xs font-semibold text-gray-700 mb-2">
            Available Channels ({availableChannels?.length || 0})
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableChannels && availableChannels.length > 0 ? (
              availableChannels
                .filter((channel) => !subscribedUsernames.includes(channel.username))
                .map((channel: ChannelInfo) => (
                  <Badge
                    key={channel.username}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-2 cursor-pointer hover:bg-gray-300"
                    onClick={() => handleToggleChannel(channel.username)}
                  >
                    {channel.title || channel.username}
                    <Plus className="h-3 w-3" />
                  </Badge>
                ))
            ) : (
              <p className="text-xs text-muted-foreground">
                {subscribedUsernames.length === availableChannels?.length
                  ? 'You are subscribed to all available channels!'
                  : 'No additional channels available.'}
              </p>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground border-t pt-3">
          💡 <strong>Curated Channels Only:</strong> You can only subscribe to channels that are
          pre-monitored by the system. Click a channel to subscribe/unsubscribe.
        </p>
      </CardContent>
    </Card>
  );
}
