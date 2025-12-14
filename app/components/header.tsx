'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Send, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './language-switcher';
import { useLoginModal } from '@/shared/stores/use-login-modal';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <span className="text-xl font-bold tracking-tight text-slate-900">TeleJob AI</span>
          </Link>

          {/* Desktop Nav - Absolute Center */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <a
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
            >
              {t('header.hiddenMarket')}
            </a>
            <a
              href="#why-telegram"
              className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
            >
              {t('header.whyTelegram')}
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
            >
              {t('header.pricing')}
            </a>
          </nav>

          {/* Buttons - Right */}
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={openModal}
              className="hidden md:block bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              {t('header.joinNow')}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-slate-100 p-4 flex flex-col gap-2">
          <a
            href="#"
            className="text-base font-medium text-slate-600 block py-4 px-2 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.hiddenMarket')}
          </a>
          <a
            href="#why-telegram"
            className="text-base font-medium text-slate-600 block py-4 px-2 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.whyTelegram')}
          </a>
          <a
            href="#pricing"
            className="text-base font-medium text-slate-600 block py-4 px-2 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.pricing')}
          </a>
          <hr className="border-slate-100 my-2" />
          <div className="flex items-center justify-end px-2">
            <button
              onClick={() => {
                openModal();
                setIsMobileMenuOpen(false);
              }}
              className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold text-center"
            >
              {t('header.joinNow')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
