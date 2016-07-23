import React from 'react'
import PropertyList from '../components/PropertyList/PropertyList'
import SearchBar from '../components/SearchBar/SearchBar'
import Info from '../components/Info/Info'
import Map from '../components/Map/Map'


class Home extends React.Component {
  render() {
    return (
      <div>
        <SearchBar></SearchBar>
        <PropertyList></PropertyList>
       
        <Map />
      </div>
    )
  }
}

export default Home
