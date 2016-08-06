import * as React from 'react'
import { IndexLink } from 'react-router'
import * as classnames from 'classnames'

import {Navbar as BootstrapNavbar } from 'react-bootstrap'

const s = require('./Header.less')

function Header(props) {
  return (
    <BootstrapNavbar className={ s.container } inverse fixedTop>
      <BootstrapNavbar.Header>
        <BootstrapNavbar.Brand>
          <span className= { s.logo }>Real estate</span>
        </BootstrapNavbar.Brand>
      </BootstrapNavbar.Header>
    <BootstrapNavbar.Collapse>
      <div className={ classnames('nav navbar-right', s.link)}>
        {
          props.items.map((item) => (
            <li key={ item.url }>
              <IndexLink
                to={ item.url }
                activeClassName={ s.selected }
              >{ item.label }</IndexLink>
            </li>
          ))
        }
      </div>
    </BootstrapNavbar.Collapse>
  </BootstrapNavbar>
  )
}

export default Header
