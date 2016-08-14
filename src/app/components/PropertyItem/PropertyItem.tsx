import * as React from 'react'
import { Link } from 'react-router'
import sanitizeUrl from '../../helpers/sanitizeUrl'
import Option from './Option/Option'

import { formatDate } from '../../helpers/date'

import { ITranslatablePrice } from '../../redux/models'

const s = require('./PropertyItem.less')

interface IProps {
  currency: string
  id: string
  title: string
  bedRoomCount?: number
  size?: {
    width: number
    length: number
  }
  district?: string
  price?: ITranslatablePrice[]
  available?: string | Date
  facingDirection?: string
}

function PropertyItem(props: IProps) {
  return (
    <Link to={'/properties/${ props.id }/${ sanitizeUrl(props.title) }'}>
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
