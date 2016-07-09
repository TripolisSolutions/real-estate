import React from 'react'
import FontAwesome from 'react-fontawesome'

import Block from '../Block/Block'
import Button from '../Button/Button'

const s = require('./Info.less')

function Info(props) {
  return (
    <div className={ 'container ' }>
      <Block title={ '"We chose this site based on its reputation for building high quality homes while providing incredible customer service."' }>
          <div className={ s.container }>
            <div className={ s.button }>
                <Button text='More info' />
            </div>
          </div>
      </Block>
    </div>
  )
}

Info.propTypes = {
  
}

export default Info
