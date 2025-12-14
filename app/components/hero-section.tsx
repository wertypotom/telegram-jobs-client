'use client';

import React from 'react';
import {
  CheckCircle2,
  Zap,
  Lock,
  UserCheck,
  ArrowRight,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLoginModal } from '@/shared/stores/use-login-modal';

export function HeroSection() {
  const { t } = useTranslation('landing');
  const { openModal } = useLoginModal();
  return (
    <section className="relative pt-24 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-cyan-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl relative z-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {t('hero.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                {t('hero.titleHighlight')}
              </span>{' '}
              {t('hero.titleEnd')}
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">{t('hero.description')}</p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-cyan-100 p-1 rounded-full text-cyan-600">
                  <Zap size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('hero.firstMoverTitle')}</h3>
                  <p className="text-sm text-slate-500">{t('hero.firstMoverDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-cyan-100 p-1 rounded-full text-cyan-600">
                  <Lock size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('hero.exclusiveTitle')}</h3>
                  <p className="text-sm text-slate-500">{t('hero.exclusiveDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-cyan-100 p-1 rounded-full text-cyan-600">
                  <UserCheck size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('hero.directContactTitle')}</h3>
                  <p className="text-sm text-slate-500">{t('hero.directContactDesc')}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={openModal}
                className="bg-cyan-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-cyan-600 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/25 text-lg flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {t('hero.startFinding')}
                <ArrowRight size={20} />
              </button>
              <a
                href="#pricing"
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {t('hero.viewPricing')}
              </a>
            </div>
          </div>

          {/* Right: Visual (Chaos vs Order) */}
          <div className="relative mt-12 lg:mt-0">
            {/* The Container for the Visual */}
            <div className="relative w-full aspect-square max-w-[550px] mx-auto">
              {/* Back Layer: Chaos (Telegram Chat) - Scaled down on mobile to reduce noise */}
              <div
                className="absolute top-0 right-0 w-[90%] h-[80%] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-inner transform translate-x-4 -translate-y-4 origin-bottom-right rotate-2 transition-all duration-500 opacity-40 scale-90 md:opacity-60 md:scale-95"
                aria-hidden="true"
              >
                <div className="p-3 bg-slate-200 border-b border-slate-300 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-400"></div>
                  <div className="h-3 w-32 bg-slate-400 rounded"></div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[80%] text-[10px] text-slate-400">
                    <div className="h-2 w-full bg-slate-200 rounded mb-1"></div>
                    <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                  </div>
                  <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[90%] text-[10px] text-slate-400">
                    <div className="h-2 w-full bg-slate-200 rounded mb-1"></div>
                    <div className="h-2 w-full bg-slate-200 rounded mb-1"></div>
                    <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg rounded-tr-none shadow-sm max-w-[70%] ml-auto">
                    <div className="h-2 w-full bg-green-200 rounded"></div>
                  </div>
                  <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%]">
                    <div className="h-2 w-full bg-slate-200 rounded mb-1"></div>
                    <div className="h-2 w-4/5 bg-slate-200 rounded"></div>
                  </div>
                </div>
                {/* Overlay suggesting chaos */}
                <div className="absolute inset-0 bg-slate-500/10 flex items-center justify-center">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                    99+ {t('hero.unread')}
                  </span>
                </div>
              </div>

              {/* Front Layer: Order (TeleJob Card) - Semantic Article */}
              <article
                className="absolute bottom-8 left-0 w-[95%] bg-white rounded-2xl border border-slate-200 shadow-xl md:shadow-2xl p-6 transform transition-transform hover:-translate-y-2 duration-300"
                aria-label="Example Job Posting Card"
              >
                {/* Job Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div
                      className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                      aria-hidden="true"
                    >
                      T
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Senior React Engineer</h4>
                      <p className="text-slate-500 text-sm">TechFlow Systems • Remote (EU)</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                    {t('hero.justNow')}
                  </span>
                </div>

                {/* Parsed Data */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-semibold mb-1">
                      {t('hero.salary')}
                    </p>
                    <p className="text-slate-900 font-bold">$120k - $150k</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-semibold mb-1">
                      {t('hero.stack')}
                    </p>
                    <p className="text-slate-900 font-bold">React, TS, Node</p>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MessageSquare size={16} className="text-cyan-500" />
                    <span>{t('hero.contact')} </span>
                    <span className="font-semibold text-cyan-600 hover:underline cursor-pointer">
                      @alex_cto
                    </span>
                  </div>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
                    {t('hero.applyNow')} <ExternalLink size={14} />
                  </button>
                </div>
              </article>

              {/* Floating Badge */}
              <div className="absolute top-1/2 -right-4 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <CheckCircle2 size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{t('hero.aiParsed')}</p>
                  <p className="text-[10px] text-slate-500">{t('hero.unstructuredText')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
