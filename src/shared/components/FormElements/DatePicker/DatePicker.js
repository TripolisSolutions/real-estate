import React from 'react'
import Picker from 'react-datepicker'
import {Decorator as FormsyElement} from 'formsy-react'

import { observer } from 'shared/context'

const s = require('./DatePicker.less')

import 'react-datepicker/dist/react-datepicker.css'

function DatePicker(props) {
  function onChange(selected) {
    props.setValue(selected.value)
    props.onChange(selected.value)
  }

  return (
    <div className={ s.container }>
      <Picker
        dateFormat="DD/MM/YYYY"
        selected={ props.value }
        onChange={ onChange }
      />
    </div>
  )
}

DatePicker.propTypes = {
}

export default FormsyElement()(observer(DatePicker))

