import * as update from 'react/lib/update'
import * as React from 'react'
import * as log from 'loglevel'
import { SFC } from 'react'
import * as urljoin from 'url-join'
import * as c from 'classnames'
import { Image } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'
import {
  Grid, Row, Col,
} from 'react-bootstrap'
import withReducer from 'recompose/withReducer'


import UploadImageModal from '../../../UploadImageModal/UploadImageModal'


import { IImage } from '../../../../redux/modules/images/images.model'

const s = require('./StepSelectThumbnail.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  imageRootUrl: string
  image?: IImage
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

  const onImageUploaded = (images: IImage[]) => {
    log.debug('uploaded image: ', images)
    props.dispatch({type: 'IMAGE_UPLOADED', payload: images[0]})

    props.onImageUploaded(images[0])
  }

  const { t } = props

  const image = props.state.image || props.image

  return (
    <div>
      <Grid>
        <Row>
          <Col xs={12}>
            {
              image ? (
                <Image src={
                  urljoin(props.imageRootUrl, image.fileName)
                } thumbnail className={ s.imageHolder }
                  onClick={ showUploadImageModal }
                />
              ) : (
                <div className={ c('well', s.imageHolder) } onClick={ showUploadImageModal }>
                  { t('upload_image') }
                </div>
              )
            }
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <fieldset>
              <input className='btn btn-primary'
                formNoValidate={ true } type='button' defaultValue={ t('ok') }
                onClick={ props.onNext }
              />
            </fieldset>
          </Col>
        </Row>
      </Grid>
      <UploadImageModal
        uploadImageUrl='/api/thumbnails/upload'
        multiple={ false }
        show={ props.state.showModel }
        onImageUploaded={ onImageUploaded }
        onHideClicked={ hideUploadImageModal }
      />
    </div>
  )
}

export default enhance(translate()(StepBasicInfo))
