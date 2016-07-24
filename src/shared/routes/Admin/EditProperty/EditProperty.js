import React from 'react'
import { connect } from 'mobx-connect'
import log from 'loglevel'

import PropertyForm from 'components/Admin/PropertyForm/PropertyForm'

@connect
class PropertyNew extends React.Component {

  static fetchData({ store, params }) {
    return store.properties.prepareEditForm(params.id)
  }

  render() {
    const { store } = this.context

    const formData = store.properties.formEdit

    const categories = store.categories.options

    return (
      <PropertyForm formData={ formData } categories={ categories }/>
    )
  }
}

export default PropertyNew
