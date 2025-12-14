'use client';

import React from 'react';
import { Coffee, Lock, Clock, Sliders } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLoginModal } from '@/shared/stores/use-login-modal';
import { usePlatformStats } from '@/shared/hooks/use-platform-stats';

export function PricingTeaser() {
  const { t } = useTranslation('landing');
  const { openModal } = useLoginModal();
  const { data: stats } = usePlatformStats();
  const activeChannels = stats?.activeChannels || 120;

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
          {/* Decorative blurred blob */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('pricing.title')}</h2>
                <p className="text-slate-600 font-medium">{t('pricing.subtitle')}</p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {t('pricing.freeDescription')}
              </p>

              <p className="text-slate-900 font-medium text-sm border-l-4 border-cyan-500 pl-4 py-1">
                {t('pricing.proCallout')}
              </p>

              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-cyan-600">
                    <Lock size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm">
                      {t('pricing.unlockMarket.title')}
                    </span>
                    <p className="text-xs text-slate-600">
                      {t('pricing.unlockMarket.description', { count: activeChannels })}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-cyan-600">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm">
                      {t('pricing.saveTime.title')}
                    </span>
                    <p className="text-xs text-slate-600">{t('pricing.saveTime.description')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-cyan-600">
                    <Sliders size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm">
                      {t('pricing.zeroNoise.title')}
                    </span>
                    <p className="text-xs text-slate-600">{t('pricing.zeroNoise.description')}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-8 md:pt-0 md:pl-12">
              <div className="flex items-center gap-2 text-slate-500 mb-3 bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold">
                <Coffee size={14} />
                <span>{t('pricing.lessThanCoffees')}</span>
              </div>
              <div className="flex items-start justify-center text-slate-900 mb-2">
                <span className="text-2xl md:text-3xl font-bold mt-2 mr-1">$</span>
                <span className="text-4xl md:text-6xl font-extrabold tracking-tight">990</span>
                <span className="self-end text-lg md:text-xl text-slate-500 font-medium mb-2 ml-1">
                  /{t('pricing.pricePerMonth') || 'mo'}
                </span>
              </div>

              <p className="text-slate-500 text-sm mb-8 text-center max-w-[200px]">
                {t('pricing.cancelAnytime')}
              </p>

              <button
                onClick={openModal}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-1 mb-4 text-center"
              >
                {t('pricing.joinNow')}
              </button>
              <p className="text-xs text-slate-400 text-center">{t('pricing.securePayment')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
