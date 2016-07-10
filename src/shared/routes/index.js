import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/app'
import Home from './home'
import About from './about'
import Contact from './contact'
import PropertyDetail from './admin/PropertyDetail/PropertyDetail'

import 'font-awesome/css/font-awesome.css'
import 'react-select/dist/react-select.css'
import '../styles/index.less'

const routes = (
  <Route path='/' component={ App } >
    <IndexRoute component={ Home } />
    <Route path='about' component={ About } />
    <Route path='contact' component={ Contact } />
    <Route path='admin/properties/:id' component={ PropertyDetail } />
  </Route>
);

export default routes
