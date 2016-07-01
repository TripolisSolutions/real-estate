import React from 'react'
import classnames from 'classnames'
import FontAwesome from 'react-fontawesome'

const s = require('./Icon.less')

function Icon(props) {
  return (
    <FontAwesome className={ s.container }  name={ props.icon } /> 
  )
}

Icon.propTypes = {
  icon: React.PropTypes.string.isRequired,
}

export default Icon
