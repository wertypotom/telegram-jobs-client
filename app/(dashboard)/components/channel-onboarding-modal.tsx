'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAvailableChannels, useSubscribeChannels, useAuth } from '@/shared/hooks';
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
import { Input } from '@/shared/ui/input';
import { Loader2, CheckCircle2, Search } from 'lucide-react';
import Fuse from 'fuse.js';

interface ChannelOnboardingModalProps {
  open: boolean;
}

export function ChannelOnboardingModal({ open }: ChannelOnboardingModalProps) {
  const router = useRouter();
  const { update } = useAuth();
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const { data: availableChannels, isLoading: loadingChannels } = useAvailableChannels();
  const { mutate: subscribe, isPending: subscribing } = useSubscribeChannels();

  const filteredChannels = useMemo(() => {
    if (!availableChannels) return [];
    if (!searchQuery.trim()) return availableChannels;

    const fuse = new Fuse(availableChannels, {
      keys: ['title', 'username', 'description'],
      threshold: 0.3,
    });

    return fuse.search(searchQuery).map((result) => result.item);
  }, [availableChannels, searchQuery]);

  const toggleChannel = (username: string) => {
    const newSelected = new Set(selectedChannels);
    if (newSelected.has(username)) {
      newSelected.delete(username);
    } else {
      newSelected.add(username);
    }
    setSelectedChannels(newSelected);
  };

  const handleProceed = () => {
    const channels = Array.from(selectedChannels);
    subscribe(channels, {
      onSuccess: async () => {
        // Force session update to refresh hasCompletedOnboarding status
        await update();
        router.push('/jobs');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Select Job Channels</DialogTitle>
          <DialogDescription>
            Choose from our curated list of Telegram channels to monitor for job postings. We
            automatically fetch and parse jobs from these channels for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold whitespace-nowrap">Available Channels</h3>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search channels..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {loadingChannels && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>

            {availableChannels && availableChannels.length > 0 ? (
              <div className="grid gap-2 max-h-[60vh] overflow-y-auto border rounded-lg p-3">
                {filteredChannels.length > 0 ? (
                  filteredChannels.map((channel) => (
                    <label
                      key={channel.username}
                      className="flex items-start space-x-3 p-3 rounded-md hover:bg-accent cursor-pointer border border-transparent hover:border-border transition-colors"
                    >
                      <Checkbox
                        checked={selectedChannels.has(channel.username)}
                        onCheckedChange={() => toggleChannel(channel.username)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-base">{channel.title}</span>
                          {channel.memberCount && (
                            <Badge variant="secondary" className="text-xs">
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
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No channels found matching "{searchQuery}"
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border rounded-lg text-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground">Loading available channels...</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              {selectedChannels.size} channel{selectedChannels.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          <Button
            onClick={handleProceed}
            disabled={selectedChannels.size === 0 || subscribing}
            size="lg"
          >
            {subscribing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : (
              'Proceed to Jobs'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
