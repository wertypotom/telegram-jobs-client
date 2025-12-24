'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/ui/button';
import type { Bundle } from '@/shared/api/bundles.api';
import * as Icons from 'lucide-react';

interface BundleCardProps {
  bundle: Bundle;
  selected: boolean;
  onSelect: () => void;
}

export function BundleCard({ bundle, selected, onSelect }: BundleCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Get icon component dynamically
  const IconComponent = (Icons as any)[bundle.icon] || Icons.Code;

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    setIsFlipped(false);
  };

  return (
    <div className="perspective-1000 h-64" onClick={handleCardClick}>
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden',
            'p-6 rounded-xl border-2 transition-all cursor-pointer',
            'flex flex-col items-center justify-center text-center gap-4',
            'bg-gradient-to-br from-background to-muted/30',
            !isFlipped && selected
              ? 'border-primary shadow-lg ring-2 ring-primary/20'
              : 'border-border hover:border-primary/50 hover:shadow-lg'
          )}
        >
          {/* Selected Badge */}
          {selected && !isFlipped && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Check className="h-4 w-4 text-primary-foreground" />
            </div>
          )}

          {/* Icon */}
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center transition-colors',
              selected && !isFlipped ? 'bg-primary/10' : 'bg-muted'
            )}
          >
            <IconComponent
              className={cn(
                'h-8 w-8',
                selected && !isFlipped ? 'text-primary' : 'text-muted-foreground'
              )}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg">{bundle.title}</h3>
            <p className="text-sm text-muted-foreground">{bundle.description}</p>
            <p className="text-xs text-primary font-medium">Click to see channels →</p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden rotate-y-180',
            'p-5 rounded-xl border-2 border-border',
            'bg-gradient-to-br from-background to-muted/20',
            'flex flex-col gap-3'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 overflow-y-auto space-y-2 text-sm custom-scrollbar pr-1">
            {bundle.channels.map((channel, idx) => (
              <div
                key={channel}
                className="flex items-center gap-2 p-2.5 bg-card rounded-md border border-border/50 hover:border-primary/30 transition-colors"
              >
                <span className="font-mono text-xs text-muted-foreground min-w-[20px]">
                  {idx + 1}.
                </span>
                <span className="font-medium text-foreground">{channel}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setIsFlipped(false)}
            >
              ← Back
            </Button>
            <Button size="sm" className="flex-1" onClick={handleSelectClick}>
              Select Bundle
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
