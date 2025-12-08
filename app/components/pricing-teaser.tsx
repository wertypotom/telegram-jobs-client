import React from 'react';
import Link from 'next/link';
import { Coffee, Lock, Clock, Sliders } from 'lucide-react';

export function PricingTeaser() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
          {/* Decorative blurred blob */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Start Free. Go Faster.</h2>
                <p className="text-slate-500 font-medium">
                  Start for free. Supercharge when you're ready.
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                You don't need to pay to find a job. Thousands of developers use our Free plan to
                browse curated bundles and land roles.
              </p>

              <p className="text-slate-900 font-medium text-sm border-l-4 border-cyan-500 pl-4 py-1">
                Serious about finding a job this month? For less than the price of a weekly coffee,
                the Pro Plan is your accelerator:
              </p>

              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-cyan-600">
                    <Lock size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm">Unlock the Full Market</span>
                    <p className="text-xs text-slate-600">Monitor 120+ channels instead of 5.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-cyan-600">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm">Save ~20 Hours</span>
                    <p className="text-xs text-slate-600">
                      Stop manual scrolling. Let the feed do the work.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-cyan-600">
                    <Sliders size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm">Zero Noise</span>
                    <p className="text-xs text-slate-600">
                      Advanced filters mean you only see exactly what you want.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-8 md:pt-0 md:pl-12">
              <div className="flex items-center gap-2 text-slate-400 mb-3 bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold">
                <Coffee size={14} />
                <span>Less than 3 coffees</span>
              </div>
              <div className="text-5xl font-extrabold text-slate-900 mb-2">
                990<span className="text-xl text-slate-500 font-medium">₽/mo</span>
              </div>
              <p className="text-slate-500 text-sm mb-8 text-center max-w-[200px]">
                Cancel anytime. No hidden fees.
              </p>

              <Link
                href="/login"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-1 mb-4 text-center"
              >
                Join Now
              </Link>
              <p className="text-xs text-slate-400 text-center">
                Secure payment via Stripe/YooKassa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
