import Link from 'next/link';
import { Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="p-1.5 rounded-lg bg-primary">
            <Send size={16} className="text-primary-foreground" />
          </div>
          TeleJob AI
        </Link>
        <div className="flex gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
        <p className="text-sm text-muted-foreground">© 2024 TeleJob AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
