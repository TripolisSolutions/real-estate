import * as update from 'react/lib/update'
import * as React from 'react'
import { Col, Row } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../redux/modules/categories/categories'
import { triggerFetchProperty } from '../../redux/modules/properties/properties'
import { IState } from '../../redux/reducers'

import { formatDate } from '../../helpers/date'

import Block from '../../components/Block/Block'
import LocationMap from '../../components/LocationMap/LocationMap'
import Info from '../../components/Info/Info'
import Option from '../../components/PropertyItem/Option/Option'
import Slider from '../../components/Slider/Slider'
import ContactForm from '../ContactForm/ContactForm'

const s = require('./PropertyDetail.less')

interface IProps extends IState, InjectedTranslateProps {
}

@translate()
@asyncConnect([{
  promise: ({ store: { dispatch }, params: { id } }) => {
    return Promise.all([
      dispatch(triggerFetchCategories()),
      dispatch(triggerFetchProperty(id)),
    ])
  },
}])
@connect(
  state => state
)
class PropertyDetail extends React.Component<IProps, {
  toggleBtn: boolean
}> {
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
    const { t } = this.props

    const property = this.props.propertiesData.property

    const imageUrls = property.galleryImages.map((image) => {
      return image.url
    })

    return (
      <div>
        {
          imageUrls.length > 0 ? (
            <Slider title={ 'Nice to meet you'} images={ imageUrls }/>
          ) : undefined
        }
        <div className={ 'container' } >
          <Block>
            <Row>
              <Col md={2}>
                <label>{ t('created_date') } { formatDate(property.c_at) }</label>
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
