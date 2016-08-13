import * as React from 'react'

import Block from '../Block/Block'
import Button from '../Button/Button'

const s = require('./Info.less')

function Info(props) {
  return (
    <div className={ 'container ' }>
      <Block>
          <div className={ s.container }>
            { props.children }
            <div className={ s.button }>
                <Button text={ props.btnText } />
            </div>
          </div>
      </Block>
    </div>
  )
}

// Info.propTypes = {
//   children: React.PropTypes.any.isRequired,
//   btnText: React.PropTypes.string,
// }

export default Info
