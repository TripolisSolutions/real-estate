import React from 'react'
import Picker from 'react-datepicker'
import {Decorator as FormsyElement} from 'formsy-react'
import { connect } from 'mobx-connect'

const s = require('./DatePicker.less')

import 'react-datepicker/dist/react-datepicker.css'

function DatePicker(props) {
  function onChange(selected) {
    props.setValue(selected.value)

    if (props.onChange) {
      props.onChange(selected.value)
    }
  }

  return (
    <div className={ s.container }>
      <Picker
        className={ s.input }
        dateFormat="DD/MM/YYYY"
        selected={ props.value }
        onChange={ onChange }
      />
    </div>
  )
}

DatePicker.propTypes = {
}

export default FormsyElement()(connect(DatePicker))

