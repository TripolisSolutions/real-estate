import { ITranslatableText } from '../../models'
import { IImage } from '../images/images.model'

export interface ICategory {
  id: string
  name: ITranslatableText[]
  thumbnailImage: IImage
  galleryImages: IImage[]
  desc: ITranslatableText[]

  categoryID: string
  salesType: string
  availableUntil: Date
  size: {
    width: number
    length: number
  }
  address: {
    name: ITranslatableText[]
    viewport: {
      lat: number
      lng: number
      zoon: number
    }
    circleMarker: {
      lat: number
      lng: number
      radius: number
    }
    visible: number
  }

  bedRoomCount: number
  facingDirection: number
  rentalPeriod: {
    digits: number
    unit: string
  }

  visible: boolean

  c_at: string
  u_at: string
}
