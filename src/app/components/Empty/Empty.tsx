import * as React from 'react'

import Block from '../Block/Block'

const s = require('./Empty.less')

function Info(props) {
  return (
    <div className={'container'}> 
      <Block>
          <h1 className={ s.container}>
            { props.text }
          </h1>
      </Block>
    </div>
  )
}
export default Info
