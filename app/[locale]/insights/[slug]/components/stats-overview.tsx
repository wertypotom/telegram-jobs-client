'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/shared/ui/card';
import { TrendingUp, Calendar, DollarSign } from 'lucide-react';

interface StatsOverviewProps {
  totalJobs: number;
  jobsLast7Days: number;
  avgSalary: string | null;
}

export function StatsOverview({ totalJobs, jobsLast7Days, avgSalary }: StatsOverviewProps) {
  const { t } = useTranslation('insights');

  const stats = [
    {
      title: t('stats.totalJobs'),
      value: totalJobs.toLocaleString(),
      icon: TrendingUp,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: t('stats.recentJobs'),
      value: jobsLast7Days.toLocaleString(),
      icon: Calendar,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      title: t('stats.avgSalary'),
      value: avgSalary || 'N/A',
      icon: DollarSign,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary"
        >
          <CardContent className="flex items-center gap-4 pt-6">
            <div className={`p-4 rounded-full ${stat.bg} bg-opacity-50`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
