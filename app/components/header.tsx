'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './language-switcher';
import { useLoginModal } from '@/shared/store/use-login-modal';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation('common');
  const { openModal } = useLoginModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-cyan-500 p-1.5 rounded-lg text-white">
              <Send size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">JobSniper</span>
          </Link>

          {/* Buttons - Right */}
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={openModal}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <Send size={18} />
              <span className="hidden md:inline">{t('header.joinNow')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
