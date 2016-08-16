import * as React from 'react'
import { SFC } from 'react'
// import * as log from 'loglevel'
import * as _ from 'lodash'
import mapStyles from './locationMapStyles'

const {GoogleMap, Circle} = require('react-google-maps')
const ScriptjsLoader = require('react-google-maps/lib/async/ScriptjsLoader')

interface IProps extends React.Props<any> {
  googleMapAPIKey?: string
  lat?: number
  lng?: number
  zoom?: number,
  circleMarker?: {
    lat: number
    lng: number
    radius: number
  },
  scrollwheel?: boolean
  onViewportChange?: Function
  onClick?: Function
}

const LocationMap: SFC<IProps> = function LocationMap(props: IProps) {

  let key
  if (props.googleMapAPIKey) {
    key = props.googleMapAPIKey
  } else if (typeof window !== 'undefined') {
    key = window.__CONFIG__.googleMapAPIKey
  }

  return (
    <ScriptjsLoader
      hostname={'maps.googleapis.com'}
      pathname={'/maps/api/js'}
      query={{v: `3.24`, libraries: 'places,geometry', key: key}}
      loadingElement={
        <div>
        </div>
      }
      containerElement={
        <div id='realestateGMap' style={{
          height: '600px',
        }}/>
      }
      googleMapElement={
        <GoogleMap
          zoom={ props.zoom }
          center={{ lat: props.lat, lng: props.lng }}
          onClick={ function({latLng}) {
            if (!props.onClick) {
              return
            }

            const bounds = this.getBounds();

            const center = bounds.getCenter();
            const ne = bounds.getNorthEast();

            const radius = window.google.maps.geometry.spherical.computeDistanceBetween(center, ne) / 6

            props.onClick({
              lat:latLng.lat(),
              lng: latLng.lng(),
            }, {radius: radius})
          }}
          onBoundsChanged={ _.debounce(function() {
            const center = this.getCenter()
            const zoom = this.getZoom()
            if (!props.onViewportChange) {
              return
            }
            props.onViewportChange({center: { lat: center.lat(), lng: center.lng() }, zoom})
          }, 200) }
          defaultOptions={{
            scrollwheel: props.scrollwheel,
            styles: mapStyles,
          }}
        >
          {
            props.circleMarker ? (
              <Circle
                options={{
                  strokeColor: 'rgba(105, 81, 50, 0.61)',
                  strokeOpacity: 0.8,
                  strokeWeight: 4,
                  fillColor: 'rgba(170, 147, 116, 1)',
                  fillOpacity: 0.25,
                }}
                center={{
                  lat: props.circleMarker.lat,
                  lng: props.circleMarker.lng,
                }}
                radius={ props.circleMarker.radius }
              />
            ) : undefined
          }
        </GoogleMap>
      }
    />
  )
}

// 10.7859378,106.5255811
LocationMap.defaultProps = {
  googleMapAPIKey: '',
  lat: 10.81442195828899,
  lng: 106.6552734375,
  zoom: 12,
  scrollwheel: false,
}

export default LocationMap
