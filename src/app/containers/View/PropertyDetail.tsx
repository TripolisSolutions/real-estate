import * as update from 'react/lib/update'
import * as React from 'react'
import { Col, Row } from 'react-bootstrap'

import Block from '../../components/Block/Block'
import LocationMap from '../../components/LocationMap/LocationMap'
import Info from '../../components/Info/Info'
import Option from '../../components/PropertyItem/Option/Option'
import Slider from '../../components/Slider/Slider'
import ContactForm from '../ContactForm/ContactForm'

const s = require('./PropertyDetail.less')


interface IPropertyDetailState {
  toggleBtn: boolean
}

class PropertyDetail extends React.Component<any, IPropertyDetailState> {

  constructor(props, context) {
    super(props, context)

    this.state = {
      toggleBtn: false,
    }
  }



  private handleClickContact = (e) => {
    this.setState(
      update(this.state, {
        toggleBtn: {
          $set: !this.state.toggleBtn,
        },
      })
    )
  }


  public render() {
    let images = [
      'http://www.uum.org.my/wp-content/uploads/2016/05/s-ac2562875c06eae6cf546b0c0cf10b6f47311b47.jpg',
      'http://ghk.h-cdn.co/assets/cm/15/11/54ff82282ac26-living-room-green-window-de.jpg',
      'http://www.beeyoutifullife.com/wp-content/uploads/2014/12/mid-century-modern-rugs-Living-Room-Modern-with-none-.jpg',
    ]
    return (
      <div>
        <Slider title={ 'Nice to meet you'} images={ images }/>
        <div className={ 'container' } >
          <Block>
            <Row>
              <Col md={2}>
                <label>Create date: jul 10 2016</label>
              </Col>
              <Col md={10}>
                <Row>
                  <Col md={1}>
                    <Option icon='bed' text='Beds' value='4' />
                  </Col>
                  <Col md={2}>
                    <Option icon='arrows-alt' text='Square' value='4' />
                  </Col>
                  <Col md={2}>
                    <Option icon='map-marker' text='District' value='4' />
                  </Col>
                  <Col md={2}>
                    <Option icon='usd' text='Bed' value='4' />
                  </Col>
                  <Col md={2}>
                    <Option icon='clock-o' text='Aviable' value='4' />
                  </Col>
                  <Col md={3}>
                    <Option icon='hourglass-start' text='Day for rent' value='4' />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={2}></Col>
              <Col md={9}>
                <Option icon='hourglass-start' text='Day for rent' value='4' />
              </Col>
            </Row>
          </Block>
          <Block>
            <Info btnText={ this.state.toggleBtn ? 'Close' : 'Contact Us'} onClick={ this.handleClickContact } active={ this.state.toggleBtn }>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in eleifend ipsum. Duis hendrerit turpis et sapien hendrerit, et convallis ligula ultrices. Integer venenatis venenatis neque non feugiat. Maecenas pretium nisi a pharetra malesuada. Sed bibendum lorem eu elit mattis pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed fermentum dapibus nibh, eget commodo ante porttitor ut. Suspendisse pulvinar, magna id pulvinar mattis, tellus purus faucibus lorem, non porttitor neque massa quis odio. Duis lobortis suscipit nunc, id consectetur nisl vestibulum at. Curabitur id dui lacinia, porttitor ex vitae, sollicitudin lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent vel metus porttitor elit tincidunt rutrum eget a leo. Nulla facilisi. Praesent ut sollicitudin mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in eleifend ipsum. Duis hendrerit turpis et sapien hendrerit, et convallis ligula ultrices. Integer venenatis venenatis neque non feugiat. Maecenas pretium nisi a pharetra malesuada. Sed bibendum lorem eu elit mattis pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed fermentum dapibus nibh, eget commodo ante porttitor ut. Suspendisse pulvinar, magna id pulvinar mattis, tellus purus faucibus lorem, non porttitor neque massa quis odio. Duis lobortis suscipit nunc, id consectetur nisl vestibulum at. Curabitur id dui lacinia, porttitor ex vitae, sollicitudin lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent vel metus porttitor elit tincidunt rutrum eget a leo. Nulla facilisi. Praesent ut sollicitudin mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            </Info>
            {
              this.state.toggleBtn ? (
                <div className={ s.contact }>
                  <ContactForm />
                </div>
              ) : undefined
            }
          </Block>
        </div>
        <LocationMap title={ 'Property location' }/>
      </div>
    )
  }
}

export default PropertyDetail
