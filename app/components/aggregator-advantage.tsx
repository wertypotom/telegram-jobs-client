'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AggregatorAdvantage() {
  const { t } = useTranslation('landing');
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-cyan-900 text-cyan-300 font-semibold px-4 py-1.5 rounded-full text-sm mb-6">
              {t('aggregatorAdvantage.badge')}
            </div>
            <h2 className="text-4xl font-bold mb-6">{t('aggregatorAdvantage.title')}</h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              {t('aggregatorAdvantage.description')}
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-slate-200">{t('aggregatorAdvantage.benefit1')}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-slate-200">{t('aggregatorAdvantage.benefit2')}</span>
              </li>
            </ul>
          </div>

          <div className="relative h-[400px] flex items-center justify-center">
            {/* Central Hub Visual */}
            <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
              {/* Center Node */}
              <div className="w-32 h-32 bg-cyan-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)] z-20 relative">
                <Layers size={40} className="text-white mb-1" />
                <span className="font-bold text-white text-sm">
                  {t('aggregatorAdvantage.appName')}
                </span>
              </div>

              {/* Orbiting Nodes (Simulated with absolute positioning) */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                const radius = 140; // distance from center
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <React.Fragment key={i}>
                    {/* Connection Line */}
                    <div
                      className="absolute left-1/2 top-1/2 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent origin-left w-[140px]"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        zIndex: 10,
                      }}
                    />
                    {/* Node */}
                    <div
                      className="absolute w-12 h-12 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center z-20 shadow-lg"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <span className="text-xs text-slate-400">Ch.{i + 1}</span>
                    </div>
                  </React.Fragment>
                );
              })}

              {/* Data Flow Particles (Pure CSS Animation simulation) */}
              <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                {/* This would be complex to animate perfectly in pure React without a library, 
                     but the static structure conveys the meaning effectively. */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
