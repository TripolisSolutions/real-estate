import * as React from 'react'
import ImageGallery from 'react-image-gallery'

import 'react-image-gallery/src/image-gallery.scss'


class Slider extends React.Component<any, any> {
  render() {
    return (
      <div className={'container'}>
        <ImageGallery items= { ['1', '2'] } /> 
      </div> 
    )
  }
}

export default Slider
