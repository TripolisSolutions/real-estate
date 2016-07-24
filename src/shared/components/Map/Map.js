import React from 'react'
import GoogleMap from 'google-map-react'

import Block from '../Block/Block'

const s = require('./Map.less')

function Map(props) {
  return (
    <Block title={ props.title }  noBorder={ true }>
      <div className={ s.container }>
        <GoogleMap
          defaultCenter={ props.center }
          defaultZoom={ props.zoom }>
        </GoogleMap>
      </div>
    </Block>
  )
}

Map.propTypes = {
  center: React.PropTypes.object,
  zoom: React.PropTypes.int,
  coords: React.PropTypes.object,
  title: React.PropTypes.string,
}

Map.defaultProps = {
  center: {lat: 59.938043, lng: 30.337157},
  zoom: 9,
  coords: {lat: 59.724465, lng: 30.080121},
  title: 'We are here'
}


export default Map
