import React from 'react'
import classnames from 'classnames'

const s = require('./Border.less')

function Border(props) {
  return (
    <div className={ classnames(
    s.container,
    props.hover ? s.canHover : undefined,
    props.active ? s.active : undefined)} >
      {this.props.children}
    </div>
  )
}

Border.propTypes = {
  hover: React.PropTypes.boolean,
  active: React.PropTypes.boolean,
}

export default Border
