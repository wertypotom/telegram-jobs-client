'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks';
import { Header } from './components/header';
import { HeroSection } from './components/hero-section';
import { FeaturesSection } from './components/features-section';
import { HowItWorksSection } from './components/how-it-works-section';
import { CtaSection } from './components/cta-section';
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
