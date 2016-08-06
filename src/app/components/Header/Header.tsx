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
          <div className={ s.logo } >
            <IndexLink
                to={ '/' }              
              >D2 real estate</IndexLink>
          </div>
        </BootstrapNavbar.Brand>
      </BootstrapNavbar.Header>
    <BootstrapNavbar.Collapse>
      <div className={ classnames('nav navbar-right', s.link)}>
        <ul>
          <li>
            <ul>
              {
                props.items.map((item) => (
                  <li key={ item.url } className={ s.menu } >
                    <IndexLink
                      to={ item.url }
                      activeClassName={ s.selected }
                    >{ item.label }</IndexLink>
                  </li>
                ))
              }
            </ul>
          </li>
          <li>
            <IndexLink
              to={ 'changelink' }              
            >Tiếng việt</IndexLink>
          </li>
          <li>
            <p>Tiền tệ: VND</p>
          </li>
        </ul>        
      </div>
    </BootstrapNavbar.Collapse>
  </BootstrapNavbar>
  )
}

export default Header
