import Link from 'next/link';
import { Button } from '@/shared/ui';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Sparkles className="h-6 w-6 text-primary" />
          <span>JobSniper</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm hover:text-primary transition-colors">
            How It Works
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
