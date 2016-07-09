import React from 'react'

import ButtonWrapper from '../ButtonWrapper/ButtonWrapper'
import Icon from '../Icon/Icon'

const s = require('./ButtonIcon.less')

function ButtonIcon(props) {
  return (
    <ButtonWrapper>
      <div className={ s.container }>
      <Icon icon={ props.icon} color={ '#fff' } />
      </div>
    </ButtonWrapper>
  )
}

ButtonIcon.propTypes = {
  icon: React.PropTypes.string.isRequired,
}

export default ButtonIcon

