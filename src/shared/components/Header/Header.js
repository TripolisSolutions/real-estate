import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

import {Navbar as BootstrapNavbar } from 'react-bootstrap'

const s = require('./Header.less')

function Header(props) {
  return (
    <BootstrapNavbar className={ s.container }  inverse fixedTop>
      <BootstrapNavbar.Header>
        <BootstrapNavbar.Brand>
          <a href="#">Real estate</a>
        </BootstrapNavbar.Brand>
      </BootstrapNavbar.Header>
    <BootstrapNavbar.Collapse>
      <div className={ classnames('nav navbar-right', s.link)}>
        <li className={ s.selected }>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </div>
    </BootstrapNavbar.Collapse>
  </BootstrapNavbar>
  )
}

Header.propTypes = {
  
}

export default Header

