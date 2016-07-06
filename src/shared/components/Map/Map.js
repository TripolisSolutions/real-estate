import React from 'react'
import GoogleMap from 'google-map-react'

const s = require('./Map.less')

function Map(props) {
  return (
    <div className={ s.container }>
      <GoogleMap
        defaultCenter={ props.center }
        defaultZoom={ props.zoom }>
      </GoogleMap>
    </div>
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
