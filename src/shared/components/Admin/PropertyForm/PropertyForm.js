import React from 'react'
import FRC from 'formsy-react-components'
import {Decorator as FormsyElement} from 'formsy-react'
import find from 'lodash/fp/find'
import log from 'loglevel'

import Input from 'components/FormElements/Input/Input'
import Textarea from 'components/FormElements/Textarea/Textarea'
import LanguageSelector from 'components/FormElements/LanguageSelector/LanguageSelector'

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
      <div>
        <Formsy.Form onSubmit={ submit }>
          <LanguageSelector name="language" value={ formData.language }
            onChange={ (newLanguage) => store.changeAdminLanguage(newLanguage) }/>
          <Input name="name" value={ formData.name }
            onChange={ (value) => store.updateAdminPropertyValue('name', value) }/>
          <Textarea name="desc" value={ formData.desc }
            onChange={ (value) => store.updateAdminPropertyValue('desc', value) }/>
          <button>Save</button>
        </Formsy.Form>
      </div>
    </div>
  )
}

PropertyEdit.propTypes = {
  formData: React.PropTypes.object.isRequired,
}

export default observer(PropertyEdit)

