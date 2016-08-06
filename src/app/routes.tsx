import * as React from 'react'
import { Route, IndexRoute } from 'react-router'

import { Counter, Stars } from './containers'
import App from './containers/View/App'
import Home from './containers/View/Home'
import About from './containers/View/About'
import Contact from './containers/View/Contact'
import PropertyDetail from './containers/View/PropertyDetail'
import NotFound from './containers/NotFound'

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

    <Route path='*' component={ NotFound }/>
  </Route>
)
