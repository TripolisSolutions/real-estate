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
  FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap'

const { Checkbox, CheckboxGroup, RadioGroup, Row, Select, File } = FRC

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
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
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

