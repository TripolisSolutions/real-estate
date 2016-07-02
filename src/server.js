import 'source-map-support/register'

// native packages
import path from 'path'

// external packages
import helmet from 'helmet'
import compress from 'compression'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'

// feathersjs
import feathers, { static as serveStatic } from 'feathers'
import configuration from 'feathers-configuration'
import hooks from 'feathers-hooks'
import rest from 'feathers-rest'
import socketio from 'feathers-socketio'
import errors from 'feathers-errors'
import log from 'logstar'

// internal packages
import middleware from './middleware'
import services from './services'

// react external packages (universal rendering)
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import Helmet from 'react-helmet'

// react internal packages
import routes from './shared/routes'
import { ContextProvider } from './shared/context'
import { Store, fetchData } from './shared/store'

// const release = (process.env.NODE_ENV === 'production')
// const port = (parseInt(process.env.PORT, 10) || 9000) - !release;

// const app = express();
const app = feathers()

const configPath = path.join(path.resolve('.'))
app.configure(configuration(configPath))

// // Route handler that rules them all!
const isomorphic = (req, res, next) => {
  // Do a router match
  match({
    routes,
    location: req.url,
  }, (err, redirect, props) => {
    // Some sanity checks
    if (err) {
      return res.status(500).send(err.message)
    } else if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search)
    } else if (!props) {
      // return res.status(404).send('not found');
      return next(new errors.NotFound('Page not found'))
    }

    const store = new Store({
      ssrLocation: req.url,
    })

    return fetchData(store, props.components, props.params, props.location.query)
      .then(() => {
        const renderedRoot = ReactDOMServer.renderToString((
          <ContextProvider context={{ store }}>
            <RouterContext { ...props } />
          </ContextProvider>
        ))

        const storeAsJSON = store.toJSON()
        const config = {
          env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
        }

        const head = Helmet.rewind()

        res.status(200).render('index', {
          head, renderedRoot, store: storeAsJSON, config,
        })
      })
      .catch((routingError) => {
        log.error('error while handling routing', { error: routingError })
        res.status(500).send('Internal error')
      })
  })
}

app.use(compress())
  .use(favicon(path.join(app.get('public'), 'favicon.ico')))
  .use('/public', serveStatic(app.get('public')))
  .use('/vendor.js', serveStatic('./build/vendor.js'))
  .use('/client.js', serveStatic('./build/client.js'))
  .use('/styles.css', serveStatic('./build/styles.css'))
  .set('views', './src/server/views')
  .set('view engine', 'ejs')
  .use(helmet())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware)
  .get('*', isomorphic)

const port = app.get('port')
const server = app.listen(port)
server.on('listening', () =>
  log.info(`[🚀 ] Server started on port ${ app.get('host') }:${ port }`)
)
