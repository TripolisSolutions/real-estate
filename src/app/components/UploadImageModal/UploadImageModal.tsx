import * as React from 'react'

import {
  Button,
  Modal,
} from 'react-bootstrap'

import { translate, InjectedTranslateProps } from 'react-i18next'

import UploadImagePanel, { IProps as IUploadImagePanelProps } from './UploadImageContainer'

interface IProps extends IUploadImagePanelProps, InjectedTranslateProps, React.Props<any> {
  show: boolean
  onHideClicked()
}

export class ImageManagerModal extends React.Component<IProps, void> {

  public render() {
    const { t } = this.props

    return (
      <Modal show={ this.props.show } onHide={ this.props.onHideClicked }>
        <Modal.Header closeButton>
          <Modal.Title>{ t('upload_image') }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadImagePanel
            uploadImageUrl={ this.props.uploadImageUrl }
            multiple={ this.props.multiple }
            onImageUploaded={ this.props.onImageUploaded }
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
