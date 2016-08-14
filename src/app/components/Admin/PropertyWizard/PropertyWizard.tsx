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

  public refs: {
    [key: string]: any
    multistep: any
  }

  constructor(props: IInternalProps) {
    super(props)

    const prop = props.property || {} as IProperty

    if (props.property) {
      const prop = this.props.property
      props.state.basicInfoFormData = {
        title_in_vietnamese: translateText(prop.name, 'vi'),
        title_in_english: translateText(prop.name, 'en'),
        category: prop.categoryID,
        sale_type: prop.salesType,
        available_until: prop.availableUntil,
        facing_direction: prop.facingDirection,
        bed_room_count: prop.bedRoomCount,
      }

      if (prop.price) {
        props.state.basicInfoFormData.price_in_vnd = translatePrice(prop.price, 'VND')
        props.state.basicInfoFormData.price_in_usd = translatePrice(prop.price, 'USD')
      }

      if (prop.rentalPeriod) {
        props.state.basicInfoFormData.rental_period_value = prop.rentalPeriod.digits
        props.state.basicInfoFormData.rental_period_unit = prop.rentalPeriod.unit
      }

      if (prop.size) {
        props.state.basicInfoFormData.size_width = prop.size.width
        props.state.basicInfoFormData.size_length = prop.size.length
      }
    } else {
      props.state.basicInfoFormData = {
        title_in_vietnamese: '',
        title_in_english: '',
      }
    }

    // if (!props.state.thumbnailImage && prop.thumbnailImage) {
    props.state.thumbnailImage = prop.thumbnailImage
    // }
    // if (!props.state.galleryImages && prop.galleryImages) {
    props.state.galleryImages = prop.galleryImages || []
    // }
    // if (!props.state.descVN && translateText(prop.desc, 'vi')) {
    props.state.descVN = translateText(prop.desc, 'vi')
    // }
    // if (!props.state.descEN && translateText(prop.desc, 'en')) {
    props.state.descEN = translateText(prop.desc, 'en')
    // }
    // if (!props.state.mapViewport && prop.address && prop.address.viewport) {
    props.state.mapViewport = (prop.address || {} as any).viewport
    // }
    // if (!props.state.mapMarker && prop.address && prop.address.circleMarker) {
    props.state.mapMarker = (prop.address || {} as any).circleMarker
    // }
    // if (!props.state.addressVisible && prop.address && prop.address.visible) {
    props.state.addressVisible = (prop.address || {} as any).visible || false
    // }
    // if (!props.state.addressVN && prop.address && translateText(prop.address.name, 'vi')) {
    props.state.addressVN = translateText((prop.address || {} as any).name, 'vi')
    // }
    // if (!props.state.addressEN && prop.address && translateText(prop.address.name, 'en')) {
    props.state.addressEN = translateText((prop.address || {} as any).name, 'en')
    // }
  }

  public render() {
    const { t, dispatch, state } = this.props

    const isCreate = !this.props.property

    const steps: IStep[] = [
      {
        name: t('step_basic_info'),
        component: (
          <StepBasicInfo
            langCode={ this.props.langCode }
            formData={ state.basicInfoFormData }
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
          onNext={ () => {
            this.refs.multistep.next()
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
          onNext={ () => {
            this.refs.multistep.next()
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
            images={ state.galleryImages }
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
          isCreate={ isCreate }
          onSubmit={ () => {
            log.info('basicInfoFormData: ', state.basicInfoFormData)
            const object = {}
            const property = object as IProperty
            const outProperty = bindBasicInfoToProperty(property, state.basicInfoFormData)

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
              visible: state.addressVisible,
            }

            if (state.mapViewport) {
              outProperty.address.viewport = state.mapViewport
            }
            if (state.mapMarker) {
              outProperty.address.circleMarker = state.mapMarker
            }

            log.info('wizard property: ', outProperty)

            this.props.onWizardDone(outProperty)
        } } />,
      },
    ]

    return (
      <div>
        <Multistep ref='multistep' showNavigation={false} steps={ steps }
          onNavigated={ (step, index) => {
            if (step.name === t('step_address_location')) {
              setTimeout(() => {
                const gmap = document.getElementById('realestateGMap')
                window.google.maps.event.trigger(gmap, 'resize')
              }, 100)
            }
          }}
        />
      </div>
    )
  }
}

export default enhance(translate()(PropertyWizard))
