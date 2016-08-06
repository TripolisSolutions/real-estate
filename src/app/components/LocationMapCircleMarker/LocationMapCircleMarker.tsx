import * as React from 'react'
import { SFC } from 'react'

const s = require('./LocationMapCircleMarker.less')

const LocationMapCircleMarker: SFC<any> = function LocationMapCircleMarker(props) {
  const outerRadius = props.radius
  const innerRadius = props.radius - 20

  return (
    <div className={ s.wrap } style={{
      width: outerRadius,
      height: outerRadius,
      marginLeft: -outerRadius / 2,
      marginTop: -outerRadius / 2,
    }}>
      <div className={ s.inner } style={{
        width: innerRadius,
        height: innerRadius,
      }}></div>
    </div>
  )
}

LocationMapCircleMarker.propTypes = {
  radius: React.PropTypes.number,
}

LocationMapCircleMarker.defaultProps = {
  radius: 300,
}


export default LocationMapCircleMarker
