import * as React from 'react'
import { Carousel } from 'react-bootstrap'
import Slogan from '../Slogan/Slogan'

const s = require('./Slider.less')

function Slider(props) {
  return (
    <div className={ s.container }>
      <div className={ s.box }>
        <Slogan text={ props.title } />
      </div>
      <Carousel className={ s.slider }>
        {
          props.images.map((image, i) => (
            <Carousel.Item>
              <img width='100%' alt='900x500' src={ image } />
            </Carousel.Item>
          ))
        }
      </Carousel>
    </div>
  );
}

export default Slider
