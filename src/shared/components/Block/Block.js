import React from 'react'

const s = require('./Block.less')

function Block(props) {
  return (
    <div className={ s.container }>
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
}

export default Block

