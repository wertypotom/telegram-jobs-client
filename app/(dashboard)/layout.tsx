'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks';
import Link from 'next/link';
import { Sparkles, Briefcase, FileText, User, LogOut } from 'lucide-react';
import { Button } from '@/shared/ui';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !data?.id) {
      router.push('/login');
    }
  }, [data, isLoading, router]);

  // Don't render dashboard if no user data
  if (!data?.id) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - white background like reference */}
      <aside className="hidden md:flex md:w-20 lg:w-64 border-r bg-white md:flex-col sticky top-0 h-screen justify-between z-20 transition-all">
        <div>
          <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center lg:mr-3 flex-shrink-0">
              <Sparkles className="text-white" size={18} />
            </div>
            <span className="font-bold text-xl hidden lg:block">JobSniper</span>
          </div>

          <nav className="p-4 space-y-2">
            <Link
              href="/jobs"
              className="w-full flex items-center p-3 rounded-xl transition-colors group relative bg-cyan-50"
            >
              <Briefcase className="h-5 w-5 flex-shrink-0 text-cyan-600" />
              <span className="ml-3 font-medium hidden lg:block text-cyan-900">Browse Jobs</span>
              <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-500 lg:hidden"></div>
            </Link>
            <Link
              href="/resume"
              className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <FileText className="h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-gray-900" />
              <span className="ml-3 font-medium hidden lg:block text-gray-600 group-hover:text-gray-900">
                My Resume
              </span>
            </Link>
            <Link
              href="/profile"
              className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <User className="h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-gray-900" />
              <span className="ml-3 font-medium hidden lg:block text-gray-600 group-hover:text-gray-900">
                Profile
              </span>
            </Link>
          </nav>
        </div>

        <div className="p-4 space-y-2 border-t">
          <Button
            variant="ghost"
            className="w-full justify-center lg:justify-start p-3 rounded-xl hover:bg-gray-50 text-gray-600"
            onClick={() => {
              localStorage.removeItem('auth_token');
              router.push('/login');
            }}
          >
            <LogOut className="h-5 w-5 lg:mr-3 flex-shrink-0" />
            <span className="hidden lg:inline">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
    </div>
  );
}
