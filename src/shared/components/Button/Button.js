import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

const s = require('./Button.less')

function Button(props) {
  return (
    <BootstrapButton bsSize='large' className={ s.container } >
      { props.text }
    </BootstrapButton>
  )
}

Button.propTypes = {
  text: React.PropTypes.string.isRequired,
}

export default Button

