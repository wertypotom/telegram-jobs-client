import React from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-cyan-500 p-1.5 rounded-lg text-white">
                <Send size={20} fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-slate-900">TeleJob AI</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
              Unlock the hidden job market. We help you find exclusive tech roles on Telegram before
              they hit the major boards.
            </p>
          </div>

          <div className="md:text-right">
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-cyan-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© 2024 TeleJob AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-slate-500">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
