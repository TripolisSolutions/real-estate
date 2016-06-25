import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, match, Router } from 'react-router'
import routes from './shared/routes'

import { ContextProvider } from './shared/context'

import { Store, fetchDataOnLocationMatch } from './shared/store'

console.log('__STORE__', __STORE__)
const store = Store.fromJSON(__STORE__)
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
