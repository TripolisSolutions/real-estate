import * as React from 'react'

import Block from '../../components/Block/Block'
import PropertyList from '../../components/PropertyList/PropertyList'
import SearchBar from '../../components/SearchBar/SearchBar'
import Info from '../../components/Info/Info'
import LocationMap from '../../components/LocationMap/LocationMap'

class Home extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <SearchBar></SearchBar>
        <PropertyList></PropertyList>
        <div className={ 'container' }>
          <Block>
            <Info btnText={ 'More info' }>
              <h1>
                "We chose this site based on its reputation for building high quality homes while providing incredible customer service."
              </h1>
            </Info>
          </Block>
        </div>
        <LocationMap />
      </div>
    )
  }
}

export default Home
