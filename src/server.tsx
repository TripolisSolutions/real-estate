require('source-map-support').install()

const appConfig = require('../config/main');

import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as log from 'loglevel'
import * as nconf from 'nconf'
const path = require('path');

log.setLevel(0)

// Setup nconf to use (in-order):
// 1. Environment variables
// 2. A file located at '../config/env.json'
const configPath = path.join(path.resolve('.'), 'config/env.json')
nconf.env().file({file: configPath})

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect');
import { configureStore } from './app/redux/store';
import routes from './app/routes';

import i18n from './i18n'

import { Html } from './app/containers';
const manifest = require('../build/manifest.json');

const express = require('express');
const compression = require('compression');
const Chalk = require('chalk');
const favicon = require('serve-favicon');
const proxy = require('http-proxy-middleware')

log.setLevel(nconf.get('SETTINGS_LOG_LEVEL'))

const app = express();

app.use(compression());

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../config/webpack/dev');
  const webpackCompiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    quiet: true,
  }));

  app.use(require('webpack-hot-middleware')(webpackCompiler));
}

app.use(favicon(path.join(__dirname, '../src/favicon.ico')));

app.use('/public', express.static(path.join(__dirname, '../build/public')));

app.use(require('i18next-express-middleware').handle(i18n));

function simplifyLocale(locale: string) {
  const lng = locale.indexOf('-') !== -1 ? locale.split('-')[0] : locale
  return lng
}

app.use('/api', proxy({
  target: nconf.get('SETTINGS_REAL_ESTATE_API'),
  pathRewrite: {
    '^/api' : '',
  },
}))

const vi = require('../locales/vi/common')
const en = require('../locales/en/common')

app.get('*', (req, res) => {
  const location = req.url;
  const memoryHistory = createMemoryHistory(req.originalUrl);

  const langCode = simplifyLocale(req.language)

  req.i18n.changeLanguage(langCode)

  const store = configureStore(memoryHistory, {
    i18nData: {
      currentLangCode: langCode,
      locales: {
        vi: vi,
        en: en,
      },
    },
  })

  const history = syncHistoryWithStore(memoryHistory, store);

  log.info('serving location: ', location)

  match({ history, routes, location },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const asyncRenderData = Object.assign({}, renderProps, { store });

        loadOnServer(asyncRenderData).then(() => {
          const markup = ReactDOMServer.renderToString(
            <I18nextProvider i18n={ req.i18n }>
              <Provider store={store} key='provider'>
                <ReduxAsyncConnect {...renderProps} />
              </Provider>
            </I18nextProvider>
          );
          res.status(200).send(renderHTML(markup));
        }).catch((error) => {
          log.error(Chalk.bgRed('error loadOnServer: '), error)
          res.status(500).send('Internal error')
        })

        function renderHTML(markup) {
          const html = ReactDOMServer.renderToString(
            <Html markup={markup} manifest={manifest} store={store} />
          );

          return `<!doctype html> ${html}`;
        }
      } else {
        res.status(404).send('Not Found?');
      }
    });
});

app.listen(appConfig.port, appConfig.host, err => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(Chalk.black.bgGreen(
      `\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`
    ));
  }
});
