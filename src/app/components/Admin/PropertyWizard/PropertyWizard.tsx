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
  imageRootUrl: string
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
    case 'THUMBNAIL_IMAGE':
      return update(state, {
        thumbnailImage: {
          $set: action.payload,
        },
      })
    case 'GALLERY_IMAGES':
      return update(state, {
        galleryImages: {
          $set: action.payload,
        },
      })
    case 'DESC_VN':
      return update(state, {
        descVN: {
          $set: action.payload,
        },
      })
    case 'DESC_EN':
      return update(state, {
        descEN: {
          $set: action.payload,
        },
      })
    case 'MAP_VIEWPORT':
      return update(state, {
        mapViewport: {
          $set: action.payload,
        },
      })
    case 'MAP_MARKER':
      return update(state, {
        mapMarker: {
          $set: action.payload,
        },
      })
    case 'ADDRESS_VISIBLE':
      return update(state, {
        addressVisible: {
          $set: action.payload,
        },
      })
    case 'ADDRESS_VN':
      return update(state, {
        addressVN: {
          $set: action.payload,
        },
      })
    case 'ADDRESS_EN':
      return update(state, {
        addressEN: {
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
          text: '',
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
    const { t, dispatch, state } = this.props

    const prop = this.props.property

    let basicInfoFormData: IBasicInfoFormData
    if (state.basicInfoFormData) {
      basicInfoFormData = state.basicInfoFormData
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

    if (!state.thumbnailImage && prop.thumbnailImage) {
      state.thumbnailImage = prop.thumbnailImage
    }
    if (!state.galleryImages && prop.galleryImages) {
      state.galleryImages = prop.galleryImages
    }
    if (!state.descVN && translateText(prop.desc, 'vi')) {
      state.descVN = translateText(prop.desc, 'vi')
    }
    if (!state.descEN && translateText(prop.desc, 'en')) {
      state.descEN = translateText(prop.desc, 'en')
    }
    if (!state.mapViewport && prop.address && prop.address.viewport) {
      state.mapViewport = prop.address.viewport
    }
    if (!state.mapMarker && prop.address && prop.address.circleMarker) {
      state.mapMarker = prop.address.circleMarker
    }
    if (!state.addressVisible && prop.address && prop.address.visible) {
      state.addressVisible = prop.address.visible || false
    }
    if (!state.addressVN && prop.address && translateText(prop.address.name, 'vi')) {
      state.addressVN = translateText(prop.address.name, 'vi')
    }
    if (!state.addressEN && prop.address && translateText(prop.address.name, 'en')) {
      state.addressEN = translateText(prop.address.name, 'en')
    }

    // let thumbnailImage: IImage = state.thumbnailImage
    // let galleryImages: IImage[] = state.galleryImages || []
    // let descVN: string = state.descVN
    // let descEN: string = state.descEN
    // let mapViewport: IMapViewport
    // let mapMarker: ICircleMarker
    // let addressVisible: boolean
    // let addressVN: string
    // let addressEN: string

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
          initialValue={ state.descVN || '' }
          onChange={ (content) => {
            dispatch({
              type: 'DESC_VN',
              payload: content,
            })
          } }
        />,
      },
      {
        name: t('step_description_english'),
        component: <StepDescription
          langCode={ this.props.langCode }
          initialValue={ state.descEN || '' }
          onChange={ (content) => {
            dispatch({
              type: 'DESC_EN',
              payload: content,
            })
          } }
        />,
      },
      {
        name: t('step_select_thumbnail'),
        component: (
          <StepSelectThumbnail
            langCode={ this.props.langCode }
            imageRootUrl={ this.props.imageRootUrl }
            image={ state.thumbnailImage }
            onImageUploaded={ (image) => {
              dispatch({
                type: 'THUMBNAIL_IMAGE',
                payload: image,
              })
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
            imageRootUrl={ this.props.imageRootUrl }
            images={ state.galleryImages || [] }
            onChange={ (images: IImage[]) => {
              dispatch({
                type: 'GALLERY_IMAGES',
                payload: images,
              })
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
            addressVN={ state.addressVN || '' }
            addressEN={ state.addressEN || '' }
            mapViewport={ state.mapViewport }
            mapMarker={ state.mapMarker }
            addressVisible={ state.addressVisible }
            onVisiblityChange={ (visible) => {
              dispatch({
                type: 'ADDRESS_VISIBLE',
                payload: visible,
              })
            }}
            onAddressChange={ (vn: string, en: string) => {
              dispatch({
                type: 'ADDRESS_VN',
                payload: vn,
              })
              dispatch({
                type: 'ADDRESS_EN',
                payload: en,
              })
            }}
            onMapDataChange={ (viewport: IMapViewport, marker: ICircleMarker) => {
              dispatch({
                type: 'MAP_VIEWPORT',
                payload: viewport,
              })
              dispatch({
                type: 'MAP_MARKER',
                payload: marker,
              })
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

            if (state.thumbnailImage) {
              log.info('thumbnailImage: ', state.thumbnailImage)
              outProperty.thumbnailImage = state.thumbnailImage
            }

            if (state.galleryImages) {
              log.info('galleryImages: ', state.galleryImages)
              outProperty.galleryImages = state.galleryImages
            }

            outProperty.desc = [
              {
                language: 'vietnamese',
                text: state.descVN,
              },
              {
                language: 'english',
                text: state.descEN,
              },
            ]

            outProperty.address = {
              name: [
                {
                  language: 'vietnamese',
                  text: state.addressVN,
                },
                {
                  language: 'english',
                  text: state.addressEN,
                },
              ],
              viewport: state.mapViewport,
              circleMarker: state.mapMarker,
              visible: state.addressVisible,
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
