import React from 'react'
import { FormGroup as BootstrapFormGroup} from 'react-bootstrap'
import { FormControl as BootstrapControl} from 'react-bootstrap'

const s = require('./TextArea.less')

function TextArea(props) {
  return (
    <BootstrapFormGroup>
      <BootstrapControl  className={ s.container } componentClass="textarea" placeholder={ props.placeholder } />
    </BootstrapFormGroup>
  )
}

TextArea.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string.isRequired
}


export default TextArea;