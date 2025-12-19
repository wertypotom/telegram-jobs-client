'use client';

import React from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export function Footer() {
  const { t } = useTranslation('landing');
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-cyan-500 p-1.5 rounded-lg text-white">
                <Send size={20} fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-slate-900">{t('footer.appName')}</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
              {t('footer.description')}
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-3 opacity-60">
              <Image
                src="/images/visa.png"
                alt="Visa"
                width={40}
                height={24}
                className="grayscale opacity-70"
              />
              <Image
                src="/images/mastercard.png"
                alt="Mastercard"
                width={40}
                height={24}
                className="grayscale opacity-70"
              />
              <Image
                src="/images/unionpay.png"
                alt="UnionPay"
                width={40}
                height={24}
                className="grayscale opacity-70"
              />
              <a href="https://epay.homebank.kz" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/halyk-bank.png"
                  alt="Halyk Bank"
                  width={40}
                  height={24}
                  className="grayscale opacity-70 object-contain"
                />
              </a>
            </div>
          </div>

          <div className="md:text-right">
            <h4 className="font-bold text-slate-900 mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal/public-offer"
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {t('footer.publicOffer')}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
