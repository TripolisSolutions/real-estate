import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, match, Router } from 'react-router'
import routes from './shared/routes'
import log from 'loglevel'
import mobx from 'mobx'

import { ContextProvider } from './shared/context'

import { NewStore } from './shared/store'
import { fetchDataOnLocationMatch } from './shared/store/helpers'

log.setLevel(__CONFIG__.logLevel)

const store = NewStore(__STORE__)
fetchDataOnLocationMatch(browserHistory, routes, match, store)

// for dev
window.store = store
window.mobx = mobx

// Render the application
ReactDOM.render(
  (
    <ContextProvider context={{ store }}>
      <Router history={browserHistory}>
        { routes }
      </Router>
    </ContextProvider>
  ),
  document.getElementById('root')
)
