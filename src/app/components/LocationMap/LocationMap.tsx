import * as React from 'react'
import * as _ from 'lodash'
import { SFC } from 'react'
import GoogleMap from 'google-map-react'

import * as log from 'loglevel'

import Block from '../Block/Block'
import LocationMapCircleMarker from '../LocationMapCircleMarker/LocationMapCircleMarker'
import mapStyles from './locationMapStyles'

const s = require('./LocationMap.less')

interface IProps {
  googleMapAPIKey: string
  center: {
    lat: number
    lng: number
  }
  zoom: number,
  circleMarker: {
    lat: number
    lng: number
    radius: number
  },
  onViewportChange: Function
  onClick: Function
  title?: string,
}

const LocationMap: SFC<any> = function LocationMap(props) {
  log.debug('LocationMap render circleMarker: ', props.circleMarker)

  return (
    <Block title={ props.title } noBorder={ true }>
      <div className={ s.container }>
        <GoogleMap
          bootstrapURLKeys={{
            key: props.googleMapAPIKey,
            language: 'vi',
          }}
          options={{
            styles: mapStyles,
          }}
          center={ props.center }
          zoom={ props.zoom }
          onChange={ props.onViewportChange }
          onClick={ props.onClick && props.onClick }>
          {
            props.circleMarker ? <LocationMapCircleMarker
              lat={ props.circleMarker.lat }
              lng={ props.circleMarker.lng }
              radius={ props.circleMarker.radius }/> : undefined
          }
        </GoogleMap>
      </div>
    </Block>
  )
}

// 10.7859378,106.5255811
LocationMap.defaultProps = {
  center: {lat: 10.7859378, lng: 106.5255811},
  zoom: 12,
  title: 'We are here',
}

export default LocationMap
