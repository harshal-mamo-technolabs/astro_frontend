// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from "./../public/locales/en.json";
import euTranslation from './../public/locales/de.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  de: {
    translation: euTranslation,
  },
  ro: {
    translation: enTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
