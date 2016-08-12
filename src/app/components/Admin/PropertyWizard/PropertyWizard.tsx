import * as React from 'react'
import * as log from 'loglevel'
import * as update from 'react/lib/update'
import withReducer from 'recompose/withReducer'

import { translate, InjectedTranslateProps } from 'react-i18next'

import Multistep, { IStep } from './ReactMultistep/ReactMultistep'
import './ReactMultistep/prog-tracker.less'

import { ICategory } from '../../../redux/modules/categories/categories.model'
import { IProperty, IMapViewport, ICircleMarker } from '../../../redux/modules/properties/properties.model'
import { translatePrice, translateText } from '../../../redux/models'

import StepBasicInfo from './StepBasicInfo/StepBasicInfo'
import { IFormData as IBasicInfoFormData } from './StepBasicInfo/StepBasicInfo'
import { IImage } from '../../../redux/modules/images/images.model'

import StepSelectThumbnail from './StepSelectThumbnail/StepSelectThumbnail'
import StepDescription from './StepDescription/StepDescription'
import StepConfigCarouselImages from './StepConfigCarouselImages/StepConfigCarouselImages'
import StepAddressLocation from './StepAddressLocation/StepAddressLocation'
import StepDone from './StepDone/StepDone'

import { bindBasicInfoToProperty } from './converter'

interface IProps extends InjectedTranslateProps, React.Props<any> {
  langCode: string
  property?: IProperty
  googleMapAPIKey: string
  categories: ICategory[]
  onWizardDone(cat: ICategory)
}

interface IState {
  basicInfoFormData?: IBasicInfoFormData
  thumbnailImage?: IImage
  galleryImages?: IImage[]
  descVN: string
  descEN: string
  mapViewport?: IMapViewport
  mapMarker?: ICircleMarker
  addressVisible: boolean
  addressVN: string
  addressEN: string
}

const reducer = (state: IState, action) => {
  switch (action.type) {
    case 'BASIC_INFO':
      return update(state, {
        basicInfoFormData: {
          $set: action.payload,
        },
      })
    default:
      return state
  }
}

const enhance = withReducer<IState, any, IProps>('state', 'dispatch', reducer, {
  descVN: '',
  descEN: '',
  addressVisible: false,
  addressVN: '',
  addressEN: '',
})

interface IInternalProps extends IProps {
  state?: IState
  dispatch?: Function
}

export class PropertyWizard extends React.Component<IInternalProps, void> {

  public static defaultProps = {
    langCode: 'vi',
    property: {
      name: [
        {
          language: 'vietnamese',
          text: 'ddd',
        },
        {
          language: 'english',
          text: '',
        },
      ],
    },
  }

  public refs: {
    [key: string]: any
    multistep: any
  }

  public render() {
    const { t, dispatch } = this.props

    let basicInfoFormData: IBasicInfoFormData
    if (this.props.state.basicInfoFormData) {
      basicInfoFormData = this.props.state.basicInfoFormData
    } else {
      const prop = this.props.property
      basicInfoFormData = {
        title_in_vietnamese: translateText(prop.name, 'vi'),
        title_in_english: translateText(prop.name, 'en'),
        category: prop.categoryID,
        sale_type: prop.salesType,
        available_until: prop.availableUntil,
        facing_direction: prop.facingDirection,
        bed_room_count: prop.bedRoomCount,
      }

      if (prop.price) {
        basicInfoFormData.price_in_vnd = translatePrice(prop.price, 'VND')
        basicInfoFormData.price_in_usd = translatePrice(prop.price, 'USD')
      }

      if (prop.rentalPeriod) {
        basicInfoFormData.rental_period_value = prop.rentalPeriod.digits
        basicInfoFormData.rental_period_unit = prop.rentalPeriod.unit
      }

      if (prop.size) {
        basicInfoFormData.size_width = prop.size.width
        basicInfoFormData.size_length = prop.size.length
      }
    }

    let thumbnailImage: IImage
    let galleryImages: IImage[]
    let descVN: string
    let descEN: string
    let mapViewport: IMapViewport
    let mapMarker: ICircleMarker
    let addressVisible: boolean
    let addressVN: string
    let addressEN: string

    const object = {}
    const property = object as IProperty

    const steps: IStep[] = [
      {
        name: t('step_basic_info'),
        component: (
          <StepBasicInfo
            langCode={ this.props.langCode }
            formData={ basicInfoFormData }
            categories={ this.props.categories }
            onChange={ (formData) => {
              dispatch({
                type: 'BASIC_INFO',
                payload: formData,
              })
            }}
            onSubmit={ (formData) => {
              this.refs.multistep.next()
            }}
          />
        ),
      },
      {
        name: t('step_description_vietnamese'),
        component: <StepDescription
          langCode={ this.props.langCode }
          initialValue={ '' }
          onChange={ (content) => {
            descVN = content
          } }
        />,
      },
      {
        name: t('step_description_english'),
        component: <StepDescription
          langCode={ this.props.langCode }
          initialValue={ '' }
          onChange={ (content) => {
            descEN = content
          } }
        />,
      },
      {
        name: t('step_select_thumbnail'),
        component: (
          <StepSelectThumbnail
            langCode={ this.props.langCode }
            onImageUploaded={ (image) => {
              thumbnailImage = image
            }}
            onNext={ () => {
              this.refs.multistep.next()
            } }
          />
        ),
      },
      {
        name: t('step_config_carousel_images'),
        component: (
          <StepConfigCarouselImages
            langCode={ this.props.langCode }
            images={ [] }
            onChange={ (images: IImage[]) => {
              galleryImages = images
            }}
            onNext={ () => {
              this.refs.multistep.next()
            } }
          />
        ),
      },
      {
        name: t('step_address_location'),
        component: (
          <StepAddressLocation
            googleMapAPIKey={ this.props.googleMapAPIKey }
            langCode={ this.props.langCode }
            onVisiblityChange={ (visible) => {
              addressVisible = visible
            }}
            onAddressChange={ (vn: string, en: string) => {
              addressVN = vn
              addressEN = en
            }}
            onMapDataChange={ (viewport: IMapViewport, marker: ICircleMarker) => {
              mapViewport = viewport
              mapMarker = marker
            }}
            onNext={ () => {
              this.refs.multistep.next()
            } }
          />
        ),
      },
      {
        name: t('step_done'),
        component: <StepDone langCode={ this.props.langCode }
          onSubmit={ () => {
            log.info('basicInfoFormData: ', basicInfoFormData)
            const outProperty = bindBasicInfoToProperty(property, basicInfoFormData)

            if (thumbnailImage) {
              log.info('thumbnailImage: ', thumbnailImage)
              outProperty.thumbnailImage = thumbnailImage
            }

            if (galleryImages) {
              log.info('galleryImages: ', galleryImages)
              outProperty.galleryImages = galleryImages
            }

            outProperty.desc = [
              {
                language: 'vietnamese',
                text: descVN,
              },
              {
                language: 'english',
                text: addressEN,
              },
            ]

            outProperty.address = {
              name: [
                {
                  language: 'vietnamese',
                  text: addressVN,
                },
                {
                  language: 'english',
                  text: addressEN,
                },
              ],
              viewport: mapViewport,
              circleMarker: mapMarker,
              visible: addressVisible,
            }

            log.info('wizard property: ', outProperty)

            this.props.onWizardDone(outProperty)
        } } />,
      },
    ]

    return (
      <div>
        <Multistep ref='multistep' showNavigation={false} steps={ steps }/>
      </div>
    )
  }
}

export default enhance(translate()(PropertyWizard))
