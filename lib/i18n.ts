import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEn from '@/public/locales/en/common.json';
import landingEn from '@/public/locales/en/landing.json';
import dashboardEn from '@/public/locales/en/dashboard.json';
import authEn from '@/public/locales/en/auth.json';

import commonRu from '@/public/locales/ru/common.json';
import landingRu from '@/public/locales/ru/landing.json';
import dashboardRu from '@/public/locales/ru/dashboard.json';
import authRu from '@/public/locales/ru/auth.json';

const resources = {
  en: {
    common: commonEn,
    landing: landingEn,
    dashboard: dashboardEn,
    auth: authEn,
  },
  ru: {
    common: commonRu,
    landing: landingRu,
    dashboard: dashboardRu,
    auth: authRu,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'landing', 'dashboard', 'auth'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
