import * as React from 'react'
import { I18nextProvider } from 'react-i18next';
import * as i18n from 'i18next'
import * as log from 'loglevel'

const Chalk = require('chalk');

const vi = require('../../../locales/vi/common')
const en = require('../../../locales/en/common')

const loadLocales = function(url, options, callback, data) {
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

i18n
  .use(
    new (require('i18next-xhr-backend'))(null, {
      loadPath: '{{lng}}',
      parse: (data) => data,
      ajax: loadLocales,
    })
  )
  .init({
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  }, (error) => {
    if (error) {
      log.error(Chalk.bgRed('error while load locales: '), error)
    }
  })

interface IProps extends React.Props<any> {

}

export const StorybookProvider = (props: IProps) => {
  return (
    <I18nextProvider i18n={ i18n }>
      { props.children }
    </I18nextProvider>
  )
}
