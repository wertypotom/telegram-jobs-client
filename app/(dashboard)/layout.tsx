'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, useLogout } from '@/shared/hooks';
import Link from 'next/link';
import { Sparkles, Briefcase, LogOut } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useAuth();
  const logout = useLogout();
  const { t } = useTranslation('dashboard');

  useEffect(() => {
    if (!isLoading && !data?.id) {
      router.push('/login');
    }
  }, [data, isLoading, router]);

  // Don't render dashboard if no user data
  if (!data?.id) {
    return null;
  }

  // Helper to determine if link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - white background like reference */}
      <aside className="hidden md:flex md:w-20 lg:w-64 border-r bg-white md:flex-col sticky top-0 h-screen justify-between z-20 transition-all">
        <div>
          <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center lg:mr-3 flex-shrink-0">
              <Sparkles className="text-white" size={18} />
            </div>
            <span className="font-bold text-xl hidden lg:block">{t('sidebar.appName')}</span>
          </div>

          <nav className="p-4 space-y-2">
            <Link
              href="/jobs"
              className={`w-full flex items-center p-3 rounded-xl transition-colors group relative ${
                isActive('/jobs') ? 'bg-cyan-50' : 'hover:bg-gray-50'
              }`}
            >
              <Briefcase
                className={`h-5 w-5 flex-shrink-0 ${
                  isActive('/jobs') ? 'text-cyan-600' : 'text-gray-500 group-hover:text-gray-900'
                }`}
              />
              <span
                className={`ml-3 font-medium hidden lg:block ${
                  isActive('/jobs') ? 'text-cyan-900' : 'text-gray-600 group-hover:text-gray-900'
                }`}
              >
                {t('sidebar.browseJobs')}
              </span>
              {isActive('/jobs') && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-500 lg:hidden"></div>
              )}
            </Link>

            {/* Temporarily commented out */}
            {/* <Link
              href="/resume"
              className={`w-full flex items-center p-3 rounded-xl transition-colors group relative ${
                isActive('/resume')
                  ? 'bg-cyan-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <FileText className={`h-5 w-5 flex-shrink-0 ${
                isActive('/resume') ? 'text-cyan-600' : 'text-gray-500 group-hover:text-gray-900'
              }`} />
              <span className={`ml-3 font-medium hidden lg:block ${
                isActive('/resume') ? 'text-cyan-900' : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                My Resume
              </span>
              {isActive('/resume') && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-500 lg:hidden"></div>
              )}
            </Link> */}

            {/* <Link
              href="/profile"
              className={`w-full flex items-center p-3 rounded-xl transition-colors group relative ${
                isActive('/profile') ? 'bg-cyan-50' : 'hover:bg-gray-50'
              }`}
            >
              <User
                className={`h-5 w-5 flex-shrink-0 ${
                  isActive('/profile') ? 'text-cyan-600' : 'text-gray-500 group-hover:text-gray-900'
                }`}
              />
              <span
                className={`ml-3 font-medium hidden lg:block ${
                  isActive('/profile') ? 'text-cyan-900' : 'text-gray-600 group-hover:text-gray-900'
                }`}
              >
                Profile
              </span>
              {isActive('/profile') && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-500 lg:hidden"></div>
              )}
            </Link> */}
          </nav>
        </div>

        <div className="p-4 space-y-2 border-t">
          <Button
            variant="ghost"
            className="w-full justify-center lg:justify-start p-3 rounded-xl hover:bg-gray-50 text-gray-600"
            onClick={() => logout.mutate()}
          >
            <LogOut className="h-5 w-5 lg:mr-3 flex-shrink-0" />
            <span className="ml-3 font-medium hidden lg:block text-gray-600 group-hover:text-gray-900">
              {t('sidebar.logout')}
            </span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
    </div>
  );
}
