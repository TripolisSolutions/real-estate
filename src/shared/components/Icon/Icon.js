import React from 'react'
import FontAwesome from 'react-fontawesome'

const s = require('./Icon.less')

function Icon(props) {
  return (
    <div className={ props.color ? props.color : ''}>
      <FontAwesome  name={ props.icon } />
    </div>
  )
}

Icon.propTypes = {
  icon: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
}

export default Icon
