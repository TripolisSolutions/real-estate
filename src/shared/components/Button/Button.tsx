import * as React from 'react'
import { Button as BBUtton } from 'react-bootstrap'

const s = require('./Button.less')

class Button extends React.Component<any, any> {
  render() {
    return (
      <BBUtton bsSize='large' className={ s.host } >
        {this.props.children}
      </BBUtton>
    )
  }
}

export default Button
