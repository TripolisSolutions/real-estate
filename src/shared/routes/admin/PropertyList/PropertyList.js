import React from 'react'
import { connect } from 'mobx-connect'

import PropertyList from 'components/PropertyList/PropertyList'
import SearchBar from 'components/SearchBar/SearchBar'

@connect
class AdminPropertyList extends React.Component {

  static fetchData(store) {
    return store.propertiesStore.find()
  }

  render() {
    return (
      <div>
        <PropertyList />
      </div>
    )
  }
}

export default AdminPropertyList
