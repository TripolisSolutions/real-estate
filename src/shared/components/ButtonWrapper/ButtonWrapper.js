import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

const s = require('./ButtonWrapper.less')

function Button(props) {
  return (
    <BootstrapButton bsSize='large' className={ s.container } type={ props.type }>
      { props.children }
    </BootstrapButton>
  )
}

Button.propTypes = {
  children: React.PropTypes.any.isRequired,
  type: React.PropTypes.string
}

Button.defaultProps = {
  type: 'submit'
}

export default Button

