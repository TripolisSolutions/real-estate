require('source-map-support').install()

const appConfig = require('../config/main');

import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';
import * as fs from 'fs'

import * as log from 'loglevel'
import * as nconf from 'nconf'
const path = require('path');
import * as url from 'url'

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

import * as _ from 'lodash'
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
const proxy = require('express-http-proxy')
const multer = require('multer')
const mv = require('mv')
const uuid = require('node-uuid')
const Jimp = require('jimp')
import * as urljoin from 'url-join'

log.setLevel(nconf.get('SETTINGS_LOG_LEVEL'))

// email
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport(nconf.get('SETTINGS_EMAIL_TRANSPORT'))

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

function thumbnailResize(src, dest) {
  return new Promise((resolve, reject) => {
    Jimp.read(src, function (err, lenna) {
      if (err) { reject(err) }
      lenna.cover(360, 242)
        .write(dest, resolve);
    })
  })
}

const thumbnailUpload = multer({
  dest: '/tmp/',
})
app.post('/api/thumbnails/upload', thumbnailUpload.single('file'), async (req, res) => {
  log.debug('req.file', req.file)
  log.debug('image width ', req.body.width, ' height ', req.body.height, ' params: ', req.params.width)
  const filename = uuid.v1() + '_' + req.file.originalname
  const thumbnailFilename = 'thumbnail_' + filename

  const destPath = path.join(__dirname, nconf.get('SETTINGS_UPLOADED_IMAGE_FOLDER'), thumbnailFilename)
  log.debug('moving file ', req.file.path, ' to ', destPath)

  try {
    await thumbnailResize(req.file.path, destPath)

    const imagesUrl = urljoin(nconf.get('SETTINGS_REAL_ESTATE_API'), 'images')
    log.debug('saving the image to api: ', imagesUrl)

    const resp = await fetch(imagesUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: thumbnailFilename,
        width: parseInt(req.body.width, 10),
        height: parseInt(req.body.height, 10),
      }),
    })

    if (!resp.ok) {
      log.error(`error while store image on api: `, resp)
      res.status(500).send(resp)
      return
    }

    const apiImage = await resp.json()

    res.status(200).send(apiImage)
  } catch (error) {
    log.error(`error while store image on api: `, error)
    res.status(500).send(error.message)
  }
})

function galleryImageResize(src, dest) {
  return new Promise((resolve, reject) => {
    Jimp.read(src, function (err, lenna) {
      if (err) { reject(err) }
      lenna.cover(900, 500)
        .write(dest, resolve);
    })
  })
}

function moveFile(src, dest) {
  return new Promise((resolve, reject) => {
    mv(src, dest, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

app.post('/api/gallery/upload', thumbnailUpload.array('files[]'), async (req, res) => {
  log.debug('req.files', req.files)

  try {
    const fileInfos = req.files.map((file) => {
      const filename = uuid.v1() + '_' + file.originalname
      const destPath = path.join(__dirname, nconf.get('SETTINGS_UPLOADED_IMAGE_FOLDER'), filename)
      return {
        originalPath: file.path,
        filename,
        destPath,
      }
    })

    const resizeWorkers = fileInfos.map((fileInfo) => {
      return moveFile(fileInfo.originalPath, fileInfo.destPath)
    })

    await Promise.all(resizeWorkers)

    const imagesUrl = urljoin(nconf.get('SETTINGS_REAL_ESTATE_API'), 'images')
    log.debug('saving the image to api: ', imagesUrl)

    const apiWorkers = fileInfos.map((fileInfo) => {
      return fetch(imagesUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: fileInfo.filename,
        }),
      })
    })

    const resps: any[] = await Promise.all(apiWorkers)

    const unsuccess = _.filter(resps, (resp) => !resp.ok)

    if (unsuccess.length > 0) {
      log.error(`error while store image on api: `, unsuccess)
      res.status(500).send(unsuccess)
      return
    }

    const jsonWorkers = resps.map((resp) => {
      return resp.json()
    })

    const apiImages = await Promise.all(jsonWorkers)

    res.status(200).send(apiImages)
  } catch (error) {
    log.error(`error while store image on api: `, error)
    res.status(500).send(error.message)
  }
})

app.use('/api', proxy(nconf.get('SETTINGS_REAL_ESTATE_API')))

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
  } else {
    res.status(401).send('invalid username & password')
  }
})

app.post('/contacts', (req, res) => {
  const body = req.body
  log.info('contact body: ', body)

  const subject = nconf.get('SETTINGS_EMAIL_CONTACT_SUBJECT')
    .replace(/\{\{email\}\}/g, body.email)
    .replace(/\{\{name\}\}/g, body.name)
    .replace(/\{\{gender\}\}/g, body.gender)
    .replace(/\{\{message\}\}/g, body.message)
    .replace(/\{\{link\}\}/g, body.link)
  const content = nconf.get('SETTINGS_EMAIL_CONTACT_CONTENT')
    .replace(/\{\{email\}\}/g, body.email)
    .replace(/\{\{name\}\}/g, body.name)
    .replace(/\{\{gender\}\}/g, body.gender)
    .replace(/\{\{message\}\}/g, body.message)
    .replace(/\{\{link\}\}/g, body.link)

  const mailOptions = {
    from: nconf.get('SETTINGS_EMAIL_SENDER'), // sender address
    to: nconf.get('SETTINGS_EMAIL_RECIEVER'), // list of receivers
    subject: subject, // Subject line
    html: content, // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      log.error('error while send email: ', error)
      res.status(500).send('error while send email')
      return
    }
    res.status(200).send('success')
  })
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
      currentCurrency: 'VND',
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

app.listen(appConfig.port, err => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(Chalk.black.bgGreen(
      `\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`
    ));
  }
});
