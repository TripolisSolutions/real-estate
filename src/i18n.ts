import * as i18n from 'i18next'
import * as log from 'loglevel'
const Chalk = require('chalk');

let loadLocales

if (process.env.BROWSER) {
  const locales = window.__INITIAL_STATE__.i18nData.locales
  loadLocales = function(url, options, callback, data) {
    callback(locales[url], {status: '200'})
  }
} else {
  const vi = require('../locales/vi/common')
  const en = require('../locales/en/common')

  loadLocales = function(url, options, callback, data) {
    switch (url) {
      case 'vi-VN':
      case 'vi':
        callback(vi, {status: '200'})
        break
      case 'en':
        callback(en, {status: '200'})
        break
      default:
        callback(en, {status: '200'})
        break
    }
  }
}

i18n
  .use(
    new (require('i18next-xhr-backend'))(null, {
      loadPath: '{{lng}}',
      parse: (data) => data,
      ajax: loadLocales,
    })
  )

if (!process.env.BROWSER) {
  i18n.use(require('i18next-express-middleware').LanguageDetector)
}

i18n.init({
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    detection: {
      caches: ['cookie'],
    },
  }, (error) => {
    if (error) {
      log.error(Chalk.bgRed('error while load locales: '), error)
    }
  })


export default i18n
