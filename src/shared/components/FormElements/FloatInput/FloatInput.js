import React from 'react'
import NumberInput from 'react-number-input'
import {Decorator as FormsyElement} from 'formsy-react'
import { connect } from 'mobx-connect'

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
    <div className={ s.container }>
      <NumberInput
        type='text'
        value={ value }
        placeholder={ props.placeholder }
        onChange={ onChange }
        format='0,0[.][00]'/>
    </div>
  )
}

Input.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string
}


export default FormsyElement()(connect(Input))
