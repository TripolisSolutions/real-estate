import * as React from 'react'
import { Link } from 'react-router'

import Option from './Option/Option'

const s = require('./PropertyItem.less')

function PropertyItem(props) {
  return (
    <Link to='/properties/:id'>
      <div className={ s.container } >
        <div>
          <img alt='property' src='http://ghk.h-cdn.co/assets/cm/15/11/54ff82282ac26-living-room-green-window-de.jpg' />
        </div>
        <div className={ s.info }>
          <h2> { props.title } </h2>
          <div className={ s.options }>
            <Option icon='bed' text='Beds' value='4' />
            <Option icon='arrows-alt' text='Square' value='4' />
            <Option icon='map-marker' text='District' value='4' />
            <Option icon='usd' text='Bed' value='4' />
            <Option icon='clock-o' text='Aviable' value='4' />
            <Option icon='hourglass-start' text='Day for rent' value='4' />
          </div>
        </div>
      </div>
    </Link>
  )
}

// PropertyItem.propTypes = {
//   title: React.PropTypes.string.isRequired,
//   img: React.PropTypes.string,
// }

export default PropertyItem
