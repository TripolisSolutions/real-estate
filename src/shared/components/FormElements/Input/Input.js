import React from 'react'
import FRC from 'formsy-react-components'
import {Decorator as FormsyElement} from 'formsy-react'

const { Checkbox, CheckboxGroup, RadioGroup, Row, Select, File, Textarea } = FRC

import { observer } from 'shared/context'


function Input(props) {
  function onChange(e) {
    props.setValue(e.target.value)
    props.onChange(e.target.value)
  }

  return (
    <div>
      <input value={props.getValue()} onChange={ onChange }/>
    </div>
  )
}

Input.propTypes = {
}

export default FormsyElement()(observer(Input))
