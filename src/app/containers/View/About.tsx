import * as React from 'react'
import { Col as BootstrapCol} from 'react-bootstrap'

import * as classnames from 'classnames'

import LocationMap from '../../components/LocationMap/LocationMap'
import Block from '../../components/Block/Block'

const s = require('./About.less')

class About extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div className={ 'container' } >
          <Block title={ 'About us' } bigger ={ true }>
            <div className={ classnames(s.img, 'row' ) } >
              <BootstrapCol md={6}>
                  <h2>Sonia Phương Trân</h2>
                  <img src="http://www.incrediblethings.com/wp-content/uploads/2012/12/Alexa-Meade-Milk-Paintings-1.jpg" />
              </BootstrapCol>
              <BootstrapCol md={6}>
                  <h2>Dean Walkerden</h2>
                  <img src="http://4.bp.blogspot.com/-IrNv1zLJw-0/UIbGDQXXsmI/AAAAAAAAAGU/DjxOORCM0Lg/s1600/emma-hack_Car_shape_human_body_painting_interesting_art_sculpture.jpg" />
              </BootstrapCol>
            </div>
            <div className= { s.text }>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in eleifend ipsum. Duis hendrerit turpis et sapien hendrerit, et convallis ligula ultrices. Integer venenatis venenatis neque non feugiat. Maecenas pretium nisi a pharetra malesuada. Sed bibendum lorem eu elit mattis pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed fermentum dapibus nibh, eget commodo ante porttitor ut. Suspendisse pulvinar, magna id pulvinar mattis, tellus purus faucibus lorem, non porttitor neque massa quis odio. Duis lobortis suscipit nunc, id consectetur nisl vestibulum at. Curabitur id dui lacinia, porttitor ex vitae, sollicitudin lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent vel metus porttitor elit tincidunt rutrum eget a leo. Nulla facilisi. Praesent ut sollicitudin mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in eleifend ipsum. Duis hendrerit turpis et sapien hendrerit, et convallis ligula ultrices. Integer venenatis venenatis neque non feugiat. Maecenas pretium nisi a pharetra malesuada. Sed bibendum lorem eu elit mattis pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed fermentum dapibus nibh, eget commodo ante porttitor ut. Suspendisse pulvinar, magna id pulvinar mattis, tellus purus faucibus lorem, non porttitor neque massa quis odio. Duis lobortis suscipit nunc, id consectetur nisl vestibulum at. Curabitur id dui lacinia, porttitor ex vitae, sollicitudin lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent vel metus porttitor elit tincidunt rutrum eget a leo. Nulla facilisi. Praesent ut sollicitudin mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in eleifend ipsum. Duis hendrerit turpis et sapien hendrerit, et convallis ligula ultrices. Integer venenatis venenatis neque non feugiat. Maecenas pretium nisi a pharetra malesuada. Sed bibendum lorem eu elit mattis pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed fermentum dapibus nibh, eget commodo ante porttitor ut. Suspendisse pulvinar, magna id pulvinar mattis, tellus purus faucibus lorem, non porttitor neque massa quis odio. Duis lobortis suscipit nunc, id consectetur nisl vestibulum at. Curabitur id dui lacinia, porttitor ex vitae, sollicitudin lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent vel metus porttitor elit tincidunt rutrum eget a leo. Nulla facilisi. Praesent ut sollicitudin mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            </div>
          </Block>
        </div>
        <LocationMap />
      </div>
    );
  }
}

export default About
