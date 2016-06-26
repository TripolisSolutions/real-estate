import * as React from 'react'
import * as classnames from 'classnames'

const s = require('./Icon.less')

interface IIconProps extends React.Props<any> {
  icon: string
}

export const Icon = (props: IIconProps) => {
  return (
    <i className={ classnames('glyphicon', props.icon, s.container)  } >
    </i>
  )
}
