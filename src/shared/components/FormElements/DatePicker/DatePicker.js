import React from 'react'
import Picker from 'react-datepicker'
import {Decorator as FormsyElement} from 'formsy-react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import { connect } from 'mobx-connect'

const s = require('./DatePicker.less')

import 'react-datepicker/dist/react-datepicker.css'

function DatePicker(props) {
  function onChange(selected) {
    props.setValue(selected)

    if (props.onChange) {
      props.onChange(selected)
    }
  }

  return (
    <FormGroup>
      <ControlLabel>{ props.label }</ControlLabel>
      <div className={ s.container }>
        <Picker
          className={ s.input }
          dateFormat="DD/MM/YYYY"
          selected={ props.getValue() }
          onChange={ onChange }
        />
      </div>
    </FormGroup>
  )
}

DatePicker.propTypes = {
  label: React.PropTypes.string,
}

export default FormsyElement()(connect(DatePicker))

