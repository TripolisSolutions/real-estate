import * as React from 'react'
import * as log from 'loglevel'

import { translate, InjectedTranslateProps } from 'react-i18next'

import Multistep, { IStep } from './ReactMultistep/ReactMultistep'
import './ReactMultistep/prog-tracker.less'

import { ICategory } from '../../../redux/modules/categories/categories.model'
import { IProperty } from '../../../redux/modules/properties/properties.model'

import StepBasicInfo from './StepBasicInfo/StepBasicInfo'
import { IFormData as IBasicInfoFormData } from './StepBasicInfo/StepBasicInfo'
import { IImage } from '../../../redux/modules/images/images.model'

import StepSelectThumbnail from './StepSelectThumbnail/StepSelectThumbnail'
import StepDescription from './StepDescription/StepDescription'
import StepConfigCarouselImages from './StepConfigCarouselImages/StepConfigCarouselImages'
import StepDone from './StepDone/StepDone'

import { bindBasicInfoToProperty } from './converter'

interface IProps extends InjectedTranslateProps, React.Props<any> {
  langCode: string
  categories: ICategory[]
  onWizardDone(cat: ICategory)
}

export class PropertyWizard extends React.Component<IProps, void> {

  public refs: {
    [key: string]: any
    multistep: any
  }

  public render() {
    const { t } = this.props

    let basicInfoFormData: IBasicInfoFormData
    let thumbnailImage: IImage
    let galleryImages: IImage[]
    let descVN: string
    let descEN: string

    const object = {}
    const property = object as IProperty

    const steps: IStep[] = [
      {
        name: t('step_basic_info'),
        component: (
          <StepBasicInfo
            langCode={ this.props.langCode }
            categories={ this.props.categories }
            onChange={ (formData) => {
              basicInfoFormData = formData
            }}
            onSubmit={ (formData) => {
              basicInfoFormData = formData
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

export default translate()(PropertyWizard)
