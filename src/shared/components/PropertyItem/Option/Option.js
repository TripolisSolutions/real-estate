import React from 'react'
import Icon from '../../Icon/Icon'

const s = require('./Option.less')

function Option(props) {
  return (
    <div className={ s.container} >
      <div className={ s.icon }>
        <Icon icon={ props.icon } />
      </div>
      <span>{ props.text }: </span>
      <span>{ props.value } </span>
    </div>
  )
}

Option.propTypes = {
  icon: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
}

export default Option