import React from 'react'
import FRC from 'formsy-react-components'
import {Decorator as FormsyElement} from 'formsy-react'

// const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } = FRC

import { observer } from 'shared/context'

@FormsyElement()
export default class Textarea extends React.Component {
  render() {
    return (
      <div>
        <textarea value={this.props.getValue()} onChange={(e) => this.props.setValue(e.target.value)}/>
      </div>
    )
  }
}