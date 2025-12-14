import { useTranslation } from 'react-i18next';
import { Search, Radio, Users } from 'lucide-react';
import { usePlatformStats } from '@/shared/hooks/use-platform-stats';

export function StatsBar() {
  const { t } = useTranslation('landing');
  const { data: stats, isLoading } = usePlatformStats();

  // Default values if data is not available yet or error
  const defaultStats = {
    activeChannels: 0,
    jobsToday: 0,
    totalJobs: 0,
  };

  const currentStats = stats || defaultStats;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K+`;
    }
    return num.toString();
  };

  return (
    <div className="border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-2xl mb-1">
              <Search size={24} />
              <span>{isLoading ? '...' : formatNumber(currentStats.jobsToday)}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">{t('stats.newJobs')}</p>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-2xl mb-1">
              <Radio size={24} />
              <span>{isLoading ? '...' : currentStats.activeChannels}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">{t('stats.activeChannels')}</p>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-2xl mb-1">
              <Users size={24} />
              <span>{isLoading ? '...' : formatNumber(currentStats.totalJobs)}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">{t('stats.totalJobs')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
