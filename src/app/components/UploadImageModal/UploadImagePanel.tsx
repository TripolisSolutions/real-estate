import * as React from 'react'
import * as c from 'classnames'
import * as Dropzone from 'react-dropzone'

import { translate, InjectedTranslateProps } from 'react-i18next'

const s = require('./UploadImagePanel.less')

export interface IProps extends InjectedTranslateProps, React.Props<any> {
  onFilesDrop(files: File[])
  isUploading: boolean
}

export class UploadImagePanel extends React.Component<IProps, void> {

  public refs: {
    [key: string]: any
    dropzone: any
  }

  private openSelectFile = () => {
    this.refs.dropzone.open()
  }

  private onFileDrop = (files: File[]) => {
    this.props.onFilesDrop(files)
  }

  public render() {
    const { t } = this.props

    return (
      <Dropzone ref='dropzone' onDrop={this.onFileDrop} accept='image/*' className={ s.dropzone }>
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-xs-6 thumb'>
            {
              this.props.isUploading ? (
                <div>Uploading</div>
              ) : (
                <a className={ c('thumbnail', s.uploadImageBtn) } href='javascript:void()'
                  onClick={ this.openSelectFile }
                >
                  <i className='fa fa-plus' aria-hidden='true'></i>
                  { t('upload_image') }
                </a>
              )
            }
          </div>
        </div>
      </Dropzone>
    )
  }
}

export default translate()(UploadImagePanel)
