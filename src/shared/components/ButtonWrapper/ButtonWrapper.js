import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

const s = require('./ButtonWrapper.less')

function Button(props) {
  return (
    <BootstrapButton bsSize='large' className={ s.container } >
      { props.children }
    </BootstrapButton>
  )
}

Button.propTypes = {
  children: React.PropTypes.any.isRequired,
}

export default Button

