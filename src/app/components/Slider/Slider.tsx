import * as React from 'react'
import { Carousel } from 'react-bootstrap'

const s = require('./Slider.less')

class Slider extends React.Component<any, any> {

  public render() {
    return(
      <div className={ s.container }>
        <div className={ s.box }>
          <span>Nice to meet you</span>
        </div>
        <Carousel className={ s.slider }>
          <Carousel.Item>
            <img width='100%' alt='900x500' src='http://ghk.h-cdn.co/assets/cm/15/11/54ff82282ac26-living-room-green-window-de.jpg'/>
          </Carousel.Item>
          <Carousel.Item>
            <img width='100%' alt='900x500' src='http://www.uum.org.my/wp-content/uploads/2016/05/s-ac2562875c06eae6cf546b0c0cf10b6f47311b47.jpg'/>
          </Carousel.Item>
          <Carousel.Item>
            <img width='100%' alt='900x500' src='http://www.beeyoutifullife.com/wp-content/uploads/2014/12/mid-century-modern-rugs-Living-Room-Modern-with-none-.jpg'/>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Slider
