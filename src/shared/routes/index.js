import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/app'
import Home from './home'
import About from './about'
import PropertyDetail from './admin/PropertyDetail/PropertyDetail'

require('font-awesome/css/font-awesome.css')

const routes = (
  <Route path='/' component={ App } >
    <IndexRoute component={ Home } />
    <Route path='about' component={ About } />
    <Route path='admin/properties/:id' component={ PropertyDetail } />
  </Route>
);

export default routes
