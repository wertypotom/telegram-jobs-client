import React from 'react';

export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
            <div className="w-24 h-6 bg-slate-200 rounded animate-pulse"></div>
          </div>
          {/* Buttons */}
          <div className="hidden md:flex gap-4">
            <div className="w-8 h-8 rounded bg-slate-200 animate-pulse"></div>
            <div className="w-32 h-10 rounded-lg bg-slate-200 animate-pulse"></div>
          </div>
        </div>
      </div>

      <main>
        <section className="relative pt-24 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-cyan-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
              {/* Left: Copy Skeleton */}
              <div className="max-w-2xl">
                <div className="h-12 w-3/4 bg-slate-200 rounded mb-4 animate-pulse"></div>
                <div className="h-12 w-full bg-slate-200 rounded mb-6 animate-pulse"></div>

                <div className="h-4 w-full bg-slate-100 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-5/6 bg-slate-100 rounded mb-8 animate-pulse"></div>

                <div className="space-y-4 mb-10">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="w-32 h-4 bg-slate-200 rounded animate-pulse"></div>
                        <div className="w-48 h-3 bg-slate-100 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <div className="w-40 h-14 bg-slate-200 rounded-lg animate-pulse"></div>
                  <div className="w-40 h-14 bg-slate-100 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* Right: Visual Skeleton */}
              <div className="hidden lg:block relative mt-12 lg:mt-0">
                <div className="w-full aspect-square max-w-[550px] mx-auto bg-slate-100 rounded-3xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
