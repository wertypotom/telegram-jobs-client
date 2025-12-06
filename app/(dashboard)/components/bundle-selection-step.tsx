'use client';

import { BundleCard } from './bundle-card';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { useBundles } from '@/shared/hooks';

interface BundleSelectionStepProps {
  selectedBundle: string | null;
  onSelectBundle: (bundleId: string) => void;
  onContinue: () => void;
  onSkip: () => void;
}

export function BundleSelectionStep({
  selectedBundle,
  onSelectBundle,
  onContinue,
  onSkip,
}: BundleSelectionStepProps) {
  const { data: bundles, isLoading } = useBundles();

  if (isLoading) {
    return (
      <div className="space-y-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!bundles || bundles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No bundles available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {/* Bundle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bundles.map((bundle) => (
          <BundleCard
            key={bundle.id}
            bundle={bundle}
            selected={selectedBundle === bundle.id}
            onSelect={() => onSelectBundle(bundle.id)}
          />
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t">
        <Button
          variant="ghost"
          onClick={onSkip}
          className="w-full sm:w-auto text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Skip to Custom Selection
        </Button>
        <Button
          onClick={onContinue}
          disabled={!selectedBundle}
          size="lg"
          className="w-full sm:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
