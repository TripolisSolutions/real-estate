import * as React from 'react'
import * as log from 'loglevel'
import { SFC } from 'react'
import withReducer from 'recompose/withReducer'

import { translate, InjectedTranslateProps } from 'react-i18next'

import { IImage } from '../../redux/modules/images/images.model'
import UploadImagePanel, { IProps as IUploadImagePanelProps } from './UploadImagePanel'

interface IImageDimension {
  width: number
  height: number
}

function getDimension(imgUrl) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = function() {
        // `naturalWidth`/`naturalHeight` aren't supported on <IE9. Fallback to normal width/height
        // The natural size is the actual image size regardless of rendering.
        // The 'normal' width/height are for the **rendered** size.

        const width  = img.naturalWidth || img.width;
        const height = img.naturalHeight    || img.height

        // Do something with the width and height
        resolve({
          width, height,
        } as IImageDimension)
    }

    // Setting the source makes it start downloading and eventually call `onload`
    img.src = imgUrl
  })
}

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

    getDimension(window.URL.createObjectURL(file)).then((dimension: IImageDimension) => {
      const data = new FormData()
      data.append('file', file)
      data.append('width', dimension.width)
      data.append('height', dimension.height)

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
    })
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
