import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, match, Router } from 'react-router'
import routes from './shared/routes'
import log from 'loglevel'

import { ContextProvider } from './shared/context'

import { NewStore } from './shared/store'
import { fetchDataOnLocationMatch } from './shared/store/helpers'

log.setLevel(0)

const store = NewStore(__STORE__)
fetchDataOnLocationMatch(browserHistory, routes, match, store)

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
