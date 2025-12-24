'use client';

import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Channel {
  username: string;
  title: string;
}

interface MyChannelsListProps {
  channels: Channel[];
  onUnsubscribe: (username: string) => Promise<void>;
  isUnsubscribing: boolean;
  limitBanner: React.ReactNode;
}

export function MyChannelsList({
  channels,
  onUnsubscribe,
  isUnsubscribing,
  limitBanner,
}: MyChannelsListProps) {
  const { t } = useTranslation('dashboard');

  return (
    <div className="space-y-4 p-4">
      {/* Limit Banner */}
      {limitBanner}

      {/* Subscribed Channels List */}
      {channels && channels.length > 0 ? (
        <div className="space-y-3">
          {channels.map((channel) => (
            <Card key={channel.username}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-900">{channel.title}</h3>
                  <p className="text-xs text-gray-500">{channel.username}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUnsubscribe(channel.username)}
                  disabled={isUnsubscribing}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                >
                  <X className="h-4 w-4 mr-1" />
                  {t('exploreChannels.unsubscribe')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="font-semibold">{t('exploreChannels.noChannelsYet')}</p>
          <p className="text-sm mt-2">{t('exploreChannels.switchToExplore')}</p>
        </div>
      )}
    </div>
  );
}
