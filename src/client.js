import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, match, Router, RouterContext } from 'react-router'

import log from 'loglevel'
import mobx, { extendObservable } from 'mobx'

import routes from './shared/routes'
import defaultState from './shared/state'
import actions from './shared/actions'
import Context from './shared/components/Common/Context'
// import { NewStore } from './shared/store'
import { fetchDataOnLocationMatch } from './shared/store/helpers'

log.setLevel(window.CONFIG.logLevel)

window.STATE = extendObservable(defaultState, window.STATE)

// Initialize stores & inject server-side state into front-end
const context = {
    state: window.STATE,
    store: actions(window.STATE)
}

fetchDataOnLocationMatch(browserHistory, routes, match, context.state, context.store)

function createElement(props) {
    return (
      <Context context={context}>
        <RouterContext {...props} />
      </Context>
    )
}

// Render HTML on the browser
ReactDOM.render(<Router history={browserHistory}
                render={createElement}
                routes={routes(context)}/>,
document.getElementById('root'))

if (module.hot) module.hot.accept()

// const store = NewStore(__STATE__)

// for dev
window.context = context
window.mobx = mobx

// Render the application
// ReactDOM.render(
//   (
//     <Context context={{ store }}>
//       <Router history={browserHistory}>
//         { routes }
//       </Router>
//     </Context>
//   ),
//   document.getElementById('root')
// )
