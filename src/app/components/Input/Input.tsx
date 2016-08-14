import * as React from 'react'
import { FormGroup as BootstrapFormGroup} from 'react-bootstrap'
import { FormControl as BootstrapControl} from 'react-bootstrap'

const s = require('./Input.less')

interface IProps {
  type?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  onChange(value: string)
}

function Input(props: IProps) {
  return (
    <BootstrapFormGroup>
      <BootstrapControl
        className={ s.container }
        type={ props.type || 'text' }
        defaultValue={ props.defaultValue }
        placeholder={ props.placeholder }
        disabled={ props.disabled }
        onChange={ (e) => props.onChange((e.target as any).value) }
      />
    </BootstrapFormGroup>
  )
}

export default Input
