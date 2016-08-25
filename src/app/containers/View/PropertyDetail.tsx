import * as update from 'react/lib/update'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Col, Row } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'
import * as Helmet from 'react-helmet'
// import * as log from 'loglevel'
import * as urljoin from 'url-join'

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');

import { triggerFetchCategories } from '../../redux/modules/categories/categories'
import { triggerFetchProperty } from '../../redux/modules/properties/properties'
import { IState } from '../../redux/reducers'

import { formatDate } from '../../helpers/date'
import { formatCurrency } from '../../helpers/currency'

import Block from '../../components/Block/Block'
import LocationMap from '../../components/LocationMap/LocationMap'
import Info from '../../components/Info/Info'
import Option from '../../components/PropertyItem/Option/Option'
import Slider from '../../components/Slider/Slider'
import ContactForm from '../ContactForm/ContactForm'

import { translatePrice, translateText } from '../../redux/models'

import configs from '../../configs'

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

  private componentDidUpdate() {
     window.scrollTo(0, 0)
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
    const props = this.props
    const { t } = this.props

    const { imageRootUrl, googleMapAPIKey } = configs()

    const currency = props.i18nData.currentCurrency
    const langCode = props.i18nData.currentLangCode

    const property = this.props.propertiesData.property

    const title = translateText(property.name, langCode)

    const imageUrls = property.galleryImages.map((image) => {
      return urljoin(imageRootUrl, image.fileName)
    })

    const price = translatePrice(property.price, currency)
    const size = property.size && property.size.area !== 0
      ? property.size.area : null

    return (
      <div>
        <Helmet title={ title }/>
        {
          imageUrls.length > 0 ? (
            <Slider title={ title } images={ imageUrls }/>
          ) : undefined
        }
        <div className={ 'container' } >
          <Block>
            <Row>
              <Col md={2} className={ s.created }>
                <label>{ t('created_date') } { formatDate(property.c_at) }</label>
              </Col>
              <Col md={10}>
                <Row className={ s.icons }>
                  <Option
                    icon='bed'
                    text={ t('detail_beds') }
                    value={ property.bedRoomCount }
                  />
                  <Option
                    icon='arrows-alt'
                    text={ t('detail_size') }
                    value={ size }
                  />
                  <Option
                    icon='map-signs'
                    text={ t('district') }
                    value={ property.address.district ? t(property.address.district) : null }
                  />
                  <Option
                    icon='clock-o'
                    text={ t('detail_available_until') }
                    value={ property.availableUntil ? formatDate(property.availableUntil) : null }
                  />
                  <Option
                    icon='hourglass-start'
                    text={ t('detail_facing_direction') }
                    value={ t(property.facingDirection) }
                  />
                  <Option
                    icon='usd'
                    text={ t('detail_price') }
                    value={ price ? formatCurrency(price, currency) : null }
                  />
                </Row>
              </Col>
            </Row>
          </Block>
          <Block upTitle={ true }>
            <Info
              btnText={ this.state.toggleBtn ? t('close_contact_form') : t('contact_us')}
              onClick={ this.handleClickContact }
              active={ this.state.toggleBtn }
            >
              <div dangerouslySetInnerHTML={{__html: translateText(property.desc, langCode) }}></div>
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
        {
          property.address && property.address.viewport && property.address.circleMarker ? (
            <LocationMap
              googleMapAPIKey={ googleMapAPIKey }
              title={ t('property_location') }
              lat={ property.address.viewport.lat }
              lng={ property.address.viewport.lng }
              zoom={ property.address.viewport.zoom }
              circleMarker={ property.address.circleMarker }
            />
          ) : undefined
        }
      </div>
    )
  }
}

export default PropertyDetail
