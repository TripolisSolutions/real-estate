import 'source-map-support/register'

// native packages
import path from 'path'

// external packages
import helmet from 'helmet'
import compress from 'compression'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import nconf from 'nconf'

import _ from 'lodash'
import cloneDeep from 'lodash/fp/cloneDeep'

// feathersjs
import feathers, { static as serveStatic } from 'feathers'
import hooks from 'feathers-hooks'
import rest from 'feathers-rest'
import socketio from 'feathers-socketio'
import errors from 'feathers-errors'
import log from 'loglevel'

// internal packages
import middleware from './middleware'
import services from './services'

// react external packages (universal rendering)
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import Helmet from 'react-helmet'
import { toJS } from 'mobx'

// react internal packages
import routes from './shared/routes'
import Context from './shared/components/Common/Context'
import { fetchData } from './shared/store/helpers'
import defaultState from './shared/state'
import actions from './shared/actions'

log.setLevel(0)

const app = feathers()

// Setup nconf to use (in-order):
// 1. Environment variables
// 2. A file located at '../config/default.json'
const configPath = path.join(path.resolve('.'), 'config/default.json')
nconf.env().file({file: configPath})

// do not log secrects
log.info('environment settings are: ', _.pickBy(nconf.get(), (value, key) => _.startsWith(key, 'SETTINGS_') && key.indexOf('SECRET') === -1 ))

log.setLevel(nconf.get('SETTINGS_LOG_LEVEL'))

// Route handler that rules them all!
const isomorphic = (req, res) => {
  const state = cloneDeep(defaultState)

  state.app.hostname = req.headers.host
  state.app.ssrLocation = req.url

  const context = {
      state: state,
      store: actions(state)
  }

  // Create routing
  const matchRoutes = {
      routes: routes(context),
      location: req.url,
  }

  // Do a router match
  match(matchRoutes, (err, redirect, props) => {
    // Some sanity checks
    if (err) {
      return res.status(500).send(err.message)
    } else if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search)
    } else if (!props) {
      return res.status(404).send('not found')
    }

    fetchData(props, context.state, context.store)
      .then(() => {
        let renderedRoot
        if (process.env.NODE_ENV !== 'production') {
          renderedRoot = ''
        } else {
          renderedRoot = ReactDOMServer.renderToString((
            <Context context={context}>
              <RouterContext { ...props } />
            </Context>
          ))
        }

        // const state = toJS(store)
        const config = {
          env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
          logLevel: nconf.get('SETTINGS_LOG_LEVEL'),
        }

        const head = Helmet.rewind()

        res.status(200).render('index', {
          head, renderedRoot, state: context.state, config,
        })
      })
      .catch((error) => {
        log.error('error while handling routing', error)
        res.status(500).send('Internal error')
      })
  })
}

app.use(compress())
  .use(favicon(path.join(nconf.get('SETTINGS_PUBLIC'), 'favicon.ico')))
  .use('/public', serveStatic(nconf.get('SETTINGS_PUBLIC')))
  .use('/assets', serveStatic('./build'))
  .set('views', './src/server/views')
  .set('view engine', 'ejs')
  .use(helmet())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .get('*', isomorphic)
  // .configure(middleware)

const port = nconf.get('SETTINGS_PORT')
const server = app.listen(port)
server.on('listening', () =>
  log.info(`[🚀 ] Server started on port ${ port }`)
)
