'use client';

import { Badge } from '@/shared/ui/badge';
import type { ChannelInfo } from './api/channel.api';

interface ChannelListItemProps {
  channel: ChannelInfo;
  variant: 'subscribed' | 'available';
  isSelected?: boolean;
  onToggle?: () => void;
}

export function ChannelListItem({ channel, variant, isSelected, onToggle }: ChannelListItemProps) {
  if (variant === 'subscribed') {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10">
        <div className="min-w-0">
          <div className="font-medium truncate">{channel.title}</div>
          <div className="text-xs text-muted-foreground">{channel.username}</div>
        </div>
        <Badge variant="secondary" className="ml-2 shrink-0">
          Subscribed
        </Badge>
      </div>
    );
  }

  // Available variant
  return (
    <label className="flex items-start space-x-3 p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
      <input type="checkbox" checked={isSelected} onChange={onToggle} className="mt-1" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{channel.title}</span>
          {channel.memberCount && (
            <Badge variant="outline" className="text-xs">
              {typeof channel.memberCount === 'number'
                ? channel.memberCount.toLocaleString()
                : channel.memberCount}{' '}
              members
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {channel.description || 'No description available'}
        </p>
        <p className="text-xs text-muted-foreground mt-1 font-mono">{channel.username}</p>
      </div>
    </label>
  );
}
