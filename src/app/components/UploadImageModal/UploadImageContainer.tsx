import * as React from 'react'
import * as log from 'loglevel'
import { SFC } from 'react'
import withReducer from 'recompose/withReducer'

import { translate, InjectedTranslateProps } from 'react-i18next'

import { IImage } from '../../redux/modules/images/images.model'
import { token } from '../../helpers/auth'
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
  uploadImageUrl: string
  multiple: boolean
  onImageUploaded(images: IImage[])
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
  const onFilesDrop = (files: File[]) => {
    if (files.length < 1) {
      return
    }

    props.dispatch({
      type: 'UPLOAD',
    })

    // const dimensions = Promise.all(files.map((file) => getDimension(window.URL.createObjectURL(file))))

    const data = new FormData()

    if (props.multiple) {
      files.map((file) => {
        data.append('files[]', file)
      })
    } else {
      const file = files[0]
      data.append('file', file)
    }

    fetch(props.uploadImageUrl, {
      method: 'POST',
      headers: {
        'x-access-token': token(),
      },
      body: data,
    })
    .then((res) => res.json())
    .then((res) => {
      props.dispatch({
        type: 'UPLOAD_SUCCESS',
        payload: res,
      })

      if (props.multiple) {
        props.onImageUploaded(res)
      } else {
        props.onImageUploaded([res])
      }
    })
    .catch((error) => props.dispatch({
      type: 'UPLOAD_FAILURE',
      error: error,
    }))
  }

  return (
    <UploadImagePanel
      multiple={ props.multiple }
      onFilesDrop={ onFilesDrop }
      isUploading={ props.isUploading }
    />
  )
}

const container = enhance(translate()(UploadImagePanelContainer))

export default container
