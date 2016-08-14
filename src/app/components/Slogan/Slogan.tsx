import * as React from 'react'

const s = require('./Slogan.less')

function Slogan(props) {

  return (
    <span className={ s.container }>{ props.text }</span>
  )
}

export default Slogan

