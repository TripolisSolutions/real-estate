import * as update from 'react/lib/update'
import * as React from 'react'
import * as log from 'loglevel'
import { SFC } from 'react'
import * as urljoin from 'url-join'
import * as c from 'classnames'
import { Image } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'
import { Row } from 'react-bootstrap'
import withReducer from 'recompose/withReducer'

import UploadImageModal from '../../../UploadImageModal/UploadImageModal'

import { IImage } from '../../../../redux/modules/images/images.model'

const s = require('./StepSelectThumbnail.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  initialImage?: IImage
  onImageUploaded(image: IImage)
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

  const onImageUploaded = (image: IImage) => {
    log.debug('uploaded image: ', image)
    props.dispatch({type: 'IMAGE_UPLOADED', payload: image})

    props.onImageUploaded(image)
  }

  const { t } = props

  const image = props.initialImage || props.state.image

  return (
    <div>
      {
        image ? (
          <Image src={
            urljoin(window.__CONFIG__.imageRootUrl, image.fileName)
          } thumbnail className={ s.imageHolder }
            onClick={ showUploadImageModal }
          />
        ) : (
          <div className={ c('well', s.imageHolder) } onClick={ showUploadImageModal }>
            { t('upload_image') }
          </div>
        )
      }
      <form>
        <fieldset>
          <Row layout='horizontal'>
            <input className='btn btn-primary'
              formNoValidate={ true } type='button' defaultValue='Ok'
              onClick={ props.onNext }
            />
          </Row>
        </fieldset>
      </form>
      <UploadImageModal
        show={ props.state.showModel }
        onImageUploaded={ onImageUploaded }
        onHideClicked={ hideUploadImageModal }
      />
    </div>
  )
}

export default enhance(translate()(StepBasicInfo))
