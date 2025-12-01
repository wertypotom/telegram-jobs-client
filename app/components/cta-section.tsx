import Link from 'next/link';
import { Button } from '@/shared/ui';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="container mx-auto px-4 py-24 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-lg md:text-xl opacity-90">
          Join thousands of job seekers using AI to get hired faster.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/login">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
