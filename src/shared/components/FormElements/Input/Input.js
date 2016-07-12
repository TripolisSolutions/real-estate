import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'
import { observer } from 'shared/context'
import { FormControl as BootstrapControl} from 'react-bootstrap'

const s = require('./Input.less')

function Input(props) {
  return (
    <BootstrapControl className={ s.container } type="text" placeholder={ props.placeholder } />
  )
}

Input.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string.isRequired
}


export default FormsyElement()(observer(Input))
