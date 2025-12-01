'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks';
import Link from 'next/link';
import { Sparkles, Briefcase, FileText, User, LogOut } from 'lucide-react';
import { Button } from '@/shared/ui';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isPending } = useAuth();

  useEffect(() => {
    if (!isPending && !data?.id) {
      router.push('/login');
    }
  }, [data, isPending, router]);

  // Don't render dashboard if no user data
  if (!data?.id) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/50 p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-8">
          <Sparkles className="h-6 w-6 text-primary" />
          <span>JobSniper</span>
        </Link>

        <nav className="space-y-2">
          <Link
            href="/jobs"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
          >
            <Briefcase className="h-5 w-5" />
            <span>Browse Jobs</span>
          </Link>
          <Link
            href="/resume"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span>My Resume</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </nav>

        <div className="mt-auto pt-8">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              localStorage.removeItem('auth_token');
              router.push('/login');
            }}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
