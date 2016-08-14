import * as React from 'react'
import { Link } from 'react-router'
import sanitizeUrl from '../../helpers/sanitizeUrl'
import Option from './Option/Option'
import { translate, InjectedTranslateProps } from 'react-i18next'

import { formatDate } from '../../helpers/date'
import { formatCurrency } from '../../helpers/currency'

import { ITranslatablePrice, translatePrice } from '../../redux/models'

const s = require('./PropertyItem.less')

interface IProps extends InjectedTranslateProps {
  currency: string
  id: string
  title: string
  imageUrl: string
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
  const t = props.t

  const price = translatePrice(props.price, props.currency)
  const size = props.size && props.size.length !== 0 ? `${ props.size.width } X ${ props.size.length } ` : null

  return (
    <Link to={`/properties/${ props.id }/${ sanitizeUrl(props.title) }`}>
      <div className={ s.container } >
        <div>
          <img
            alt='property'
            src={ props.imageUrl ? props.imageUrl : 'http://ghk.h-cdn.co/assets/cm/15/11/54ff82282ac26-living-room-green-window-de.jpg' }
          />
        </div>
        <div className={ s.info }>
          <h2> { props.title } </h2>
          <div className={ s.options }>
            <Option
              icon='bed'
              text={ t('detail_beds') }
              value={ props.bedRoomCount }
            />
            <Option
              icon='arrows-alt'
              text={ t('detail_size') }
              value={ size }
            />
            <Option
              icon='map-marker'
              text={ t('district') }
              value={ props.district ? t(props.district) : null }
            />
            <Option
              icon='usd'
              text={ t('detail_price') }
              value={ price ? formatCurrency(price, props.currency) : null }
            />
            <Option
              icon='clock-o'
              text={ t('detail_available_until') }
              value={ props.available ? formatDate(props.available) : null }
            />
            <Option
              icon='arrow-circle-o-right'
              text={ t('detail_facing_direction') }
              value={ props.facingDirection }
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default translate()(PropertyItem)
