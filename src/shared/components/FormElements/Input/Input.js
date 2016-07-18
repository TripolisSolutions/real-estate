import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'
import { connect } from 'mobx-connect'
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

const s = require('./Input.less')

function Input(props) {
  function onChange(e) {
    props.setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <FormGroup>
      <ControlLabel>{ props.label }</ControlLabel>
      <FormControl className={ s.container } type="text" placeholder={ props.placeholder }
      onChange={ onChange }/>
      <FormControl.Feedback />
      {
        props.isRequired() ? <HelpBlock>This field is required</HelpBlock> : undefined
      }
    </FormGroup>
  )
}

Input.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string
}


export default FormsyElement()(connect(Input))
