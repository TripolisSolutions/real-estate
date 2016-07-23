import React from 'react'
import PropertyList from '../../components/PropertyList/PropertyList'
import SearchBar from '../../components/SearchBar/SearchBar'
import Info from '../../components/Info/Info'
import Map from '../../components/Map/Map'


class Home extends React.Component {
  render() {
    return (
      <div>
        <SearchBar></SearchBar>
        <PropertyList></PropertyList>
        <Info btnText={ 'More info' }>
          <h1>
            "We chose this site based on its reputation for building high quality homes while providing incredible customer service."
          </h1>
        </Info>
        <Map />
      </div>
    )
  }
}

export default Home
