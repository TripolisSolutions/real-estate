import * as React from 'react'
import ImageGallery from 'react-image-gallery'

import 'react-image-gallery/src/image-gallery.scss'


class Slider extends React.Component<any, any> {
  render() {
    return (
      <div className={'container'}>
        <ImageGallery showThumbnails={false} items= { [{ original:'http://www.pixelstalk.net/wp-content/uploads/2016/05/Laptop-Wallpapers-HD-For-Windows-10-HD.jpg'}, {original:'http://www.pixelstalk.net/wp-content/uploads/2016/05/Laptop-Wallpapers-HD-For-Windows-10-HD-Download.jpg'}] } /> 
      </div> 
    )
  }
}

export default Slider
