'use client';

import React from 'react';
import { Globe, Sparkles, Filter, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FeaturesSection() {
  const { t } = useTranslation('landing');
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('features.title')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl">{t('features.description')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start hover:border-cyan-200 transition-colors">
            <div className="bg-cyan-100 p-3 rounded-lg text-cyan-600 mb-6">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {t('features.hiddenMarket.title')}
            </h3>
            <p className="text-slate-600 mb-4 flex-grow">
              {t('features.hiddenMarket.description')}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start hover:border-cyan-200 transition-colors">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600 mb-6">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {t('features.chaosToClarity.title')}
            </h3>
            <p className="text-slate-600 mb-4 flex-grow">
              {t('features.chaosToClarity.description')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start hover:border-cyan-200 transition-colors">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mb-6">
              <Filter size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {t('features.smartFiltering.title')}
            </h3>
            <p className="text-slate-600 mb-4 flex-grow">
              {t('features.smartFiltering.description')}
            </p>
          </div>

          {/* Feature 4 - Coming Soon */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              {t('features.tailorApply.comingSoon')}
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-green-600 mb-6">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
              {t('features.tailorApply.title')}
            </h3>
            <p className="text-slate-600 mb-4 flex-grow">{t('features.tailorApply.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
