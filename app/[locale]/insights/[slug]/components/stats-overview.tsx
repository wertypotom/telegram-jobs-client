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
    },
    {
      title: t('stats.recentJobs'),
      value: jobsLast7Days.toLocaleString(),
      icon: Calendar,
    },
    {
      title: t('stats.avgSalary'),
      value: avgSalary || 'N/A',
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="flex items-center gap-4 pt-6">
            <stat.icon className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
