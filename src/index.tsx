import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import classNames from 'classnames';
import { Formik } from 'formik';
import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Button from './components/Button';

classNames();
Formik({
  initialValues: {},
  onSubmit: () => {}
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(resourcesToBackend((
    language: string,
    namespace: string,
    callback: (error: Error | null, resources: Record<string, string> | null) => void
  ) => {
    import(`./locales/${language}/${namespace}.json`)
      .then((resources) => {
        callback(null, resources)
      })
      .catch((error) => {
        callback(error, null)
      })
  }))
  .init({
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react: {
      useSuspense: true
    }
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <Button />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
