import { ITranslatableText } from '../../models'
import { IImage } from '../images/images.model'

interface ITranslatablePrice {
  value: number
  currency: string
}

export interface IMapViewport {
  lat: number
  lng: number
  zoom: number
}

export interface ICircleMarker {
  lat: number
  lng: number
  radius: number
}

export interface IProperty {
  id: string
  name: ITranslatableText[]
  thumbnailImage?: IImage
  galleryImages?: IImage[]
  desc?: ITranslatableText[]

  categoryID?: string
  salesType?: string
  availableUntil?: Date
  size?: {
    width: number
    length: number
  }
  address?: {
    name: ITranslatableText[]
    viewport: IMapViewport
    circleMarker: ICircleMarker
    visible: boolean
  }

  bedRoomCount?: number
  facingDirection?: string
  rentalPeriod?: {
    digits: number
    unit: string
  }

  price?: ITranslatablePrice[]

  visible?: boolean

  c_at?: string
  u_at?: string
}
