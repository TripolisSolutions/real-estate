import * as React from 'react'
import { Route, IndexRoute } from 'react-router'
import { browserHistory } from 'react-router'

import { Counter, Stars } from './containers'
import App from './containers/View/App'
import Home from './containers/View/Home'
import About from './containers/View/About'
import Contact from './containers/View/Contact'
import PropertyDetail from './containers/View/PropertyDetail'

import Login from './containers/Login/Login'

import Admin from './containers/Admin/Admin'
import AdminPropertiesList from './containers/Admin/PropertiesList/PropertiesList'
import AdminPropertiesNew from './containers/Admin/PropertiesNew/PropertiesNew'
import AdminPropertiesEdit from './containers/Admin/PropertiesEdit/PropertiesEdit'

import NotFound from './containers/NotFound'

import { loggedIn } from './helpers/auth'

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (

    <Route>
      <Route path='/' component={ App }>
        <IndexRoute component={ Home }/>
        <Route path='about' component={ About }/>
        <Route path='contact' component={ Contact }/>
        <Route path='properties/:id' component={ PropertyDetail }/>
        <Route path='counter' component={ Counter } />
        <Route path='stars' component={ Stars } />
      </Route>

      <Route path='/login' component={ Login } />

      <Route path='/admin' component={ Admin } onEnter={ requireAuth }>
        <IndexRoute component={ AdminPropertiesList }/>
        <Route path='properties/new' component={ AdminPropertiesNew } />
        <Route path='properties/:id' component={ AdminPropertiesEdit } />
        <Route path='properties/:id/:title' component={ AdminPropertiesEdit } />
      </Route>

      <Route path='*' component={ NotFound }/>
    </Route>
)
