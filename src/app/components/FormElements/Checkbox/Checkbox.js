import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'

import { Checkbox as BSCheckbox } from 'react-bootstrap'
import log from 'loglevel'

function Checkbox(props) {
  function onChange(e) {
    log.debug('Checkbox onChange e: ', e)

    props.setValue(e.target.checked)
    if (props.onChange) {
      props.onChange(e.target.checked)
    }
  }

  return (
    <BSCheckbox onChange={onChange} defaultChecked={ props.getValue() }>{ props.children }</BSCheckbox>
  )
}

Checkbox.propTypes = {
  value: React.PropTypes.bool,
  placeholder: React.PropTypes.string
}


export default FormsyElement()(connect(Checkbox))
