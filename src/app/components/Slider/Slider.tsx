import * as React from 'react'
import { Carousel } from 'react-bootstrap'
import Slogan from '../Slogan/Slogan'

const s = require('./Slider.less')

interface IProps {
  title?: string
  images: string[]
}

function Slider(props: IProps) {
  return (
    <div className={ s.container }>
      <div className={ s.box }>
        <Slogan text={ props.title } />
      </div>
      <Carousel className={ s.slider }>
        {
          props.images.map((image, i) => (
            <Carousel.Item key={ image }>
              <img width='100%' alt='900x500' src={ image } />
            </Carousel.Item>
          ))
        }
      </Carousel>
    </div>
  );
}

export default Slider
