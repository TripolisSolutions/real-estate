import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'
import { FormControl, InputGroup, FormGroup, Button } from 'react-bootstrap'
import { connect } from 'mobx-connect'

const s = require('./AddressInput.less')

function Input(props) {
  function onChange(e) {
    props.setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  function onMarkerClicked() {
    if (!props.onMarkerClicked) {
      return
    }

    props.onMarkerClicked(props.getValue())
  }

  return (
    <FormGroup>
      <InputGroup>
        <FormControl className={ s.container } type="text" placeholder={ props.placeholder }
          onChange={ onChange }/>
        <InputGroup.Button>
          <Button onClick={ onMarkerClicked }>
            <i className='fa fa-map-marker'/>
          </Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  )
}

Input.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onMarkerClicked: React.PropTypes.func,
}


export default FormsyElement()(connect(Input))
