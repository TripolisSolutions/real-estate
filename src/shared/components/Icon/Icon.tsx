import * as React from 'react'
import * as classnames from 'classnames'
import * as FontAwesome from 'react-fontawesome'

const s = require('./Icon.less')

interface IIconProps extends React.Props<any> {
  icon: string
}

export const Icon = (props: IIconProps) => {
  return (
    <FontAwesome className={ s.container }  name={ props.icon } /> 
  )
}
