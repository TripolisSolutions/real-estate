import React from 'react'

import ButtonWrapper from '../ButtonWrapper/ButtonWrapper'

function Button(props) {
  return (
    <ButtonWrapper type={ props.type }>
      { props.text }
    </ButtonWrapper>
  )
}

Button.propTypes = {
  text: React.PropTypes.string.isRequired,
}

export default Button

