import React from 'react'
import GoogleMap from 'google-map-react'
import { connect } from 'mobx-connect'
import log from 'loglevel'

import Block from '../Block/Block'
import LocationMapCircleMarker from '../LocationMapCircleMarker/LocationMapCircleMarker'
import mapStyles from './locationMapStyles'

const s = require('./LocationMap.less')

function LocationMap(props) {
  log.debug('LocationMap render circleMarker: ', props.circleMarker)
  const { store: { locale: { languageCode } } } = this.context

  return (
    <Block title={ props.title } noBorder={ true }>
      <div className={ s.container }>
        <GoogleMap
          bootstrapURLKeys={{
            key: window.CONFIG.googleMapAPIKey,
            language: languageCode,
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
  title: 'We are here'
}

export default connect(LocationMap)
