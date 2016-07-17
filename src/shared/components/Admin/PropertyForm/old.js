import React from 'react'
import FRC from 'formsy-react-components'
import find from 'lodash/fp/find'
import log from 'loglevel'

import Input from 'components/FormElements/Input/Input'
import Textarea from 'components/FormElements/Textarea/Textarea'
import Dropdown from 'components/FormElements/Dropdown/Dropdown'
import LanguageSelector from 'components/FormElements/LanguageSelector/LanguageSelector'
import DatePicker from 'components/FormElements/DatePicker/DatePicker'

import {
  Grid, Row, Col,
  FormGroup, ControlLabel, FormControl, HelpBlock,
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
                <ControlLabel>Name</ControlLabel>
                <Input name="name" value={ formData.name }
          onChange={ (value) => store.updateAdminPropertyValue('name', value) }/>
                <FormControl.Feedback />
                <HelpBlock>This field is required</HelpBlock>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Tieu De</ControlLabel>
                <Input name="name" value={ formData.name }
          onChange={ (value) => store.updateAdminPropertyValue('name', value) }/>
                <FormControl.Feedback />
                <HelpBlock>Bat buoc phai nhap</HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <Textarea name="desc" value={ formData.desc }
                  onChange={ (value) => store.updateAdminPropertyValue('desc', value) }/>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Mieu ta</ControlLabel>
                <Textarea name="desc" value={ formData.desc }
                  onChange={ (value) => store.updateAdminPropertyValue('desc', value) }/>
              </FormGroup>
            </Col>
          </Row>
        </Grid>

        <Input name="name" value={ formData.name }
          onChange={ (value) => store.updateAdminPropertyValue('name', value) }/>
        <Textarea name="desc" value={ formData.desc }
          onChange={ (value) => store.updateAdminPropertyValue('desc', value) }/>
        <Dropdown name='category_id' title='Category'
          options={ formData.categories }
          value={ formData.categoryID }
          onChange={ (value) => store.updateAdminPropertyValue('category_id', value) }
          />
        <DatePicker name='available_until'/>
        <button>Save</button>
      </Formsy.Form>
    </div>
  )
}

PropertyEdit.propTypes = {
  formData: React.PropTypes.object.isRequired,
}

export default observer(PropertyEdit)

