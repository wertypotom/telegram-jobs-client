'use client';

import { useState, MouseEvent } from 'react';
import { Loader2, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChannelCardProps {
  channel: {
    title: string;
    username: string;
    description?: string;
    memberCount?: number | string;
    isJoined: boolean;
  };
  canSubscribe: boolean;
  onSubscribe: (username: string) => Promise<void>;
  onUnsubscribe: (username: string) => Promise<void>;
}

export function ChannelCard({
  channel,
  canSubscribe,
  onSubscribe,
  onUnsubscribe,
}: ChannelCardProps) {
  const { t } = useTranslation('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      if (channel.isJoined) {
        await onUnsubscribe(channel.username);
      } else {
        await onSubscribe(channel.username);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatMemberCount = (count?: number | string) => {
    if (!count) return 'N/A';
    if (typeof count === 'string') return count;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between h-[180px] shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
      {/* Header Section */}
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 text-lg leading-tight truncate pr-2">
            {channel.title}
          </h3>
        </div>
        <p className="text-gray-500 text-sm mb-2">{channel.username}</p>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-snug line-clamp-2">
          {channel.description || t('exploreChannels.noDescription')}
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between mt-2 pt-2">
        <div className="flex items-center gap-1.5 text-gray-500">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">{formatMemberCount(channel.memberCount)}</span>
        </div>

        <button
          onClick={handleClick}
          disabled={!channel.isJoined && (!canSubscribe || isLoading)}
          className={`text-sm font-medium px-4 py-1.5 rounded transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 flex items-center gap-2 ${
            channel.isJoined
              ? 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-200'
              : 'bg-cyan-600 text-white hover:bg-cyan-500 focus:ring-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
          {channel.isJoined ? t('exploreChannels.subscribed') : t('exploreChannels.subscribe')}
        </button>
      </div>
    </div>
  );
}
