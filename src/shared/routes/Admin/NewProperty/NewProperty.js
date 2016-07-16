import React from 'react'
import { connect } from 'mobx-connect'
import FRC from 'formsy-react-components'
import {Decorator as FormsyElement} from 'formsy-react'
import find from 'lodash/fp/find'
import log from 'loglevel'

import PropertyForm from 'components/Admin/PropertyForm/PropertyForm'

const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File } = FRC

function locale(language) {
  return function(field) {
    return find({language})(field).text
  }
}

@connect
class PropertyDetail extends React.Component {

  static fetchData({ state, store }) {
    log.debug('PropertyDetail.fetchData state: ', state)
    return store.properties.prepareForm()
  }

  render() {
    const { state } = this.context
    const { language } = state

    const localize = locale(language)

    const formData = {
    }

    const categories = state.categories.items.map( (item) => ({value: item.id, label: localize(item.name)}))

    return (
      <PropertyForm formData={ formData } categories={ categories }/>
    )
  }
}

export default PropertyDetail
