import * as React from 'react'
import { Button as BBUtton } from 'react-bootstrap'

const s = require('./Button.less')

interface IButtonProps extends React.Props<any> {
  text: string
}

export const Button = (props: IButtonProps) => {
  return (
    <BBUtton bsSize='large' className={ s.container } >
      { props.text }
    </BBUtton>
  )
}
