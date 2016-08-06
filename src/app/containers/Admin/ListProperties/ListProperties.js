import React from 'react'


import PropertyList from 'components/PropertyList/PropertyList'
import SearchBar from 'components/SearchBar/SearchBar'
import PropertyListTable from 'components/PropertyListTable/PropertyListTable'


class AdminPropertyList extends React.Component {

  static fetchData({ store }) {
    return store.properties.find()
  }

  render() {
    return (
      <div>
        <PropertyListTable />
      </div>
    )
  }
}

export default AdminPropertyList
