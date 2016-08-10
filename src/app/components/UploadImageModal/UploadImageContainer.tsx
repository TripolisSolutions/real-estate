import * as React from 'react'
import * as log from 'loglevel'
import { SFC } from 'react'
import withReducer from 'recompose/withReducer'

import { translate, InjectedTranslateProps } from 'react-i18next'

import { IImage } from '../../redux/modules/images/images.model'
import UploadImagePanel, { IProps as IUploadImagePanelProps } from './UploadImagePanel'

export interface IProps {
  onImageUploaded(image: IImage)
}

interface IState {
  isUploading: boolean
}

interface IInternalProps extends InjectedTranslateProps, IUploadImagePanelProps, IProps, React.Props<any> {
  state: IState
  dispatch: Function
}

const reducer = (state: IState, action) => {
  log.debug('action: ', action)
  switch (action.type) {
    case 'UPLOAD':
      return {
        isUploading: true,
      }
    case 'UPLOAD_SUCCESS':
      return {
        isUploading: false,
      }
    case 'UPLOAD_FAILURE':
      return {
        isUploading: false,
      }
    default:
      return state
  }
}

const enhance = withReducer<IState, any, IProps>('state', 'dispatch', reducer, {
  isUploading: false,
})

const UploadImagePanelContainer: SFC<IProps> = (props: IInternalProps) => {
  const onFileDrop = (files: File[]) => {
    if (files.length < 1) {
      return
    }

    const file = files[0]

    props.dispatch({
      type: 'UPLOAD',
      payload: file,
    })

    const data = new FormData()
    data.append('file', file)

    fetch('/thumbnails/upload', {
      method: 'POST',
      body: data,
    })
    .then((res) => res.json())
    .then((res) => {
      props.dispatch({
        type: 'UPLOAD_SUCCESS',
        payload: res,
      })
      props.onImageUploaded(res)
    })
    .catch((error) => props.dispatch({
      type: 'UPLOAD_FAILURE',
      payload: file,
      error: error,
    }))
  }

  return (
    <UploadImagePanel
      onFilesDrop={ onFileDrop }
      isUploading={ props.isUploading }
    />
  )
}

const container = enhance(translate()(UploadImagePanelContainer))

export default container
