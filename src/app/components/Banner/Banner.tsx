import * as React from 'react'
import Slogan from '../Slogan/Slogan'

const s = require('./Banner.less')

function Banner(props) {

  return (
    <div className={ s.container }>
      <img src={ props.image } />
      <div className={ s.slogan }>
        <Slogan text={ props.slogan } />
      </div>
    </div>
  )
}

export default Banner
