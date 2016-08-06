import * as React from 'react'

import ButtonWrapper from '../ButtonWrapper/ButtonWrapper'
import Icon from '../Icon/Icon'

const s = require('./ButtonIcon.less')

function ButtonIcon(props) {
  return (
    <ButtonWrapper>
      <div className={ s.container }>
        <Icon icon={ props.icon} color={ '#fff' } />
        {
          props.text ? (
            <label>
             { props.text }
            </label>
          ) : undefined
        }
      </div>
    </ButtonWrapper>
  )
}


export default ButtonIcon

