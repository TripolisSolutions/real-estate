import * as update from 'react/lib/update'
import * as React from 'react'
import * as log from 'loglevel'
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
      return update(state, {
        images: {
          $splice: [[action.payload, 1]],
        },
      })
    case 'IMAGES_UPLOADED':
      return update(state, {
        images: {
          $push: action.payload,
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
  state?: IState
  dispatch?: Function
}

export class StepConfigCarouselImages extends React.Component<IInternalProps, void> {

  constructor(props: IInternalProps) {
    super(props)

    props.state.images = props.images || []
  }

  public render() {
    const props = this.props
    const { t } = this.props

    const images = this.props.state.images

    return (
      <div>
        <Grid>
          <Row>
            <Col md={4}>
              <div className={ c('well', s.imageHolder) } onClick={ () => props.dispatch({type: 'SHOW_MODAL'}) }>
                { t('upload_image') }
              </div>
            </Col>
            <Col md={8} className={ s.image }>
              {
                images.map( (image, i) => (
                  <Col key={ image.id } md={4} >
                    <Image src={
                      urljoin(props.imageRootUrl, image.fileName)
                    }/>
                    <Button bsStyle='danger'
                      onClick={ () => {
                        props.onChange(update(props.state, {
                          images: {
                            $splice: [[i, 1]],
                          },
                        }).images)
                        props.dispatch({type: 'REMOVE_IMAGE', payload: i})
                      }}
                    >Remove</Button>
                  </Col>
                ))
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
          show={ props.state.showModel }
          uploadImageUrl='/api/gallery/upload'
          multiple={ true }
          onImageUploaded={ (images) => {
            props.onChange(props.state.images.concat(images))

            props.dispatch({type: 'IMAGES_UPLOADED', payload: images})
          }}
          onHideClicked={ () => props.dispatch({type: 'HIDE_MODAL'}) }
        />
      </div>
    );
  }
}

export default enhance(translate()(StepConfigCarouselImages))
