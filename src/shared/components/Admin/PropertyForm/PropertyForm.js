import React from 'react'
import FRC from 'formsy-react-components'
import find from 'lodash/fp/find'
import log from 'loglevel'

import Input from 'components/FormElements/Input/Input'
import Textarea from 'components/FormElements/Textarea/Textarea'
import Dropdown from 'components/FormElements/Dropdown/Dropdown'
import DatePicker from 'components/FormElements/DatePicker/DatePicker'

import {
  Grid, Row, Col,
  FormGroup, ControlLabel, FormControl, HelpBlock,
  Checkbox, Button,
} from 'react-bootstrap'

import { observer } from 'shared/context'

function PropertyEdit(props) {

  const { store } = this.context
  const { formData } = props

  function submit(model) {
    log.debug('submit model', model)

    store.saveProperty()
  }

  return (
    <div>
      <Formsy.Form onSubmit={ submit }>
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
                <Input name="name" value={ formData.nameEN }/>
                <FormControl.Feedback />
                <HelpBlock>This field is required</HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Description (in Vietnamese)</ControlLabel>
                <Textarea name="desc" value={ formData.descVN }/>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Description (in English)</ControlLabel>
                <Textarea name="desc" value={ formData.descEN }/>
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
                <Input name="bedRoomCount"
                  value={ formData.bedRoomCount }/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Size (length x width)</ControlLabel>
                <Row>
                  <Col xs={2}>
                    <Input name="name" value={ formData.name }
                      onChange={ (value) => store.updateAdminPropertyValue('name', value) }
                    />
                  </Col>
                  <Col xs={2}>
                    <Input name="name" value={ formData.name }
                      onChange={ (value) => store.updateAdminPropertyValue('name', value) }
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
                    <Input name="name" value={ formData.name }
                      onChange={ (value) => store.updateAdminPropertyValue('name', value) }
                    />
                  </Col>
                  <Col xs={2}>
                    <Dropdown name='rentalPeriodUnit' title='Rental period unit'
                      options={ formData.categories }
                      value={ formData.categoryID }
                      onChange={ (value) => store.updateAdminPropertyValue('category_id', value) }
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
                <Input name="name" value={ formData.name }
                  onChange={ (value) => store.updateAdminPropertyValue('name', value) }
                />
              </FormGroup>
            </Col>
            <Col xs={4}>
              <FormGroup>
                <ControlLabel>Price (USD)</ControlLabel>
                <Input name="name" value={ formData.name }
                  onChange={ (value) => store.updateAdminPropertyValue('name', value) }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <Row>
                  <Col xs={9}>
                    <Input name="name" value={ formData.name }
                      onChange={ (value) => store.updateAdminPropertyValue('name', value) }
                    />
                  </Col>
                  <Col xs={3}>
                    <Checkbox>Hide this information from visistors</Checkbox>
                  </Col>
                </Row>
              </FormGroup>
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
              <Button type="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Grid>
      </Formsy.Form>
    </div>
  )
}

PropertyEdit.propTypes = {
  formData: React.PropTypes.object.isRequired,
}

export default observer(PropertyEdit)

