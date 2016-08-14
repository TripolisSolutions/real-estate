import * as React from 'react'
import { FormGroup as BootstrapFormGroup} from 'react-bootstrap'
import { FormControl as BootstrapControl} from 'react-bootstrap'

const s = require('./TextArea.less')

interface IProps {
  type?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  onChange(value: string)
}

function TextArea(props: IProps) {
  return (
    <BootstrapFormGroup className={ s.container }>
      <BootstrapControl
        className={ s.control }
        componentClass='textarea'
        defaultValue={ props.defaultValue }
        placeholder={ props.placeholder }
        onChange={ (e) => props.onChange((e.target as any).value) }
        disabled={ props.disabled }
      />
    </BootstrapFormGroup>
  )
}

// TextArea.propTypes = {
//   value: React.PropTypes.string,
//   placeholder: React.PropTypes.string.isRequired
// }


export default TextArea;