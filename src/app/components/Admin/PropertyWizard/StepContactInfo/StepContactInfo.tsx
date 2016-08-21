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
import withReducer from 'recompose/withReducer'


import UploadImageModal from '../../../UploadImageModal/UploadImageModal'


import { IImage } from '../../../../redux/modules/images/images.model'

const s = require('./StepContactInfo.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  imageRootUrl: string
  image: IImage
  owner_name: string
  owner_phone: string
  onImageUploaded(image: IImage)
  onInfoChange(ownerName: string, ownerPhone: string)
  onNext()
}

interface IState {
  image?: IImage
  showModel: boolean
}

const reducer = (state: IState, action) => {
  log.debug('action: ', action)
  switch (action.type) {
    case 'SHOW_MODAL':
      return update(state, {
        showModel: {
          $set: true,
        },
      })
    case 'HIDE_MODAL':
      return update(state, {
        showModel: {
          $set: false,
        },
      })
    case 'IMAGE_UPLOADED':
      return update(state, {
        image: {
          $set: action.payload,
        },
        showModel: {
          $set: false,
        },
      })
    default:
      return state
  }
}

const enhance = withReducer<IState, any, IProps>('state', 'dispatch', reducer, {
  showModel: false,
})

interface IInternalProps extends IProps {
  state: IState
  dispatch: Function
}

const StepBasicInfo: SFC<IProps> = (props: IInternalProps) => {

  const showUploadImageModal = () => {
    props.dispatch({type: 'SHOW_MODAL'})
  }

  const hideUploadImageModal = () => {
    props.dispatch({type: 'HIDE_MODAL'})
  }

  const onImageUploaded = (images: IImage[]) => {
    log.debug('uploaded image: ', images)
    props.dispatch({type: 'IMAGE_UPLOADED', payload: images[0]})

    props.onImageUploaded(images[0])
  }

  const { t } = props

  const image = props.state.image || props.image

  return (
    <div className={'container-fluid well span6 ' + s.container}>
      <div className='row-fluid'>
        <Col xs={2}>
          <Image src={
            image.url ? image.url : urljoin(props.imageRootUrl, image.fileName)
          } circle className={ 'img-circle' }
            onClick={ showUploadImageModal }
          />
        </Col>
        <Col xs={8}>
          <Form
              className='horizontal'
              onChange={ _.debounce((data) => {
                props.onInfoChange(data.owner_name, data.owner_phone)
              }, 300)}
            >
              <fieldset>
                <Input
                  name='owner_name'
                  defaultValue={ props.owner_name }
                  label={ t('owner_name') }
                  type='text'
                  placeholder={ t('owner_name') }
                />
                <Input
                  name='owner_phone'
                  defaultValue={ props.owner_phone }
                  label={ t('owner_phone') }
                  type='text'
                  placeholder={ t('owner_phone') }
                />
              </fieldset>
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
            </Form>
        </Col>
      </div>
      <UploadImageModal
        uploadImageUrl='/api/avatar/upload'
        multiple={ false }
        show={ props.state.showModel }
        onImageUploaded={ onImageUploaded }
        onHideClicked={ hideUploadImageModal }
      />
    </div>
  )
}

export default enhance(translate()(StepBasicInfo))
