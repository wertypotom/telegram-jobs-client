'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui';
import { Send, Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-md bg-background/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="p-1.5 rounded-lg bg-primary">
              <Send size={20} className="text-primary-foreground" />
            </div>
            TeleJob AI
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:opacity-80 transition-opacity">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:opacity-80 transition-opacity"
            >
              How It Works
            </a>
            <Button asChild className="rounded-full shadow-lg shadow-primary/20">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full border-b shadow-lg bg-card">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Features
            </a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              How It Works
            </a>
            <Button asChild className="w-full">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
