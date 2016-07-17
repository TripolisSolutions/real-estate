import React from 'react'
import PropertyList from '../components/PropertyList/PropertyList'
import SearchBar from '../components/SearchBar/SearchBar'
import Info from '../components/Info/Info'
import LocationMap from '../components/LocationMap/LocationMap'


class Home extends React.Component {
  render() {
    return (
      <div>
        <SearchBar></SearchBar>
        <PropertyList></PropertyList>
        <Info />
        <LocationMap />
      </div>
    )
  }
}

export default Home
