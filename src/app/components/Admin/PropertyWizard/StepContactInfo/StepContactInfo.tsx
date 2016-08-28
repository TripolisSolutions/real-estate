import * as update from 'react/lib/update'
import * as React from 'react'
import * as log from 'loglevel'
import { SFC } from 'react'
import * as urljoin from 'url-join'
import * as _ from 'lodash'
// import * as c from 'classnames'
import { Image } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'
import {
  Row, Col,
} from 'react-bootstrap'
import { Form } from 'formsy-react'
import { Input } from 'formsy-react-components'

import ContactInfo from './ContactInfo'

import UploadImageModal from '../../../UploadImageModal/UploadImageModal'

import { IImage } from '../../../../redux/modules/images/images.model'

const s = require('./StepContactInfo.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  imageRootUrl: string
  image1: IImage
  owner_name1: string
  owner_phone1: string
  onImage1Uploaded(image: IImage)
  onInfo1Change(ownerName: string, ownerPhone: string)

  image2: IImage
  owner_name2: string
  owner_phone2: string
  onImage2Uploaded(image: IImage)
  onInfo2Change(ownerName: string, ownerPhone: string)

  onNext()
}

const StepBasicInfo: SFC<IProps> = (props: IProps) => {
  const { t } = props

  return (
    <div className={'container-fluid'}>
      <div className='row-fluid'>
        <Col xs={12}>

          <ContactInfo
            langCode={ props.langCode }
            imageRootUrl={ props.imageRootUrl }
            image={ props.image1 }
            owner_name={ props.owner_name1 }
            owner_phone={ props.owner_phone1 }
            onImageUploaded={ props.onImage1Uploaded }
            onInfoChange={ props.onInfo1Change }
          />

          <ContactInfo
            langCode={ props.langCode }
            imageRootUrl={ props.imageRootUrl }
            image={ props.image2 }
            owner_name={ props.owner_name2 }
            owner_phone={ props.owner_phone2 }
            onImageUploaded={ props.onImage2Uploaded }
            onInfoChange={ props.onInfo2Change }
          />

          <Row>
            <Col xs={8} xsPush={ 3 }>
              <fieldset>
                <input className='btn btn-primary'
                  formNoValidate={ true } type='button' defaultValue={ t('ok') }
                  onClick={ props.onNext }
                />
              </fieldset>
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  )
}

export default translate()(StepBasicInfo)
