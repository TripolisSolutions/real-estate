import React from 'react'
import Select from 'react-select'
import {Decorator as FormsyElement} from 'formsy-react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import { connect } from 'mobx-connect'
import { toJS } from 'mobx'

const s = require('./Dropdown.less')

function Dropdown(props) {
  function onChange(selected) {
    let value
    if (selected) {
      value = selected.value
    }

    props.setValue(value)
    if (props.onChange) {
      props.onChange(value)
    }
  }

  return (
    <FormGroup>
      {
        props.label ? <ControlLabel>{ props.label }</ControlLabel> : undefined
      }
      <div className={ s.container }>
        <Select
          placeholder={ props.placeholder }
          className={ s.dropdown }
          name={ `dropdown-${ props.name }` }
          value={ props.getValue() }
          options={ toJS(props.options) }
          onChange={ onChange }
          />
      </div>
    </FormGroup>
  )
}

Dropdown.propTypes = {
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
}

export default FormsyElement()(connect(Dropdown))

