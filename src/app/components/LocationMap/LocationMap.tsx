import * as React from 'react'
import * as _ from 'lodash'
import { SFC } from 'react'
import GoogleMap from 'google-map-react'

import * as log from 'loglevel'

import Block from '../Block/Block'
import LocationMapCircleMarker from '../LocationMapCircleMarker/LocationMapCircleMarker'
import mapStyles from './locationMapStyles'

const s = require('./LocationMap.less')

const LocationMap: SFC<any> = function LocationMap(props) {
  log.debug('LocationMap render circleMarker: ', props.circleMarker)

  let key: string
  if (typeof window !== 'undefined') {
    key = window.__CONFIG__.googleMapAPIKey
  }

  return (
    <Block title={ props.title } noBorder={ true }>
      <div className={ s.container }>
        <GoogleMap
          bootstrapURLKeys={{
            key: key,
            language: 'vi',
          }}
          options={{
            styles: mapStyles,
          }}
          center={ props.center }
          zoom={ props.zoom }
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

LocationMap.propTypes = {
  center: React.PropTypes.object,
  zoom: React.PropTypes.number,
  circleMarker: React.PropTypes.object,
  onClick: React.PropTypes.func,
  title: React.PropTypes.string,
}
// 10.7859378,106.5255811
LocationMap.defaultProps = {
  center: {lat: 10.7859378, lng: 106.5255811},
  zoom: 12,
  title: 'We are here',
}

export default LocationMap
