'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';
import { useLoginModal } from '@/shared/stores/use-login-modal';

export function CtaSection() {
  const { openModal } = useLoginModal();
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden bg-primary">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10 text-primary-foreground">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10 opacity-90 text-primary-foreground">
          Join thousands of job seekers using AI to get hired faster. No credit card required to
          start.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <Button
            onClick={openModal}
            size="lg"
            className="bg-card text-primary hover:bg-card/90 shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Now
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-all"
          >
            <Link href="#pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
