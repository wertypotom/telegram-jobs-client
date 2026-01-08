'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuth } from '@/shared/hooks';
import { useCreateCheckout, useCancelSubscription, useSubscription } from '../hooks/use-checkout';
import { useResumeSubscription } from '@/app/(dashboard)/account/hooks/use-account-data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

export function PricingCard() {
  const router = useRouter();
  const { t } = useTranslation('landing');
  const { data: user } = useAuth();
  const { data: subscription } = useSubscription();
  const { mutate: createCheckout, isPending: isCheckoutPending } = useCreateCheckout();
  const { mutate: cancelSubscription, isPending: isCancelPending } = useCancelSubscription();
  const resumeMutation = useResumeSubscription();
  const [isDowngradeDialogOpen, setIsDowngradeDialogOpen] = useState(false);

  const isPremium = user?.plan === 'premium';
  const isCancelled = subscription?.status === 'cancelled';
  const periodEnd = subscription?.currentPeriodEnd ? new Date(subscription.currentPeriodEnd) : null;

  // DEBUG: Remove after testing
  console.log('Subscription data:', subscription);
  console.log('isCancelled:', isCancelled);

  const handleUpgradeClick = () => {
    const variantId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ID;
    if (!variantId) {
      toast.error('Payment system is not configured. Please contact support.');
      return;
    }
    createCheckout(variantId);
  };

  const handleDowngradeClick = () => {
    setIsDowngradeDialogOpen(true);
  };

  const handleConfirmDowngrade = () => {
    cancelSubscription();
    setIsDowngradeDialogOpen(false);
  };

  const handleResumeSubscription = async () => {
    try {
      await resumeMutation.mutateAsync();
      toast.success(t('pricing.resume.success'));
    } catch {
      toast.error(t('pricing.resume.error'));
    }
  };

  const features = [
    {
      key: 'channels',
      label: t('pricing.features.channelAccess'),
      free: t('pricing.plans.free.features.channels'),
      pro: t('pricing.plans.pro.features.channels'),
    },
    {
      key: 'swaps',
      label: t('pricing.features.channelSwaps'),
      free: t('pricing.plans.free.features.swaps'),
      pro: t('pricing.plans.pro.features.swaps'),
    },
    {
      key: 'alerts',
      label: t('pricing.features.jobAlerts'),
      free: t('pricing.plans.free.features.alerts'),
      pro: t('pricing.plans.pro.features.alerts'),
    },
    {
      key: 'filters',
      label: t('pricing.features.filteringPower'),
      free: t('pricing.plans.free.features.filters'),
      pro: t('pricing.plans.pro.features.filters'),
    },
    {
      key: 'notifications',
      label: t('pricing.features.notifications'),
      free: t('pricing.plans.free.features.notifications'),
      pro: t('pricing.plans.pro.features.notifications'),
    },
  ];

  return (
    <>
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {t('pricing.header.title')}
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              {t('pricing.header.subtitle')}
            </p>
          </div>

          {/* Pricing Comparison */}
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 relative">
              {/* Current Badge - show for Free users */}
              {!isPremium && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                    {t('pricing.plans.free.current')}
                  </span>
                </div>
              )}

              {/* Plan Name & Price */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1.5">
                  {t('pricing.plans.free.name')}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {t('pricing.plans.free.price')}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {features.map((feature) => (
                  <div key={feature.key} className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-cyan-500">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">{feature.label}</p>
                      <p className="text-xs text-slate-500">{feature.free}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white relative shadow-xl shadow-cyan-500/25">
              {/* Decorative blob */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              {/* Current Badge - show for Premium users */}
              {isPremium && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white">
                    {t('pricing.plans.pro.current')}
                  </span>
                </div>
              )}

              {/* Plan Name & Price */}
              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold mb-1.5">{t('pricing.plans.pro.name')}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">{t('pricing.plans.pro.price')}</span>
                  <span className="text-lg text-white/80">{t('pricing.plans.pro.perMonth')}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6 relative z-10">
                {features.map((feature) => (
                  <div key={feature.key} className="flex items-start gap-2.5">
                    <div className="mt-0.5">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{feature.label}</p>
                      <p className="text-xs text-white/80">{feature.pro}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button / Cancelled Status / Downgrade */}
              {!isPremium ? (
                <button
                  onClick={handleUpgradeClick}
                  disabled={isCheckoutPending}
                  className="w-full bg-white text-cyan-600 font-bold py-3 rounded-lg hover:bg-slate-50 transition-all transform hover:-translate-y-1 shadow-lg relative z-10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCheckoutPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    t('pricing.plans.pro.cta')
                  )}
                </button>
              ) : isCancelled ? (
                <div className="space-y-3 relative z-10">
                  <div className="w-full bg-white/20 border border-white/30 text-white font-medium py-3 px-4 rounded-lg text-center">
                    <p className="text-sm">{t('pricing.downgrade.cancelled')}</p>
                    {periodEnd && (
                      <p className="text-xs mt-1 text-white/80">
                        {t('pricing.downgrade.until')} {periodEnd.toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Resume Subscription Button */}
                  <button
                    onClick={handleResumeSubscription}
                    disabled={resumeMutation.isPending}
                    className="w-full bg-white text-cyan-600 font-bold py-3 rounded-lg hover:bg-slate-50 transition-all transform hover:-translate-y-1 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {resumeMutation.isPending ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        {t('pricing.resume.resuming')}
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-5 w-5" />
                        {t('pricing.resume.button')}
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleDowngradeClick}
                  disabled={isCancelPending}
                  className="w-full bg-white/10 border border-white/30 text-white font-semibold py-3 rounded-lg hover:bg-white/20 transition-all transform hover:-translate-y-1 relative z-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCancelPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t('pricing.downgrade.button')}
                    </>
                  ) : (
                    t('pricing.downgrade.button')
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Downgrade Confirmation Dialog */}
      <Dialog open={isDowngradeDialogOpen} onOpenChange={setIsDowngradeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('pricing.downgrade.title')}</DialogTitle>
            <DialogDescription>{t('pricing.downgrade.description')}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <button
              onClick={() => setIsDowngradeDialogOpen(false)}
              className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
            >
              {t('pricing.downgrade.cancel')}
            </button>
            <button
              onClick={handleConfirmDowngrade}
              disabled={isCancelPending}
              className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCancelPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {t('pricing.downgrade.confirm')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
