import React from 'react'
import classnames from 'classnames'

const s = require('./Block.less')

function Block(props) {
  return (
    <div className={ classnames(s.container, props.noBorder ? s.no_border : undefined ) }>
      <div className={ s.title }>
        <h1> { props.title } </h1>
      </div>
      <div>
        { props.children }
      </div>
    </div>
  )
}

Block.propTypes = {
  children: React.PropTypes.any.isRequired,
  title: React.PropTypes.string.isRequired,
  noBorder: React.PropTypes.string
}

export default Block

