'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';

interface TechStackChartProps {
  data: Array<{ name: string; count: number }>;
}

export function TechStackChart({ data }: TechStackChartProps) {
  const { t } = useTranslation('insights');

  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('charts.topSkills')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
