'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { feedbackApi, type FeedbackData } from '../api/feedback.api';
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
import { useTranslation } from 'react-i18next';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const { t } = useTranslation('dashboard');

  const CATEGORIES = [
    { id: 'BUG', label: t('feedback.categories.bug'), icon: Bug },
    { id: 'FEATURE', label: t('feedback.categories.feature'), icon: Lightbulb },
    { id: 'UX', label: t('feedback.categories.ux'), icon: Palette },
    { id: 'SUBSCRIPTION', label: t('feedback.categories.subscription'), icon: CreditCard },
    { id: 'OTHER', label: t('feedback.categories.other'), icon: MessageSquare },
  ] as const;

  /* State */
  const [category, setCategory] = useState<FeedbackData['category']>('OTHER');
  const [message, setMessage] = useState('');

  /* Mutation */
  const { mutate, isPending } = useMutation({
    mutationFn: feedbackApi.createFeedback,
    onSuccess: () => {
      toast.success(t('feedback.toast.success'));
      onOpenChange(false);
      // Reset form
      setCategory('OTHER');
      setMessage('');
    },
    onError: () => {
      toast.error(t('feedback.toast.error'));
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
          <DialogTitle>{t('feedback.title')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">{t('feedback.labels.topic')}</Label>
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
            <Label className="text-base font-medium">{t('feedback.labels.details')}</Label>
            <Textarea
              placeholder={t('feedback.placeholder')}
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
              {t('feedback.cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 min-w-24"
              disabled={isPending || !message.trim()}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : t('feedback.submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
