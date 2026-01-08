'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import type { ChannelInfo } from '../../components/channels/api/channel.api';
import { useTranslation } from 'react-i18next';
import { Radio, Search, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface MyChannelsCardProps {
  channels: ChannelInfo[];
  onUnsubscribe: (username: string) => Promise<void>;
  isLoading: boolean;
}

export function MyChannelsCard({ channels, onUnsubscribe, isLoading }: MyChannelsCardProps) {
  const { t } = useTranslation('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [unsubscribingChannel, setUnsubscribingChannel] = useState<string | null>(null);

  // Filter channels based on search query
  const filteredChannels = useMemo(() => {
    if (!searchQuery.trim()) return channels;

    const query = searchQuery.toLowerCase();
    return channels.filter(
      (channel) =>
        channel.title.toLowerCase().includes(query) ||
        channel.username.toLowerCase().includes(query) ||
        channel.description?.toLowerCase().includes(query)
    );
  }, [channels, searchQuery]);

  const handleUnsubscribe = async (username: string) => {
    try {
      setUnsubscribingChannel(username);
      await onUnsubscribe(username);
      toast.success(t('account.channels.unsubscribeSuccess'));
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message
          : undefined;
      toast.error(errorMessage || t('account.channels.unsubscribeError'));
    } finally {
      setUnsubscribingChannel(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-cyan-600" />
          {t('account.channels.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Channel Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{t('account.channels.subscribedCount')}</span>
          <span className="font-medium text-gray-900">{channels.length}</span>
        </div>

        {/* Search Bar */}
        {channels.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={t('account.channels.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Channels List */}
        {filteredChannels.length > 0 ? (
          <div className="max-h-96 overflow-y-auto custom-scrollbar space-y-2">
            {filteredChannels.map((channel) => (
              <div
                key={channel.username}
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckCircle2 className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">{channel.title}</h4>
                  <p className="text-xs text-gray-500 truncate">{channel.username}</p>
                  {channel.description && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{channel.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUnsubscribe(channel.username)}
                  disabled={unsubscribingChannel === channel.username || isLoading}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : channels.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Radio className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p className="font-medium">{t('account.channels.noChannels')}</p>
            <p className="text-sm mt-1">{t('account.channels.exploreChannels')}</p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p className="font-medium">{t('account.channels.noResults')}</p>
            <p className="text-sm mt-1">{t('account.channels.tryDifferentSearch')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
