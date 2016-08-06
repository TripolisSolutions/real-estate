import React from 'react'


import log from 'loglevel'

import PropertyForm from 'components/Admin/PropertyForm/PropertyForm'


class PropertyNew extends React.Component {

  @observable isFetching = false

  static fetchData({ store, params }) {
    return store.properties.prepareFormEdit(params.id)
  }

  updateProperty = (data) => {
    this.isFetching = true

    const id = this.context.state.propertyEdit.id
    log.debug('id: ', id)

    this.context.store.properties.update(id, data).then((resp) => {
      log.debug('resp: ', resp)
      this.isFetching = false

      this.context.router.push('/admin/properties')
    })
  }

  render() {
    const { store } = this.context

    const formData = store.properties.formEdit

    const categories = store.categories.options

    return (
      <PropertyForm formData={ formData } categories={ categories }
        isFetching={ this.isFetching }
        onSave={ this.updateProperty }/>
    )
  }
}

export default PropertyNew
