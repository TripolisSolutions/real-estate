import * as React from 'react'
import * as classnames from 'classnames'
import { Button as BootstrapButton } from 'react-bootstrap'

const s = require('./ButtonWrapper.less')

function ButtonWrapper(props) {
  function onClick() {
    props.onClick()
  }
  return (
    <BootstrapButton
    bsSize='large'
    className={ classnames(s.container, props.active ? s.active : '') }
    type={ props.type }
    onClick={ onClick }>
      { props.children }
    </BootstrapButton>
  )
}

// Button.propTypes = {
//   text: React.PropTypes.string.isRequired,
// }

export default ButtonWrapper
