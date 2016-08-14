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

  private onFileDrop = (files: File[]) => {
    this.props.onFilesDrop(files)
  }

  public render() {
    const { t } = this.props

    return (
      <Dropzone ref='dropzone' onDrop={this.onFileDrop} accept='image/*' className={ s.dropzone }>
        <div className='row'>
          <div className={'col-lg-3 col-md-4 col-xs-6 ' + s.thumb }>
            {
              this.props.isUploading ? (
                <div>Uploading</div>
              ) : (
                <div className={ c('thumbnail', s.uploadImageBtn) }>
                  <i className='fa fa-plus' aria-hidden='true'></i>
                  { t('upload_image') }
                </div>
              )
            }
          </div>
        </div>
      </Dropzone>
    )
  }
}

export default translate()(UploadImagePanel)
