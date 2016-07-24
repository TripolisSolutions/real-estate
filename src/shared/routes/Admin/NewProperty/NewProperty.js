import React from 'react'
import { connect } from 'mobx-connect'
import { observable } from 'mobx'
import log from 'loglevel'

import PropertyForm from 'components/Admin/PropertyForm/PropertyForm'

@connect
class PropertyNew extends React.Component {

  @observable isFetching = false

  static fetchData({ state, store }) {
    log.debug('PropertyDetail.fetchData state: ', state)
    return store.properties.prepareForm()
  }

  createProperty = (data) => {
    this.isFetching = true

    this.context.store.properties.create(data).then((resp) => {
      log.debug('resp: ', resp)
      this.isFetching = false

      this.context.router.push(`/admin/properties/${ resp.doc.id }`)
    })
  }

  render() {
    const { store } = this.context

    const formData = {
      addressVisible: true
    }

    const categories = store.categories.options

    return (
      <PropertyForm formData={ formData } categories={ categories }
        isFetching={ this.isFetching }
        onSave={ this.createProperty }/>
    )
  }
}

export default PropertyNew
