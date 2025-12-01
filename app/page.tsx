import { Header } from './components/header';
import { HeroSection } from './components/hero-section';
import { FeaturesSection } from './components/features-section';
import { HowItWorksSection } from './components/how-it-works-section';
import { CtaSection } from './components/cta-section';
import { Footer } from './components/footer';

export default function HomePage() {
  return (
    <div className="bg-red-500 min-h-screen flex flex-col">
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
