'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  useUserChannels,
  useRecommendedChannels,
  useSearchChannels,
  useSubscribeChannels,
} from '@/shared/hooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Checkbox } from '@/shared/ui/checkbox';
import { Badge } from '@/shared/ui/badge';
import { Search, ChevronDown, ChevronUp, Loader2, CheckCircle2 } from 'lucide-react';

interface ChannelOnboardingModalProps {
  open: boolean;
}

export function ChannelOnboardingModal({ open }: ChannelOnboardingModalProps) {
  const router = useRouter();
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());
  const [showRecommended, setShowRecommended] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: userChannels, isLoading: loadingUserChannels } = useUserChannels();
  const { data: recommendedChannels } = useRecommendedChannels();
  const { data: searchResults, isLoading: searching } = useSearchChannels(searchQuery);
  const { mutate: subscribe, isPending: subscribing } = useSubscribeChannels();

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
      onSuccess: () => {
        router.push('/jobs');
      },
    });
  };

  const groupedRecommended = useMemo(() => {
    if (!recommendedChannels) return {};
    return recommendedChannels.reduce(
      (acc, channel) => {
        if (!acc[channel.category]) {
          acc[channel.category] = [];
        }
        acc[channel.category].push(channel);
        return acc;
      },
      {} as Record<string, typeof recommendedChannels>
    );
  }, [recommendedChannels]);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Select Job Channels</DialogTitle>
          <DialogDescription>
            Choose Telegram channels to monitor for job postings. We'll fetch jobs from the last 24
            hours.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Your Channels Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Telegram Channels</h3>
              {loadingUserChannels && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>

            {userChannels && userChannels.length > 0 ? (
              <div className="grid gap-2 max-h-60 overflow-y-auto border rounded-lg p-3">
                {userChannels.map((channel) => (
                  <label
                    key={channel.username}
                    className="flex items-start space-x-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedChannels.has(channel.username)}
                      onCheckedChange={() => toggleChannel(channel.username)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{channel.title}</span>
                        {channel.memberCount && (
                          <Badge variant="secondary" className="text-xs">
                            {channel.memberCount.toLocaleString()} members
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{channel.username}</p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-4 border rounded-lg">
                No channels found. Join some Telegram channels first or browse recommended channels
                below.
              </p>
            )}
          </div>

          {/* Recommended Channels Section */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => setShowRecommended(!showRecommended)}
            >
              <span className="font-semibold">Recommended Job Channels</span>
              {showRecommended ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {showRecommended && recommendedChannels && (
              <div className="space-y-4 border rounded-lg p-4 max-h-96 overflow-y-auto">
                {Object.entries(groupedRecommended).map(([category, channels]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">{category}</h4>
                    <div className="grid gap-2">
                      {channels.map((channel) => (
                        <label
                          key={channel.username}
                          className="flex items-start space-x-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                        >
                          <Checkbox
                            checked={selectedChannels.has(channel.username)}
                            onCheckedChange={() => toggleChannel(channel.username)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{channel.title}</span>
                              <Badge variant="secondary" className="text-xs">
                                {channel.memberCount}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{channel.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{channel.username}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Search Channels</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for Telegram channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {searching && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}

            {searchResults && searchResults.length > 0 && (
              <div className="grid gap-2 max-h-60 overflow-y-auto border rounded-lg p-3">
                {searchResults.map((channel) => (
                  <label
                    key={channel.username}
                    className="flex items-start space-x-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedChannels.has(channel.username)}
                      onCheckedChange={() => toggleChannel(channel.username)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{channel.title}</span>
                        {channel.memberCount && (
                          <Badge variant="secondary" className="text-xs">
                            {channel.memberCount.toLocaleString()} members
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{channel.username}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {searchQuery && !searching && searchResults && searchResults.length === 0 && (
              <p className="text-sm text-muted-foreground p-4 border rounded-lg">
                No channels found for "{searchQuery}"
              </p>
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
