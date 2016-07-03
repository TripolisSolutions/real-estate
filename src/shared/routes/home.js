import React from 'react'
import PropertyList from '../components/PropertyList/PropertyList'
import SearchBar from '../components/SearchBar/SearchBar'

class Home extends React.Component {
  render() {
    return (
      <div className={ 'container' }>
        <SearchBar></SearchBar>
        <PropertyList></PropertyList>
      </div>
    )
  }
}

export default Home
