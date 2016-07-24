import React from 'react'
import classnames from 'classnames'

const s = require('./Block.less')

function Block(props) {
  return (
    <div className={ classnames(s.container, props.noBorder ? s.no_border : undefined ) }>
      <div className={ s.title }>
        <h1 className={ props.bigger ? s.bigger : undefined}> { props.title } </h1>
      </div>      
      { props.children }      
    </div>
  )
}

Block.propTypes = {
  children: React.PropTypes.any.isRequired,
  title: React.PropTypes.string,
  noBorder: React.PropTypes.bool,
  bigger: React.PropTypes.bool,
}

export default Block

