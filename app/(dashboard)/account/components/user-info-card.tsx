'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import type { User } from '@/shared/types/models';
import { useTranslation } from 'react-i18next';
import { User as UserIcon, Mail, Award } from 'lucide-react';

interface UserInfoCardProps {
  user: User;
  swapsRemaining?: number;
}

export function UserInfoCard({ user, swapsRemaining }: UserInfoCardProps) {
  const { t } = useTranslation('dashboard');

  const isPremium = user.plan === 'premium';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-cyan-600" />
          {t('account.userInfo.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name */}
        {user.name && (
          <div className="flex items-start gap-3">
            <UserIcon className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">{t('account.userInfo.name')}</p>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
            </div>
          </div>
        )}

        {/* Email */}
        {user.email && (
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">{t('account.userInfo.email')}</p>
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
        )}

        {/* Plan Badge */}
        <div className="flex items-start gap-3">
          <Award className="h-5 w-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-gray-500">{t('account.userInfo.plan')}</p>
            <Badge
              variant={isPremium ? 'default' : 'secondary'}
              className={`cursor-default ${
                isPremium
                  ? 'bg-cyan-600 hover:bg-cyan-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isPremium ? t('account.userInfo.premium') : t('account.userInfo.free')}
            </Badge>
          </div>
        </div>

        {/* Swaps Remaining */}
        {swapsRemaining !== undefined && (
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t('account.userInfo.swapsRemaining')}</span>
              <span className="text-lg font-bold text-cyan-600 select-none">
                {swapsRemaining === -1 ? '∞' : swapsRemaining}
              </span>
            </div>
            {swapsRemaining !== -1 && (
              <p className="text-xs text-gray-500 mt-1">{t('account.userInfo.swapsDescription')}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
