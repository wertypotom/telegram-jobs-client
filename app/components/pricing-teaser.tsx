'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCreateCheckout } from '@/shared/hooks';

export function PricingTeaser() {
  const { t } = useTranslation('landing');
  const { t: tDashboard } = useTranslation('dashboard');
  const { mutate: createCheckout, isPending } = useCreateCheckout();

  const handleUpgradeClick = () => {
    const variantId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ID;
    if (variantId) {
      createCheckout(variantId);
    } else {
      console.error('NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ID not set');
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
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Jobs Button */}
        <Link
          href="/jobs"
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
          {tDashboard('jobDetail.backToJobs')}
        </Link>

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
            {/* Current Badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {t('pricing.plans.free.current')}
              </span>
            </div>

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
            <div className="space-y-3">
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
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white relative shadow-xl shadow-cyan-500/25 transform hover:scale-105 transition-transform">
            {/* Decorative blob */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

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

            {/* CTA Button */}
            <button
              onClick={handleUpgradeClick}
              disabled={isPending}
              className="w-full bg-white text-cyan-600 font-bold py-3 rounded-lg hover:bg-slate-50 transition-all transform hover:-translate-y-1 shadow-lg relative z-10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                t('pricing.plans.pro.cta')
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
