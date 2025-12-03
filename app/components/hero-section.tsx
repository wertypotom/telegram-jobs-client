import Link from 'next/link';
import { Button } from '@/shared/ui';
import { ArrowRight, Send, Bot } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Find Jobs from <span className="text-primary">Telegram</span>.<br />
          Tailor Resumes with <span className="text-accent">AI</span>.
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed text-muted-foreground">
          Browse job postings directly from Telegram channels and generate perfectly tailored
          resumes for each position using advanced AI. Land your dream job faster.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="px-8 py-4 font-bold  text-primary-foreground shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Link href="/login">
              Start Finding Jobs <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Mock Chat Interface */}
        <div className="mt-16 relative max-w-4xl mx-auto">
          <div className="rounded-2xl shadow-2xl overflow-hidden border">
            {/* Browser Chrome */}
            <div className="h-8 bg-secondary flex items-center px-4 gap-2 border-b">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* Chat Content */}
            <div className="bg-card p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full space-y-4">
                {/* Job Alert Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-secondary">
                    <Send size={14} className="text-primary" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none p-3 text-sm max-w-[85%] bg-secondary">
                    <p className="font-semibold mb-1">New Job Alert: Senior React Dev</p>
                    <p className="opacity-80">Remote • $120k - $150k • TypeScript required...</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-accent">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tr-none p-3 text-sm max-w-[85%] bg-background border">
                    <p>I've analyzed this listing. Tailoring your resume now...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
