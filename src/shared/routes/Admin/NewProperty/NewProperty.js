import React from 'react'
import { connect } from 'mobx-connect'
import log from 'loglevel'

import PropertyForm from 'components/Admin/PropertyForm/PropertyForm'

@connect
class PropertyNew extends React.Component {

  static fetchData({ state, store }) {
    log.debug('PropertyDetail.fetchData state: ', state)
    return store.properties.prepareForm()
  }

  render() {
    const { store } = this.context

    const formData = {
      addressVisible: true
    }

    const categories = store.categories.options

    return (
      <PropertyForm formData={ formData } categories={ categories }/>
    )
  }
}

export default PropertyNew
