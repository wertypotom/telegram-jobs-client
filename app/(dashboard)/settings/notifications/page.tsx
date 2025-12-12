'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/hooks';
import { notificationApi, NotificationSettings } from '@/shared/api/notification.api';
import { Button } from '@/shared/ui';
import { Bell, BellOff, Check, Moon, TestTube2 } from 'lucide-react';
import Link from 'next/link';

export default function NotificationSettingsPage() {
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
      alert('✅ Test notification sent! Check your Telegram.');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to send test notification');
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
      alert('✅ Opening Telegram... Click "START" in the bot to complete subscription!');
    } catch (error: any) {
      console.error('Failed to generate link:', error);
      alert(error.response?.data?.message || 'Failed to generate Telegram link. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
          <p className="text-gray-500 mt-2">Configure Telegram notifications for job matches</p>
        </div>

        {/* Telegram Subscription */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                {settings.enabled ? (
                  <Bell className="h-5 w-5 text-cyan-600" />
                ) : (
                  <BellOff className="h-5 w-5 text-gray-400" />
                )}
                Telegram Notifications
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Receive instant alerts when jobs match your filters
              </p>
            </div>
            <button
              onClick={handleToggleNotifications}
              disabled={saving || !settings.subscribed}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
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
              <h3 className="font-medium text-yellow-900 mb-2">📱 Enable Telegram Notifications</h3>
              <p className="text-sm text-yellow-800 mb-4">
                Get instant job alerts in Telegram with one click!
              </p>
              <Button
                onClick={handleOpenTelegram}
                disabled={saving}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>Loading...</>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                    </svg>
                    Open in Telegram
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-green-900 font-medium">Subscribed to @jobsniper_v2_bot</span>
              </div>
              <Button
                onClick={handleTestNotification}
                disabled={testSending}
                variant="outline"
                className="flex items-center gap-2"
              >
                <TestTube2 className="h-4 w-4" />
                {testSending ? 'Sending...' : 'Test Notification'}
              </Button>
            </div>
          )}
        </div>

        {/* Notification Info */}
        {settings.subscribed && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How Notifications Work</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    Notifications use the <strong>same filters</strong> you set on the{' '}
                    <Link href="/jobs" className="text-cyan-600 underline hover:text-cyan-700">
                      Jobs page
                    </Link>
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    When a new job matches your filters, you'll get <strong>instant</strong>{' '}
                    Telegram notification
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    Maximum <strong>10 notifications per hour</strong> to prevent spam
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    Use <strong>Quiet Hours</strong> below to pause notifications at specific times
                  </span>
                </p>
              </div>
              <div className="mt-4 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-sm text-cyan-900 font-medium">
                  💡 To change what jobs you get notified about, edit your filters on the{' '}
                  <Link href="/jobs" className="underline hover:text-cyan-700">
                    Jobs page
                  </Link>
                </p>
              </div>
            </div>

            {/* Quiet Hours */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Moon className="h-5 w-5" />
                    Quiet Hours
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Pause notifications during specific hours
                  </p>
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
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
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
                      Don't notify between:
                    </label>
                    <div className="flex items-center gap-4">
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
                      <span className="text-gray-500">to</span>
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
                      <span className="text-gray-500 text-sm">
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
