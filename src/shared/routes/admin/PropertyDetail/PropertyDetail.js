import React from 'react'
import FRC from 'formsy-react-components'
import {Decorator as FormsyElement} from 'formsy-react'
import find from 'lodash/fp/find'
import log from 'loglevel'

import MyInput from 'components/FormElements/Input/Input'
import Textarea from 'components/FormElements/Textarea/Textarea'
import LanguageSelector from 'components/FormElements/LanguageSelector/LanguageSelector'

const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File } = FRC

import { observer } from 'shared/context'


@observer
class PropertyDetail extends React.Component {

  static fetchData(store, params) {
    log.debug('PropertyDetail.fetchData store: ', store)
    if (params.id === 'new') {
      return store.resetAdminCreatePropertyPage()
    }
    return store.propertiesStore.get(params.id)
  }

  submit(model) {
    console.log('model', model)
  }

  render() {
    const store = this.context.store
    const property = store.adminPages.create.data
    const language = store.adminPages.selectedLanguage

    log.debug('language', language)
    log.debug('property.name', property.name)
    log.debug('find({language: store.language})(property.name)', find({language: language})(property.name))
    const name = find({language: language})(property.name).text

    return (
      <div>
        <div>
          <Formsy.Form onSubmit={ this.submit }>
            <LanguageSelector name="language" value={ language } />
            <MyInput name="name" value={ name }/>
            <Textarea name="desc" value="123"/>
            <button>Save</button>
          </Formsy.Form>
        </div>
      </div>
    );
  }
}

export default PropertyDetail
