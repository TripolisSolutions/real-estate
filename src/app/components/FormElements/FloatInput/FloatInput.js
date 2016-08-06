import React from 'react'
import NumberInput from 'react-number-input'
import {Decorator as FormsyElement} from 'formsy-react'
import { FormGroup, ControlLabel } from 'react-bootstrap'


const s = require('./FloatInput.less')

function Input(props) {
  function onChange(e) {
    props.setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  let value = props.getValue()
  value = parseInt(value)

  return (
    <FormGroup>
      {
        props.label ? <ControlLabel>{ props.label }</ControlLabel> : null
      }
      <div className={ s.container }>
        <NumberInput
          type='text'
          value={ value }
          placeholder={ props.placeholder }
          onChange={ onChange }
          format='0,0[.][00]'/>
      </div>
    </FormGroup>
  )
}

Input.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string
}


export default FormsyElement()(connect(Input))
