'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';

interface SalaryBandsChartProps {
  data: Array<{ band: string; count: number }>;
}

export function SalaryBandsChart({ data }: SalaryBandsChartProps) {
  const { t } = useTranslation('insights');

  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('charts.salaryDistribution')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="band" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(var(--chart-2))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
