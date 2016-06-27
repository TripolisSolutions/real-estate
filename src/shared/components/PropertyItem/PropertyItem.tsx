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
      <div className={ s.options }>
        <Option icon='glyphicon-bed' text='Beds' value='4'/>
        <Option icon='glyphicon-fullscreen' text='Square' value='4'/>
        <Option icon='glyphicon-map-marker' text='District' value='4'/>
        <Option icon='glyphicon-usd' text='Bed' value='4'/>
        <Option icon='glyphicon-time' text='Aviable' value='4'/>
        <Option icon='glyphicon-hourglass' text='Day for rent' value='4'/>
      </div>
      <div className={ s.button }>
        <Button text='More Info' />
      </div>
    </div>
  )
}

