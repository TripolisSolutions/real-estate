import * as React from 'react'

import ButtonWrapper from '../ButtonWrapper/ButtonWrapper'

function Button(props) {
  function onClick() {
    props.onClick()
  }
  return (
    <ButtonWrapper type={ props.type } onClick={ onClick } active={ props.active }>
      { props.text }
    </ButtonWrapper>
  )
}

// Button.propTypes = {
//   text: React.PropTypes.string.isRequired,
// }

export default Button

