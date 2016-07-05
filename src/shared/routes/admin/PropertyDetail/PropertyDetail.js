import React from 'react'
import FRC from 'formsy-react-components'
import {Decorator as FormsyElement} from 'formsy-react'

const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } = FRC

import { observer } from '../../../context'

@FormsyElement()
class MyInput extends React.Component {
  render() {
    return (
      <div>
        <input value={this.props.getValue()} onChange={(e) => this.props.setValue(e.target.value)}/>
      </div>
    )
  }
}

@observer
class PropertyDetail extends React.Component {

  static fetchData(store, params) {
    if (params.id === 'new') {
      return store.propertiesStore.prepareNewProperty()
    }
    return store.propertiesStore.get(params.id)
  }

  submit(model) {
    console.log('model', model)
  }

  render() {
    const property = this.context.store.propertiesStore.propertyDetail

    return (
      <div>
        <div>
          <div>Vietnamese</div>
          <div>English</div>
        </div>
        <div>
          { JSON.stringify(property) }
        </div>
        <div>
          <Formsy.Form onSubmit={ this.submit }>
            <MyInput name="name" value="abc"/>
            <MyInput name="desc" value="123"/>
            <button>Save</button>
          </Formsy.Form>
        </div>
      </div>
    );
  }
}

export default PropertyDetail
