import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'
import { FormControl as BootstrapControl} from 'react-bootstrap'

import { observer } from 'shared/context'

const s = require('./Textarea.less')

function TextArea(props) {
  function onChange(e) {
    props.setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <BootstrapControl className={ s.control } componentClass='textarea' placeholder={ props.placeholder }
      value={ this.props.getValue() } onChange={ onChange }/>
  )
}

TextArea.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string.isRequired
}

export default FormsyElement()(observer(TextArea))
