import React from 'react'
import GoogleMap from 'google-map-react'

import Block from '../Block/Block'

const s = require('./Map.less')

function Map(props) {
  return (
    <Block title='We are here'  noBorder={ true }>      
      <GoogleMap
        defaultCenter={ props.center }
        defaultZoom={ props.zoom }>
      </GoogleMap>      
    </Block>
  )
}

Map.propTypes = {
  center: React.PropTypes.object,
  zoom: React.PropTypes.int,
  coords: React.PropTypes.object,
}

Map.defaultProps = {
  center: {lat: 59.938043, lng: 30.337157},
  zoom: 9,
  coords: {lat: 59.724465, lng: 30.080121}
}

export default Map
