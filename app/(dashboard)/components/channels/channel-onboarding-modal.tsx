'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAvailableChannels, useSubscribeChannels } from './hooks/use-channels';
import { useAuth, useBundles } from '@/shared/hooks';
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
import { Loader2, CheckCircle2, Search, ArrowLeft, HelpCircle } from 'lucide-react';
import Fuse from 'fuse.js';
import { BundleSelectionStep } from '../bundles/bundle-selection-step';

const MAX_FREE_CHANNELS = 5;

interface ChannelOnboardingModalProps {
  open: boolean;
}

type Step = 'BUNDLE' | 'REFINE';

export function ChannelOnboardingModal({ open }: ChannelOnboardingModalProps) {
  const router = useRouter();
  const { update } = useAuth();
  const [step, setStep] = useState<Step>('BUNDLE');
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const { data: availableChannels, isLoading: loadingChannels } = useAvailableChannels();
  const { mutate: subscribe, isPending: subscribing } = useSubscribeChannels();
  const { data: bundles } = useBundles();

  const filteredChannels = useMemo(() => {
    if (!availableChannels) return [];
    if (!searchQuery.trim()) return availableChannels;

    const fuse = new Fuse(availableChannels, {
      keys: ['title', 'username', 'description'],
      threshold: 0.3,
    });

    return fuse.search(searchQuery).map((result) => result.item);
  }, [availableChannels, searchQuery]);

  const handleSelectBundle = (bundleId: string) => {
    setSelectedBundle(bundleId);
  };

  const handleContinueFromBundle = () => {
    if (!selectedBundle || !bundles) return;

    // Pre-populate channels from selected bundle
    const bundle = bundles.find((b) => b.id === selectedBundle);
    if (bundle) {
      setSelectedChannels(new Set(bundle.channels));
    }
    setStep('REFINE');
  };

  const handleSkipToCustom = () => {
    setSelectedChannels(new Set());
    setStep('REFINE');
  };

  const handleBackToBundle = () => {
    setStep('BUNDLE');
  };

  const toggleChannel = (username: string) => {
    const newSelected = new Set(selectedChannels);
    if (newSelected.has(username)) {
      newSelected.delete(username);
    } else {
      // Enforce 5-channel limit
      if (newSelected.size >= MAX_FREE_CHANNELS) {
        return; // Don't add if limit reached
      }
      newSelected.add(username);
    }
    setSelectedChannels(newSelected);
  };

  const handleFinish = () => {
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
      <DialogContent
        className="max-w-4xl w-full h-[85vh] overflow-hidden flex flex-col border-border outline-none focus-visible:outline-none"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl ">
            {step === 'BUNDLE' ? 'Welcome to JobSniper' : 'Customize Your Feed'}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1.5">
            {step === 'BUNDLE' ? (
              <>
                Get started with a curated bundle. You can swap channels up to 6 times per month.
                <span
                  title="A swap is any change to your channel list (adding or removing a channel). Premium users get unlimited swaps."
                  className="inline-flex cursor-help"
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </span>
              </>
            ) : (
              `Select up to ${MAX_FREE_CHANNELS} channels to monitor for job postings`
            )}
          </DialogDescription>
        </DialogHeader>

        {step === 'BUNDLE' ? (
          <BundleSelectionStep
            selectedBundle={selectedBundle}
            onSelectBundle={handleSelectBundle}
            onContinue={handleContinueFromBundle}
            onSkip={handleSkipToCustom}
          />
        ) : (
          <div className="flex-1 flex flex-col gap-4 py-4 min-h-0">
            <div className="flex-1 flex flex-col gap-3 min-h-0">
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
                <div className="flex-1 flex flex-col gap-2 overflow-y-auto border rounded-lg p-3 min-h-0 custom-scrollbar">
                  {filteredChannels.length > 0 ? (
                    filteredChannels.map((channel) => {
                      const isSelected = selectedChannels.has(channel.username);
                      const isDisabled = !isSelected && selectedChannels.size >= MAX_FREE_CHANNELS;

                      return (
                        <label
                          key={channel.username}
                          className={`flex items-start space-x-3 p-3 rounded-md border border-transparent transition-all duration-200 ${
                            isDisabled
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-secondary/50 hover:border-border cursor-pointer'
                          }`}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleChannel(channel.username)}
                            disabled={isDisabled}
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
                      );
                    })
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

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToBundle}
                  className="gap-2 hover:bg-muted hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Bundles
                </Button>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-5 w-5 ${
                      selectedChannels.size >= MAX_FREE_CHANNELS
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {selectedChannels.size}/{MAX_FREE_CHANNELS} channels selected
                  </span>
                </div>
              </div>
              <Button
                onClick={handleFinish}
                disabled={selectedChannels.size === 0 || subscribing}
                size="lg"
              >
                {subscribing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  'Finish'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
