import React from 'react'
import log from 'loglevel'
import { connect } from 'mobx-connect'
import { observable, extendObservable } from 'mobx'
import request from 'axios'
import { fitBounds } from 'google-map-react/utils'

import Input from 'components/FormElements/Input/Input'
import IntegerInput from 'components/FormElements/IntegerInput/IntegerInput'
import FloatInput from 'components/FormElements/FloatInput/FloatInput'
import AddressInput from 'components/FormElements/AddressInput/AddressInput'
import RichEditor from 'components/FormElements/RichEditor/RichEditor'
import Dropdown from 'components/FormElements/Dropdown/Dropdown'
import DatePicker from 'components/FormElements/DatePicker/DatePicker'
import LocationMap from 'components/LocationMap/LocationMap'
import Button from 'components/Button/Button'

import {
  Grid, Row, Col,
  FormGroup, ControlLabel, FormControl, HelpBlock,
  Checkbox
} from 'react-bootstrap'

function formDataToProperty(form) {

}

@connect
class PropertyEdit extends React.Component {

  @observable mapCenter // {lat: 10.7859378, lng: 106.5255811}
  @observable mapZoom // 10
  @observable mapCircleMarker// {lat, lng, radius}

  constructor(props) {
    super(props)
  }

  submit = (data) => {
    log.debug('submit', data)
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
        <Formsy.Form onSubmit={ this.submit }>
          <Grid>
            <Row>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Name (in Vietnamese)</ControlLabel>
                  <Input name="nameVN" value={ formData.nameVN }/>
                  <FormControl.Feedback />
                  <HelpBlock>This field is required</HelpBlock>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup
                  controlId="formBasicText"
                >
                  <ControlLabel>Name (in English)</ControlLabel>
                  <Input name="nameEN" value={ formData.nameEN }/>
                  <FormControl.Feedback />
                  <HelpBlock>This field is required</HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Description (in Vietnamese)</ControlLabel>
                  <RichEditor name="descVN" value={ formData.descVN }/>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>Description (in English)</ControlLabel>
                  <RichEditor name="descEN" value={ formData.descEN }/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Category</ControlLabel>
                  <Dropdown name='categoryID' title='Category'
                    options={ categories }
                    value={ formData.categoryID } />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Sales type</ControlLabel>
                  <Dropdown name='salesType' title='Sales type'
                    options={ salesTypes }
                    value={ formData.salesType } />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Available Until</ControlLabel>
                  <DatePicker name='availableUntil'
                    value={formData.availableUntil} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Facing direction</ControlLabel>
                  <Dropdown name='facingDirection' title='Facing direction'
                    options={ directions }
                    value={ formData.facingDirection } />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Number of bed rooms</ControlLabel>
                  <IntegerInput name="bedRoomCount"
                    value={ formData.bedRoomCount }/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Size (width x length)</ControlLabel>
                  <Row>
                    <Col xs={2}>
                      <IntegerInput name="sizeWidth" value={ formData.sizeWidth }
                      />
                    </Col>
                    <Col xs={2}>
                      <IntegerInput name="sizeLength" value={ formData.sizeLength }
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Rental Period</ControlLabel>
                  <Row>
                    <Col xs={2}>
                      <IntegerInput name="rentalPeriodValue" value={ formData.rentalPeriodValue }
                      />
                    </Col>
                    <Col xs={2}>
                      <Dropdown name='rentalPeriodUnit' title='Rental period unit'
                        options={ rentalPeriods }
                        value={ formData.categoryID }
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
                <FormGroup>
                  <ControlLabel>Address</ControlLabel>
                  <Row>
                    <Col xs={5}>
                      <AddressInput name='addressVN' value={ formData.addressVN }
                        onMarkerClicked={ this.trackLocationOnMap }/>
                    </Col>
                    <Col xs={5}>
                      <AddressInput name='addressEN' value={ formData.addressEN }
                        onMarkerClicked={ this.trackLocationOnMap }/>
                    </Col>
                    <Col xs={2}>
                      <Checkbox>Hide this information from visistors</Checkbox>
                    </Col>
                  </Row>
                </FormGroup>
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
                  <Checkbox>Display this property to the visistors</Checkbox>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div style={{ height: 52 }}>
                  <Button type="submit" text='Save'>
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

PropertyEdit.propTypes = {
  formData: React.PropTypes.object.isRequired,
  categories: React.PropTypes.object.isRequired,
}

export default PropertyEdit

