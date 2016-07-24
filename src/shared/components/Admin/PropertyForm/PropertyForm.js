import React from 'react'
import log from 'loglevel'
import { connect } from 'mobx-connect'
import { observable } from 'mobx'
import request from 'axios'
import { fitBounds } from 'google-map-react/utils'

import Input from 'components/FormElements/Input/Input'
import IntegerInput from 'components/FormElements/IntegerInput/IntegerInput'
import FloatInput from 'components/FormElements/FloatInput/FloatInput'
import AddressInput from 'components/FormElements/AddressInput/AddressInput'
import RichEditor from 'components/FormElements/RichEditor/RichEditor'
import Dropdown from 'components/FormElements/Dropdown/Dropdown'
import DatePicker from 'components/FormElements/DatePicker/DatePicker'
import Checkbox from 'components/FormElements/Checkbox/Checkbox'
import LocationMap from 'components/LocationMap/LocationMap'
import Button from 'components/Button/Button'

import {
  Grid, Row, Col,
  FormGroup, ControlLabel,
} from 'react-bootstrap'

@connect
class PropertyForm extends React.Component {

  @observable mapCenter // {lat: 10.7859378, lng: 106.5255811}
  @observable mapZoom // 10
  @observable mapCircleMarker// {lat, lng, radius}

  @observable isFetching = false

  constructor(props) {
    super(props)

    log.info('PropertyForm props: ', props)
  }

  submit = (data) => {
    log.debug('submiting', data)

    this.isFetching = true
    this.context.store.properties.create(data).then((resp) => {
      log.debug('resp: ', resp)
      this.isFetching = false
      this.context.router.push(`/admin/properties/${ resp.doc.id }`)
    })
  }

  mapInputs(inputs) {
    log.debug('mapInputs ', inputs)

    const property = {
      name: [
        {
          language: 'vietnamese',
          text: inputs.nameVN,
        },
        {
          language: 'english',
          text: inputs.nameEN,
        },
      ],
      desc: [
        {
          language: 'vietnamese',
          text: inputs.descVN,
        },
        {
          language: 'english',
          text: inputs.descEN,
        },
      ],
      categoryID: inputs.categoryID,
      salesType: inputs.salesType,
      availableUntil: inputs.availableUntil,
      size: {
        width: inputs.sizeWidth,
        length: inputs.sizeLength,
      },
      address: {
        name: [
          {
            language: 'vietnamese',
            text: inputs.addressVN,
          },
          {
            language: 'english',
            text: inputs.addressEN,
          },
        ],
        visible: inputs.addressVisible,
      },
      bedRoomCount: inputs.bedRoomCount,
      facingDirection: inputs.facingDirection,
      rentalPeriod: {
        digits: inputs.rentalPeriodValue,
        unit: inputs.rentalPeriodUnit,
      },
      price: [
        {
          currency: 'VND',
          value: inputs.priceVN,
        },
        {
          currency: 'USD',
          value: inputs.priceEN,
        },
      ],
      visible: inputs.visible
    }

    if (this.mapCenter) {
      property.address.viewport = {
        lat: this.mapCenter.lat,
        lng: this.mapCenter.lng,
        zoom: this.mapZoom,
      }
    }

    if (this.mapCircleMarker) {
      property.address.circleMarker = {
        lat: this.mapCircleMarker.lat,
        lng: this.mapCircleMarker.lng,
        radius: this.mapCircleMarker.radius,
      }
    }
    return property
  }

  trackLocationOnMap = (address) => {
    request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ address }&key=${ window.CONFIG.googleMapAPIKey }`)
    .then((res) => {
      log.debug('geoencoding response: ', res)

      const { data } = res
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
        }
      }

      const size = {
        width: 1140, // Map width in pixels
        height: 600, // Map height in pixels
      }

      const {center, zoom} = fitBounds(sanatizedBounds, size)
      this.mapCenter = center
      this.mapZoom = zoom
    })
    .catch( (error) => {
      log.error('error geoencoding google api ', error)
    })
  }

  setCircleMarker = ({x, y, lat, lng}) => {
    log.debug('setCircleMarker ', x, y, lat, lng)

    this.mapCircleMarker = {
      lat: lat,
      lng: lng,
      radius: 300,
    }
  }

  render() {
    const { store } = this.context
    const salesTypes = store.salesTypes.options
    const directions = store.directions.options
    const rentalPeriods = store.rentalPeriods.options
    const { formData, categories } = this.props

    return (
      <div>
        <Formsy.Form onSubmit={ this.submit } mapping={ this.mapInputs }>
          <Grid>
            <Row>
              <Col xs={6}>
                <Input label='Name (in Vietnamese)' name="nameVN" value={ formData.nameVN } required/>
              </Col>
              <Col xs={6}>
                <Input label='Name (in English)' name="nameEN" value={ formData.nameEN } required/>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <RichEditor label='Description (in Vietnamese) ' name="descVN" value={ formData.descVN }/>
              </Col>
              <Col xs={6}>
                <RichEditor label='Description (in English) ' name="descEN" value={ formData.descEN }/>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Dropdown name='categoryID' label='Category'
                  options={ categories }
                  value={ formData.categoryID } />
              </Col>
              <Col xs={6}>
                <Dropdown name='salesType' label='Sales type'
                  options={ salesTypes }
                  value={ formData.salesType } />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <DatePicker name='availableUntil' label='Available Until'
                    value={formData.availableUntil} />
              </Col>
              <Col xs={4}>
                <Dropdown name='facingDirection' label='Facing direction'
                  options={ directions }
                  value={ formData.facingDirection } />
              </Col>
              <Col xs={4}>
                <FormGroup>
                  <ControlLabel>Number of bed rooms</ControlLabel>
                  <IntegerInput name="bedRoomCount"
                    value={ formData.bedRoomCount }/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Size (width x length)</ControlLabel>
                  <Row>
                    <Col xs={6}>
                      <IntegerInput name="sizeWidth" value={ formData.sizeWidth }
                      />
                    </Col>
                    <Col xs={6}>
                      <IntegerInput name="sizeLength" value={ formData.sizeLength }
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Rental Period</ControlLabel>
                  <Row>
                    <Col xs={6}>
                      <IntegerInput name="rentalPeriodValue" value={ formData.rentalPeriodValue }
                      />
                    </Col>
                    <Col xs={6}>
                      <Dropdown name='rentalPeriodUnit' placeholder='Rental period unit'
                        options={ rentalPeriods }
                        value={ formData.rentalPeriodUnit }
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <FormGroup>
                  <ControlLabel>Price (VND)</ControlLabel>
                  <FloatInput name="priceVN" value={ formData.priceVN }
                  />
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup>
                  <ControlLabel>Price (USD)</ControlLabel>
                  <FloatInput name="priceEN" value={ formData.priceEN }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={5}>
                    <AddressInput name='addressVN' label='address (VN)' value={ formData.addressVN }
                      onMarkerClicked={ this.trackLocationOnMap }/>
                  </Col>
                  <Col xs={5}>
                    <AddressInput name='addressEN' label='address (EN)' value={ formData.addressEN }
                      onMarkerClicked={ this.trackLocationOnMap }/>
                  </Col>
                  <Col xs={2}>
                    <Checkbox name='addressVisible' value={ formData.addressVisible }>Hide this information from visistors</Checkbox>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <LocationMap center={ this.mapCenter } zoom={ this.mapZoom }
                  circleMarker={ this.mapCircleMarker }
                  onClick={ this.setCircleMarker }/>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <Checkbox name='visible' value={ formData.visible }>Display this property to the visistors</Checkbox>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div style={{ height: 52 }}>
                  <Button type="submit" text='Save' disabled={ this.isFetching }>
                  </Button>
                </div>
              </Col>
            </Row>
          </Grid>
        </Formsy.Form>
      </div>
    )
  }
}

PropertyForm.propTypes = {
  formData: React.PropTypes.object.isRequired,
  categories: React.PropTypes.array.isRequired,
}

export default PropertyForm

