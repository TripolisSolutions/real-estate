import * as React from 'react'
import { SFC } from 'react'
import { Decorator, IFormElementProps } from 'formsy-react'

import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

interface IProps extends IFormElementProps{
  label: string
  value: string
  placeholder: string
  onChange(v: string)
}

const Input: SFC<IProps> = (props: IProps) => {
  function onChange(e) {
    props.setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <FormGroup>
      <ControlLabel>{ props.label }</ControlLabel>
      <FormControl type='text' placeholder={ props.placeholder }
      onChange={ onChange } defaultValue={ props.getValue() }/>
      <FormControl.Feedback />
      {
        props.isRequired() ? <HelpBlock>This field is required</HelpBlock> : undefined
      }
    </FormGroup>
  )
}

export default Decorator()(Input)
