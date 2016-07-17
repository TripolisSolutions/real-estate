import React from 'react'
import { connect } from 'mobx-connect'
import FRC from 'formsy-react-components'
import find from 'lodash/fp/find'
import log from 'loglevel'

import PropertyForm from 'components/Admin/PropertyForm/PropertyForm'

@connect
class PropertyDetail extends React.Component {

  static fetchData({ state, store }) {
    log.debug('PropertyDetail.fetchData state: ', state)
    return store.properties.prepareForm()
  }

  render() {
    const { store } = this.context

    const formData = {
    }

    // const categories = state.categories.items.map( (item) => ({value: item.id, label: localize(item.name)}))
    const categories = store.categories.options

    return (
      <PropertyForm formData={ formData } categories={ categories }/>
    )
  }
}

export default PropertyDetail
