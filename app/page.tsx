'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks';
import { Header } from './components/header';
import { HeroSection } from './components/hero-section';
import { StatsBar } from './components/stats-bar';
import { WhyTelegram } from './components/why-telegram';
import { AggregatorAdvantage } from './components/aggregator-advantage';
// import { FeaturesSection } from './components/features-section';
import { PricingTeaser } from './components/pricing-teaser';
import { Footer } from './components/footer';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { data: user, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/jobs');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <WhyTelegram />
        <AggregatorAdvantage />
        {/* <FeaturesSection /> */}
        <PricingTeaser />
      </main>
      <Footer />
    </div>
  );
}
