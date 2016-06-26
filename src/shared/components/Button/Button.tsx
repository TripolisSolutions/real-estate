import * as React from 'react'
import * as classnames from 'classnames'
import { Button as BBUtton } from 'react-bootstrap'

const s = require('./Button.less')

interface IButtonProps extends React.Props<any> {
  txt: string
}

export const Button = (props: IButtonProps) => {
  return (
    <BBUtton bsSize='large' className={ s.container } >
      { props.txt }
    </BBUtton>
  )
}
