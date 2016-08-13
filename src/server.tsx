require('source-map-support').install()

const appConfig = require('../config/main');

import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';
import * as fs from 'fs'

import * as log from 'loglevel'
import * as nconf from 'nconf'
const path = require('path');

log.setLevel(0)

// Setup nconf to use (in-order):
// 1. Environment variables
// 2. A file located at '../config/env.json'
const configPath = path.join(path.resolve('.'), 'config/env.json')
nconf.env().file({file: configPath})

const pickBy = require('lodash/fp/pickBy')
const startsWith = require('lodash/fp/startsWith')

console.log('environment settings are: ',
  pickBy((value, key) => startsWith('SETTINGS_')(key) && key.indexOf('SECRET') === -1 )(nconf.get()))

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect');
import { configureStore } from './app/redux/store';
import routes from './app/routes';

import { createToken, decodeToken } from './server/token_helper'

import i18n from './i18n'

import { Html } from './app/containers/Html';
let manifest
try {
  manifest = require('../build/manifest.json');
} catch (e) {
  log.warn('fail load manifest.json: ', e.message)
}

const express = require('express');
const bodyParser = require('body-parser')
const compression = require('compression');
const Chalk = require('chalk');
const favicon = require('serve-favicon');
const proxy = require('http-proxy-middleware')
const multer = require('multer')
const mv = require('mv')
import * as urljoin from 'url-join'

log.setLevel(nconf.get('SETTINGS_LOG_LEVEL'))

const app = express();

app.use(compression());

if (process.env.NODE_ENV !== 'production') {
  // const webpack = require('webpack');
  // const webpackConfig = require('../config/webpack/dev');
  // const webpackCompiler = webpack(webpackConfig);

  // app.use(require('webpack-dev-middleware')(webpackCompiler, {
  //   publicPath: webpackConfig.output.publicPath,
  //   stats: { colors: true },
  //   noInfo: true,
  //   hot: true,
  //   inline: true,
  //   lazy: false,
  //   historyApiFallback: true,
  //   quiet: true,
  // }));

  // app.use(require('webpack-hot-middleware')(webpackCompiler));
}

app.use(favicon(path.join(__dirname, '../src/favicon.ico')));

app.use('/public', express.static(path.join(__dirname, '../build/public')));
app.use('/public/images', express.static(path.join(__dirname, nconf.get('SETTINGS_UPLOADED_IMAGE_FOLDER'))));
app.use('/node_modules/alloyeditor', express.static(path.join(__dirname, '../node_modules/alloyeditor')));

app.use(require('i18next-express-middleware').handle(i18n));

function simplifyLocale(locale: string) {
  const lng = locale.indexOf('-') !== -1 ? locale.split('-')[0] : locale
  return lng
}

app.use('/api', (req, res, next) => {
  if (req.method === 'GET') {
    next()
    return
  }

  const token = req.headers['x-access-token']
  if (!token) {
    res.status(401).send({ message: 'No token provided.' })
    return
  }

  log.debug('token', token)
  const payload = decodeToken(token)
  log.debug('payload', payload)
  if (!payload.sub || payload.sub !== nconf.get('SETTINGS_LOGIN_USERNAME')) {
    res.status(401).send({ message: 'Not authorized.' })
    return
  }

  next()
})

const thumbnailUpload = multer({
  dest: '/tmp/',
})
app.post('/api/thumbnails/upload', thumbnailUpload.single('file'), (req, res) => {
  log.debug('req.file', req.file)
  log.debug('image width ', req.body.width, ' height ', req.body.height, ' params: ', req.params.width)
  const destPath = path.join(__dirname, nconf.get('SETTINGS_UPLOADED_IMAGE_FOLDER'), req.file.originalname)
  log.debug('moving file ', req.file.path, ' to ', destPath)

  mv(req.file.path, destPath, (err) => {
    if (err) {
      log.error(`error while move file from ${ req.file.path } to ${ destPath }: `, err)
      res.status(500).send(err.message)
      return
    }

  // moveFile(req.file.path, destPath).then(() => {

    const imagesUrl = urljoin(nconf.get('SETTINGS_REAL_ESTATE_API'), 'images')
    log.debug('saving the image to api: ', imagesUrl)
    fetch(imagesUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: req.file.originalname,
        width: parseInt(req.body.width, 10),
        height: parseInt(req.body.height, 10),
      }),
    }).then(resp => {
      log.debug('resp ok: ', resp.ok)
      if (resp.ok) {
        return resp.json()
          .then(resp => {
            log.debug('resp json: ', resp)
            res.status(200).send(resp)
          })
      } else {
        log.error(`error while store image on api: `, resp)
        res.status(500).send(resp)
      }
    }).catch((err) => {
      log.error(`error while store image on api: `, err)
      res.status(500).send(err.message)
    })
  })
})

app.use('/api', proxy({
  target: nconf.get('SETTINGS_REAL_ESTATE_API'),
  pathRewrite: {
    '^/api' : '',
  },
}))

app.use(bodyParser.json())

app.post('/auth/sign_in', (req, res) => {
  const body = req.body
  log.debug('login body: ', body)
  if (body.username === nconf.get('SETTINGS_LOGIN_USERNAME')
    && body.password === nconf.get('SETTINGS_LOGIN_PASSWORD')) {
      const token = createToken(body)
      res.setHeader('x-access-token', token)
      res.send({
        username: body.email,
        token: token,
      })
  }
})

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
