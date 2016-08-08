import * as React from 'react'
import * as log from 'loglevel'
import * as c from 'classnames'

import {
  Button,
  Modal,
} from 'react-bootstrap'

import { translate, InjectedTranslateProps } from 'react-i18next'

import ImageManager, { IProps as IImageManagerProps } from './ImageManager'

interface IProps extends IImageManagerProps, InjectedTranslateProps, React.Props<any> {
  show: boolean
  onHideClicked()
}

export class ImageManagerModal extends React.Component<IProps, void> {

  public render() {
    const { t } = this.props

    return (
      <Modal show={ this.props.show } onHide={ this.props.onHideClicked }>
        <Modal.Header closeButton>
          <Modal.Title>{ t('image_gallery') }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageManager
            images={ this.props.images }
            onFilesDrop={ this.props.onFilesDrop }
            isUploading={ this.props.isUploading }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHideClicked}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default translate()(ImageManagerModal)
