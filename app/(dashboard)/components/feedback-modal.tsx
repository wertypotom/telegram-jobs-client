'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { feedbackApi, type FeedbackData } from '@/shared/api/feedback.api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  RadioGroup,
  RadioGroupItem,
  Label,
  Textarea,
} from '@/shared/ui';
import { Loader2, Bug, Lightbulb, Palette, CreditCard, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  { id: 'BUG', label: 'Bug Report', icon: Bug },
  { id: 'FEATURE', label: 'Feature Request', icon: Lightbulb },
  { id: 'UX', label: 'User Experience Feedback', icon: Palette },
  { id: 'SUBSCRIPTION', label: 'Subscription and Membership', icon: CreditCard },
  { id: 'OTHER', label: 'Others', icon: MessageSquare },
] as const;

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  /* State */
  const [category, setCategory] = useState<FeedbackData['category']>('OTHER');
  const [message, setMessage] = useState('');

  /* Mutation */
  const { mutate, isPending } = useMutation({
    mutationFn: feedbackApi.createFeedback,
    onSuccess: () => {
      toast.success('Thank you for your feedback! 🚀');
      onOpenChange(false);
      // Reset form
      setCategory('OTHER');
      setMessage('');
    },
    onError: () => {
      toast.error('Failed to submit feedback. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    mutate({
      category,
      message,
      contactConsent: false, // Default to false as we removed the checkbox
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Feedback & Support</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">* What would you like to tell us?</Label>
            <RadioGroup
              value={category}
              onValueChange={(val) => setCategory(val as FeedbackData['category'])}
              className="gap-3"
            >
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={cat.id} id={cat.id} />
                  <Label
                    htmlFor={cat.id}
                    className="flex items-center gap-2 cursor-pointer font-normal"
                  >
                    {cat.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">* Can you give us more details?</Label>
            <Textarea
              placeholder="Please describe your experience or share your ideas. The more specific you are, the better we can address your feedback."
              className="min-h-[120px] resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 min-w-24"
              disabled={isPending || !message.trim()}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
