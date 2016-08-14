import * as update from 'react/lib/update'
import * as React from 'react'
import * as log from 'loglevel'
import * as _ from 'lodash'
import { translate, InjectedTranslateProps } from 'react-i18next'
import {
  Grid, Row, Col,
} from 'react-bootstrap'
import withReducer from 'recompose/withReducer'
const fitBounds = require('google-map-react/utils').fitBounds

import { Form } from 'formsy-react'
const { Input, Checkbox, Select } = require('formsy-react-components')

import { ICircleMarker, IMapViewport } from '../../../../redux/modules/properties/properties.model'
import LocationMap from '../../../LocationMap/LocationMap'

import { translatedOptions } from '../../../../helpers/options'

const s = require('./StepAddressLocation.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  addressVN: string
  addressEN: string
  addressVisible: boolean
  district: string
  mapViewport?: IMapViewport
  mapMarker?: ICircleMarker
  googleMapAPIKey: string
  onVisiblityChange(visible: boolean)
  onAddressChange(addressVN: string, addressEN: string, district: string)
  onMapDataChange(viewport: IMapViewport, marker: ICircleMarker)
  onNext()
}

interface IState {
  addressVN: string
  addressEN: string
  mapViewport?: IMapViewport
  mapMarker?: ICircleMarker
}

const reducer = (state: IState, action) => {
  switch (action.type) {
    case 'UPDATE_ADDRESS':
      return update(state, {
        addressVN: {
          $set: action.payload.address_in_vietnamese,
        },
        addressEN: {
          $set: action.payload.address_in_english,
        },
      })
    case 'SET_MAP_MARKER':
      return update(state, {
        mapMarker: {
          $set: {
            lat: action.payload.lat,
            lng: action.payload.lng,
            radius: action.payload.radius,
          },
        },
      })
    case 'SET_MAP_VIEWPORT':
      return update(state, {
        mapViewport: {
          $set: {
            lat: action.payload.lat,
            lng: action.payload.lng,
            zoom: action.payload.zoom,
          },
        },
      })
    default:
      return state
  }
}

const enhance = withReducer<IState, any, IProps>('state', 'dispatch', reducer, {
  addressVN: '',
  addressEN: '',
})

interface IInternalProps extends IProps {
  state?: IState
  dispatch?: Function
}

export class StepAddressLocation extends React.Component<IInternalProps, void> {

  constructor(props: IInternalProps) {
    super(props)

    if (props.mapViewport) {
      props.state.mapViewport = props.mapViewport
    }

    if (props.mapMarker) {
      props.state.mapMarker = props.mapMarker
    }

    props.state.addressVN = props.addressVN || ''
    props.state.addressEN = props.addressEN || ''
  }

  private lookup = (langCode: string) => {
    return (
      <span className={'glyphicon glyphicon-search ' + s.clickable}
        onClick={() => {
          const props = this.props

          let address
          if (langCode === 'vi') {
            address = props.state.addressVN
          } else {
            address = props.state.addressEN
          }

          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?`
            + `address=${ address }&key=${ props.googleMapAPIKey }`
          )
          .then((res) => {
            log.debug('geoencoding response: ', res)
            if (!res.ok) {
              log.error('error response from google: ', res)
              return
            }

            return res.json()
          }).then((data) => {
            if (data.results <= 0) {
              return
            }

            const { geometry } = data.results[0]
            const bounds = geometry.bounds || geometry.viewport
            const sanatizedBounds = {
              nw: {
                lat: bounds.northeast.lat,
                lng: bounds.southwest.lng,
              },
              se: {
                lat: bounds.southwest.lat,
                lng: bounds.northeast.lng,
              },
            }

            const size = {
              width: 1140, // Map width in pixels
              height: 600, // Map height in pixels
            }

            const {center, zoom} = fitBounds(sanatizedBounds, size)

            props.dispatch({
              type: 'SET_MAP_VIEWPORT',
              payload: {
                lat: center.lat,
                lng: center.lng,
                zoom,
              },
            })
          })
          .catch( (error) => {
            log.error('error geoencoding google api ', error)
          })
        }}
      ></span>
    )
  }

  public render() {
    const props = this.props
    const { t } = props

    let lat: number
    let lng: number
    let zoom: number

    if (props.state.mapViewport) {
      lat = props.state.mapViewport.lat
      lng = props.state.mapViewport.lng
      zoom = props.state.mapViewport.zoom
    }

    let marker: ICircleMarker
    if (props.state.mapMarker) {
      marker = props.state.mapMarker
    }

    const {
      districts,
    } = translatedOptions(t)

    return (
      <div className={ s.container }>
        <Grid>
          <Row>
            <Col xs={12}>
              <Form
                className='horizontal'
                onChange={ _.debounce((data) => {
                  props.dispatch({type: 'UPDATE_ADDRESS', payload: data})
                  props.onAddressChange(data.address_in_vietnamese, data.address_in_english, data.district)
                }, 300)}
              >
                <fieldset>
                  <Input
                    name='address_in_vietnamese'
                    defaultValue={ props.addressVN }
                    label={ t('address_in_vietnamese') }
                    type='text'
                    placeholder={ t('address_in_vietnamese') }
                    addonAfter={
                      this.lookup('vi')
                    }
                  />
                  <Input
                    name='address_in_english'
                    defaultValue={ props.addressEN }
                    label={ t('address_in_english') }
                    type='text'
                    placeholder={ t('address_in_english') }
                    addonAfter={
                      this.lookup('en')
                    }
                  />
                  {
                    /*
                    <Checkbox
                        name='address_visible'
                        value={ props.addressVisible }
                        label={ t('address_visible') }
                        rowLabel=''
                        onChange={ (name, visible) => {
                          props.onVisiblityChange(visible)
                        } }
                    />  
                    */
                  }
                  <Select
                    name='district'
                    value={ props.district }
                    label={ t('district') }
                    options={ districts }
                  />
                </fieldset>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <LocationMap
                googleMapAPIKey={ props.googleMapAPIKey }
                lat={ lat }
                lng={ lng }
                zoom={ zoom }
                circleMarker={ marker }
                onViewportChange={ ({center, zoom}) => {
                  const viewport = {
                    lat: center.lat,
                    lng: center.lng,
                    zoom,
                  }

                  props.dispatch({
                    type: 'SET_MAP_VIEWPORT',
                    payload: viewport,
                  })

                  props.onMapDataChange(viewport, props.state.mapMarker)
                }}
                onClick={ ({lat, lng}, {radius}) => {
                  props.dispatch({
                    type: 'SET_MAP_MARKER',
                    payload: {
                      lat, lng, radius,
                    },
                  })

                  props.onMapDataChange(props.state.mapViewport, {lat, lng, radius})
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <fieldset>
                  <input className='btn btn-primary'
                    formNoValidate={ true } type='button' defaultValue={ t('ok') }
                    onClick={ props.onNext }
                  />
              </fieldset>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default enhance(translate()(StepAddressLocation))
