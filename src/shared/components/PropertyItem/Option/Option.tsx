import * as React from 'react'
import { Icon } from '../../Icon/Icon'

const s = require('./Option.less')

interface IOptionProps extends React.Props<any> {
  icon: string
  text: string
  value: string
}

export const Option = (props: IOptionProps) => {
  return (
    <div className={ s.container} >
      <Icon icon={ props.icon } />
      <span>{ props.text }: </span>
      <span>{ props.value } </span>
    </div>
  )
}

