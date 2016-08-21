import { ITranslatableText, ITranslatablePrice } from '../../models'
import { IImage } from '../images/images.model'

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

  contactInfos?: IContactInfo[]

  categoryID?: string
  salesType?: string
  availableUntil?: Date
  size?: {
    area?: number
  }
  address?: {
    name: ITranslatableText[]
    district?: string
    viewport?: IMapViewport
    circleMarker?: ICircleMarker
    visible?: boolean
  }

  bedRoomCount?: number
  facingDirection?: string
  rentalPeriod?: {
    negotiable: boolean
    digits: number
    unit: string
  }

  price?: ITranslatablePrice[]

  visible?: boolean

  c_at?: string
  u_at?: string
}

export interface IContactInfo {
  phone: string
  ownerName: string
  ownerAvatar: IImage
}
