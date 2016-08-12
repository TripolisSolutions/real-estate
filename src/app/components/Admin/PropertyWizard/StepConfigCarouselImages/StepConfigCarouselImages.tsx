import * as update from 'react/lib/update'
import * as React from 'react'
import * as log from 'loglevel'
import { SFC } from 'react'
import * as urljoin from 'url-join'
import * as c from 'classnames'
import { translate, InjectedTranslateProps } from 'react-i18next'
import {
  Grid, Row, Col, Image, Button,
} from 'react-bootstrap'
import withReducer from 'recompose/withReducer'

const s = require('./StepConfigCarouselImages.less')

import UploadImageModal from '../../../UploadImageModal/UploadImageModal'

import { IImage } from '../../../../redux/modules/images/images.model'

interface IProps extends InjectedTranslateProps {
  langCode: string
  imageRootUrl: string
  images: IImage[]
  onChange(images: IImage[])
  onNext()
}

interface IState {
  images?: IImage[]
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
    case 'REMOVE_IMAGE':
      state = update(state, {
        images: {
          $set: action.images,
        },
      })
      return update(state, {
        images: {
          $splice: [[action.payload, 1]],
        },
      })
    case 'IMAGE_UPLOADED':
      return update(state, {
        images: {
          $push: [action.payload],
        },
        showModel: {
          $set: false,
        },
      })
    case 'SET_IMAGES':
      return update(state, {
        images: {
          $set: action.payload,
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
  const { t } = props

  let images: IImage[] = []
  if (props.state.images) {
    images = props.state.images
  } else if (props.images) {
    images = props.images
  }

  return (
    <div>
      <Grid>
        <Row>
          <Col xs={6} md={4}>
            <div className={ c('well', s.imageHolder) } onClick={ () => props.dispatch({type: 'SHOW_MODAL'}) }>
              { t('upload_image') }
            </div>
          </Col>
          {
            images.map( (image, i) => (
              <Col xs={6} md={4}>
                <Image src={
                  urljoin(props.imageRootUrl, image.fileName)
                 }/>
                 <Button bsStyle='danger'
                  onClick={ () => props.dispatch({type: 'REMOVE_IMAGE', payload: i, images}) }
                 >Remove</Button>
              </Col>
            ))
          }
        </Row>
        <Row>
          <form>
            <fieldset>
              <Row>
                <input className='btn btn-primary'
                  formNoValidate={ true } type='button' defaultValue={ t('ok') }
                  onClick={ props.onNext }
                />
              </Row>
            </fieldset>
          </form>
        </Row>
      </Grid>
      <UploadImageModal
        show={ props.state.showModel }
        onImageUploaded={ (image) => props.dispatch({type: 'IMAGE_UPLOADED', payload: image}) }
        onHideClicked={ () => props.dispatch({type: 'HIDE_MODAL'}) }
      />
    </div>
  );
}

export default enhance(translate()(StepBasicInfo))
