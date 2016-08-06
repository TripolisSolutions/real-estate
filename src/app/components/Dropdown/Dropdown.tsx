import * as React from 'react'
import { DropdownButton as BootstrapDropdownButton } from 'react-bootstrap'
import { MenuItem as BootstrapMenuItem} from 'react-bootstrap'
const s = require('./Dropdown.less')

function Dropdown(props) {
  return (
    <BootstrapDropdownButton id='test' title={ props.title } className={ s.container }>
    </BootstrapDropdownButton>
  )
}

// Dropdown.propTypes = {
//   title: React.PropTypes.string.isRequired,
// }

export default Dropdown

