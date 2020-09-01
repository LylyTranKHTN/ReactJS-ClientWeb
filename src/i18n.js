import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTitle from './assets/locales/en/title.json';
import vnTitle from './assets/locales/vn/title.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "v",
        whitelist: ['e', 'v'],
        nonExplicitWhitelist: true,
        fallbackLng: 'v',
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        ns: [ 'title' ],
        defaultNS: 'title',
        resources: {
            e: { title: enTitle },
            v: { title: vnTitle }
        },
        react: {
            wait: true
        }
    });

export default i18n;
