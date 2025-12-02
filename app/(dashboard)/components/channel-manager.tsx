'use client';

import { useState } from 'react';
import { useUserChannels, useAvailableChannels, useAddChannels } from '@/shared/hooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Badge } from '@/shared/ui/badge';
import { Loader2, CheckCircle2, Plus } from 'lucide-react';

interface ChannelManagerProps {
  open: boolean;
  onClose: () => void;
}

export function ChannelManager({ open, onClose }: ChannelManagerProps) {
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());

  // Channels the user is already subscribed to
  const { data: userChannels, isLoading: loadingUserChannels } = useUserChannels();

  // All channels available on the server
  const { data: availableChannels, isLoading: loadingAvailable } = useAvailableChannels();

  const { mutate: addChannels, isPending: adding } = useAddChannels();

  const toggleChannel = (username: string) => {
    const newSelected = new Set(selectedChannels);
    if (newSelected.has(username)) {
      newSelected.delete(username);
    } else {
      newSelected.add(username);
    }
    setSelectedChannels(newSelected);
  };

  const handleAddChannels = () => {
    const channels = Array.from(selectedChannels);
    addChannels(channels, {
      onSuccess: () => {
        // Reset selection
        setSelectedChannels(new Set());
        onClose();
      },
      onError: (error: Error | any) => {
        console.error('Failed to add channels:', error);
      },
    });
  };

  // Filter available channels to show only ones the user is NOT subscribed to
  const channelsToAdd = availableChannels?.filter(
    (channel) => !userChannels?.some((userChannel) => userChannel.username === channel.username)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Manage Job Channels</DialogTitle>
          <DialogDescription>
            View your subscriptions and add new channels to your feed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Currently Subscribed Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Your Subscriptions
            </h3>

            {loadingUserChannels ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : userChannels && userChannels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userChannels.map((channel) => (
                  <div
                    key={channel.username}
                    className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10"
                  >
                    <div className="min-w-0">
                      <div className="font-medium truncate">{channel.title}</div>
                      <div className="text-xs text-muted-foreground">{channel.username}</div>
                    </div>
                    <Badge variant="secondary" className="ml-2 shrink-0">
                      Subscribed
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-4 border rounded-lg bg-muted/50 text-center">
                You haven't subscribed to any channels yet.
              </p>
            )}
          </div>

          {/* Available Channels Section */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Available to Add
            </h3>

            {loadingAvailable ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : channelsToAdd && channelsToAdd.length > 0 ? (
              <div className="grid gap-2 max-h-60 overflow-y-auto border rounded-lg p-3">
                {channelsToAdd.map((channel) => (
                  <label
                    key={channel.username}
                    className="flex items-start space-x-3 p-3 rounded-md hover:bg-accent cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={selectedChannels.has(channel.username)}
                      onCheckedChange={() => toggleChannel(channel.username)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{channel.title}</span>
                        {channel.memberCount && (
                          <Badge variant="outline" className="text-xs">
                            {channel.memberCount.toLocaleString()} members
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {channel.description || 'No description available'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">
                        {channel.username}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-4 border rounded-lg bg-muted/50 text-center">
                {userChannels && userChannels.length > 0
                  ? "You've subscribed to all available channels! 🎉"
                  : 'No channels available at the moment.'}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedChannels.size} channel{selectedChannels.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleAddChannels} disabled={selectedChannels.size === 0 || adding}>
              {adding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Selected'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
