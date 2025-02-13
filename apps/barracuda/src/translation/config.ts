import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bgTranslation from './translation-tables/bg.json';
import enTranslation from './translation-tables/en.json';

const resources = {
  bg: {
    translation: bgTranslation
  },
  en: {
    translation: enTranslation
  }
};

/**
 * Configuration for the translations.
 */
i18n.use(initReactI18next).init({
  resources,
  lng: sessionStorage.getItem('language') ?? 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    useSuspense: true
  }
});

export default i18n;
