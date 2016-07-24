import React from 'react'
import { Col as BootstrapCol} from 'react-bootstrap'

import Block from '../../components/Block/Block'
import LocationMap from '../../components/LocationMap/LocationMap'
import Info from '../../components/Info/Info'

const s = require('./PropertyDetail.less')

class PropertyDetail extends React.Component {
  render() {
    return (
      <div>
        <div className={ 'container' } >
          <Info btnText={ 'Contact Us' }>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in eleifend ipsum. Duis hendrerit turpis et sapien hendrerit, et convallis ligula ultrices. Integer venenatis venenatis neque non feugiat. Maecenas pretium nisi a pharetra malesuada. Sed bibendum lorem eu elit mattis pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed fermentum dapibus nibh, eget commodo ante porttitor ut. Suspendisse pulvinar, magna id pulvinar mattis, tellus purus faucibus lorem, non porttitor neque massa quis odio. Duis lobortis suscipit nunc, id consectetur nisl vestibulum at. Curabitur id dui lacinia, porttitor ex vitae, sollicitudin lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent vel metus porttitor elit tincidunt rutrum eget a leo. Nulla facilisi. Praesent ut sollicitudin mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in eleifend ipsum. Duis hendrerit turpis et sapien hendrerit, et convallis ligula ultrices. Integer venenatis venenatis neque non feugiat. Maecenas pretium nisi a pharetra malesuada. Sed bibendum lorem eu elit mattis pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed fermentum dapibus nibh, eget commodo ante porttitor ut. Suspendisse pulvinar, magna id pulvinar mattis, tellus purus faucibus lorem, non porttitor neque massa quis odio. Duis lobortis suscipit nunc, id consectetur nisl vestibulum at. Curabitur id dui lacinia, porttitor ex vitae, sollicitudin lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent vel metus porttitor elit tincidunt rutrum eget a leo. Nulla facilisi. Praesent ut sollicitudin mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          </Info>
        </div>
        <LocationMap title={ 'Property location' }/>
      </div>
    )
  }
}

export default PropertyDetail
