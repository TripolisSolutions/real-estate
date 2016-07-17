import React from 'react'
import { FormGroup as BootstrapFormGroup} from 'react-bootstrap'
import { FormControl as BootstrapControl} from 'react-bootstrap'

const s = require('./Input.less')

function Input(props) {
  return (
    <BootstrapFormGroup>
      <BootstrapControl className={ s.container } type="text" placeholder={ props.placeholder } />
    </BootstrapFormGroup>
  )
}

Input.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string.isRequired
}


export default Input
