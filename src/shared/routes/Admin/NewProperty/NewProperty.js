import React from 'react'
import { connect } from 'mobx-connect'
import FRC from 'formsy-react-components'
import {Decorator as FormsyElement} from 'formsy-react'
import find from 'lodash/fp/find'
import log from 'loglevel'

import PropertyForm from 'components/Admin/PropertyForm/PropertyForm'

const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File } = FRC

@connect
class PropertyDetail extends React.Component {

  static fetchData({ state, store }) {
    log.debug('PropertyDetail.fetchData state: ', state)
    return store.properties.prepareForm()
  }

  render() {
    const { state } = this.context

    const formData = {
      categories: state.categories.items
      
    } 

    return (
      <PropertyForm formData={ formData } />
    )
  }
}

export default PropertyDetail
