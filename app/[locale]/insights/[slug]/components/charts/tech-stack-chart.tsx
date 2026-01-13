'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
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
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    [
                      '#0ea5e9',
                      '#0284c7',
                      '#0369a1',
                      '#075985',
                      '#10b981',
                      '#059669',
                      '#047857',
                      '#065f46',
                      '#8b5cf6',
                      '#7c3aed',
                    ][index % 10]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
