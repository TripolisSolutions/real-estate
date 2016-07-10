import React from 'react'
import Select from 'react-select'
import {Decorator as FormsyElement} from 'formsy-react'

import { observer } from 'shared/context'

const s = require('./Dropdown.less')

function Dropdown(props) {
  function onChange(selected) {
    props.setValue(selected.value)
    props.onChange(selected.value)
  }

  return (
    <Select
      className={ s.container }
      name={ `dropdown-${ props.name }` }
      value={ props.value }
      options={ props.options }
      onChange={ onChange }
    />
  )
}

Dropdown.propTypes = {
  title: React.PropTypes.string.isRequired,
  options: React.PropTypes.object.isRequired,
}

export default FormsyElement()(observer(Dropdown))

