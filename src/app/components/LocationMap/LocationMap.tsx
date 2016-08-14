import * as React from 'react'
import { SFC } from 'react'

import Block from '../Block/Block'
import GoogleMap from '../GoogleMap/GoogleMap'

const s = require('./LocationMap.less')

interface IProps {
  googleMapAPIKey?: string
  lat?: number
  lng?: number
  zoom?: number,
  circleMarker?: {
    lat: number
    lng: number
    radius: number
  },
  onViewportChange?: Function
  onClick?: Function
  title?: string,
}

const LocationMap: SFC<IProps> = function LocationMap(props: IProps) {

  let key
  if (props.googleMapAPIKey) {
    key = props.googleMapAPIKey
  } else if (typeof window !== 'undefined') {
    key = window.__CONFIG__.googleMapAPIKey
  }

  return (
    <Block title={ props.title } noBorder={ true }>
      <div className={ s.container }>
        <GoogleMap
          googleMapAPIKey={ props.googleMapAPIKey }
          lat={ props.lat }
          lng={ props.lng }
          zoom={ props.zoom }
          circleMarker={ props.circleMarker }
          onViewportChange={ props.onViewportChange }
          onClick={ props.onClick }
        />
      </div>
    </Block>
  )
}

// 10.7859378,106.5255811
LocationMap.defaultProps = {
  googleMapAPIKey: '',
  lat: 10.81442195828899,
  lng: 106.6552734375,
  zoom: 12,
  title: '',
}

export default LocationMap
