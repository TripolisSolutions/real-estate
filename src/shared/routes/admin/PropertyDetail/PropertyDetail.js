import React from 'react'
import FRC from 'formsy-react-components'
import {Decorator as FormsyElement} from 'formsy-react'
import find from 'lodash/fp/find'
import log from 'loglevel'

import PropertyEdit from 'components/Admin/PropertyForm/PropertyForm'

const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File } = FRC

import { observer } from 'shared/context'

@observer
class PropertyDetail extends React.Component {

  static fetchData(store, params) {
    log.debug('PropertyDetail.fetchData store: ', store)
    if (params.id === 'new') {
      return store.loadAdminPropertyCreate()
    }
    return store.propertiesStore.get(params.id)
  }

  render() {
    const store = this.context.store
    const formData = store.adminFormCreateProperty

    return (
      <PropertyEdit formData={ formData } />
    )
  }
}

export default PropertyDetail
