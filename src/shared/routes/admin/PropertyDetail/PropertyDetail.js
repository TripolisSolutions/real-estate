import React from 'react'
import FRC from 'formsy-react-components'
import {Decorator as FormsyElement} from 'formsy-react'

import MyInput from 'components/FormElements/Input/Input'
import Textarea from 'components/FormElements/Textarea/Textarea'
import LanguageSelector from 'components/FormElements/LanguageSelector/LanguageSelector'

const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File } = FRC

import { observer } from 'shared/context'


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
          <Formsy.Form onSubmit={ this.submit }>
            <LanguageSelector name="language" value="vietnamese" />
            <MyInput name="name" value="abc"/>
            <Textarea name="desc" value="123"/>
            <button>Save</button>
          </Formsy.Form>
        </div>
      </div>
    );
  }
}

export default PropertyDetail
