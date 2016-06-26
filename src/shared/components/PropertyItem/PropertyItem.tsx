import * as React from 'react'
import { Option } from './Option/Option'
import { Button } from '../Button/Button'

const s = require('./PropertyItem.less')

interface IPropertyItemProps extends React.Props<any> {
  title: string
  img?: string
}

export const PropertyItem = (props: IPropertyItemProps) => {
  return (
    <div className={ s.container} >
      <h2>{ props.title }</h2> 
      <Option icon='glyphicon-repeat' text='Bed' value='4'/>
      <Button text='More Info' />
    </div>
  )
}

