import * as React from 'react'
import * as classnames from 'classnames'

const s = require('./Border.less')

interface IBorderProps extends React.Props<any> {
  hover?: boolean
  active?: boolean
}

export const Border = (props: IBorderProps) => {
  return (
    <div className={ classnames(
    s.container,
    props.hover ? s.canHover : undefined,
    props.active ? s.active : undefined)} >
      {this.props.children}
    </div>
  )
}
