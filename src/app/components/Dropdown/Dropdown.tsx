import * as React from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import { MenuItem as BootstrapMenuItem} from 'react-bootstrap'
const s = require('./Dropdown.less')

function Dropdown(props) {
  return (
     <FormGroup>
      {
        props.label ? <ControlLabel>{ props.label }</ControlLabel> : undefined
      }
      <div className={ s.container }>
        
      </div>
    </FormGroup>
  )
}

// Dropdown.propTypes = {
//   title: React.PropTypes.string.isRequired,
// }

export default Dropdown

