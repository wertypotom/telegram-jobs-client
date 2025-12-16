'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks';
import { notificationApi, NotificationSettings } from '@/shared/api/notification.api';
import { Button } from '@/shared/ui';
import { Bell, BellOff, Check, Moon, TestTube2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export default function NotificationSettingsPage() {
  const { t } = useTranslation('dashboard');
  const router = useRouter();
  const { data: user, isLoading: authLoading } = useAuth();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testSending, setTestSending] = useState(false);

  useEffect(() => {
    if (!authLoading && !user?.id) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await notificationApi.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleNotifications = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      const newEnabled = !settings.enabled;
      await notificationApi.updateSettings({ enabled: newEnabled });
      setSettings({ ...settings, enabled: newEnabled });
    } catch (error) {
      console.error('Failed to toggle notifications:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateQuietHours = async (quietHours: any) => {
    if (!settings) return;

    try {
      setSaving(true);
      await notificationApi.updateSettings({ quietHours });
      setSettings({ ...settings, quietHours });
    } catch (error) {
      console.error('Failed to update quiet hours:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTestNotification = async () => {
    try {
      setTestSending(true);
      await notificationApi.sendTestNotification();
      toast.success(t('notifications.toast.testSent'));
    } catch (error: any) {
      toast.error(error.response?.data?.message || t('notifications.toast.testFailed'));
    } finally {
      setTestSending(false);
    }
  };

  const handleOpenTelegram = async () => {
    try {
      setSaving(true);
      const { deepLink } = await notificationApi.generateSubscriptionLink();

      // Open Telegram app with deep link
      window.open(deepLink, '_blank');

      // Show success message
      toast.success(t('notifications.toast.opening'));
    } catch (error: any) {
      console.error('Failed to generate link:', error);
      toast.error(error.response?.data?.message || t('notifications.toast.linkFailed'));
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">{t('notifications.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('notifications.title')}</h1>
          <p className="text-gray-500 mt-2">{t('notifications.subtitle')}</p>
        </div>

        {/* Telegram Subscription */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                {settings.enabled ? (
                  <Bell className="h-5 w-5 text-cyan-600" />
                ) : (
                  <BellOff className="h-5 w-5 text-gray-400" />
                )}
                {t('notifications.telegramNotifications')}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{t('notifications.telegramDescription')}</p>
            </div>
            <button
              onClick={handleToggleNotifications}
              disabled={saving || !settings.subscribed}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0
                ${settings.enabled ? 'bg-cyan-600' : 'bg-gray-200'}
                ${saving || !settings.subscribed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${settings.enabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {!settings.subscribed ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900 mb-2">
                📱 {t('notifications.enableTelegram')}
              </h3>
              <p className="text-sm text-yellow-800 mb-4">
                {t('notifications.enableTelegramDesc')}
              </p>
              <Button
                onClick={handleOpenTelegram}
                disabled={saving}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>{t('notifications.loading')}</>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                    </svg>
                    {t('notifications.openInTelegram')}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-900 font-medium">
                    {t('notifications.subscribed')}
                  </span>
                </div>
                <Button
                  onClick={handleTestNotification}
                  disabled={testSending}
                  variant="outline"
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <TestTube2 className="h-4 w-4" />
                  {testSending ? t('notifications.sending') : t('notifications.testNotification')}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Notification Info */}
        {settings.subscribed && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('notifications.howItWorks')}
              </h2>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    {t('notifications.howLine1')}{' '}
                    <strong>{t('notifications.howLine1Strong')}</strong>{' '}
                    {t('notifications.howLine1Suffix')}{' '}
                    <Link href="/jobs" className="text-cyan-600 underline hover:text-cyan-700">
                      {t('notifications.jobsPage')}
                    </Link>
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    {t('notifications.howLine2')}{' '}
                    <strong>{t('notifications.howLine2Strong')}</strong>{' '}
                    {t('notifications.howLine2Suffix')}
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    {t('notifications.howLine3')}{' '}
                    <strong>{t('notifications.howLine3Strong')}</strong>{' '}
                    {t('notifications.howLine3Suffix')}
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    {t('notifications.howLine4')}{' '}
                    <strong>{t('notifications.howLine4Strong')}</strong>{' '}
                    {t('notifications.howLine4Suffix')}
                  </span>
                </p>
              </div>
              <div className="mt-4 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-sm text-cyan-900 font-medium">
                  {t('notifications.tip')}{' '}
                  <Link href="/jobs" className="underline hover:text-cyan-700">
                    {t('notifications.jobsPage')}
                  </Link>
                </p>
              </div>
            </div>

            {/* Quiet Hours */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Moon className="h-5 w-5" />
                    {t('notifications.quietHours')}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{t('notifications.quietHoursDesc')}</p>
                </div>
                <button
                  onClick={() =>
                    handleUpdateQuietHours({
                      ...settings.quietHours,
                      enabled: !settings.quietHours.enabled,
                    })
                  }
                  disabled={saving}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0
                    ${settings.quietHours.enabled ? 'bg-cyan-600' : 'bg-gray-200'}
                    ${saving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${settings.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              {settings.quietHours.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('notifications.dontNotifyBetween')}
                    </label>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={settings.quietHours.startHour}
                        onChange={(e) =>
                          handleUpdateQuietHours({
                            ...settings.quietHours,
                            startHour: parseInt(e.target.value),
                          })
                        }
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-gray-500">{t('notifications.to')}</span>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={settings.quietHours.endHour}
                        onChange={(e) =>
                          handleUpdateQuietHours({
                            ...settings.quietHours,
                            endHour: parseInt(e.target.value),
                          })
                        }
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-gray-500 text-sm whitespace-nowrap">
                        ({settings.quietHours.startHour}:00 - {settings.quietHours.endHour}:00)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
