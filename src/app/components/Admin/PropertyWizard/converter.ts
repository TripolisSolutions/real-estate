import { IProperty } from '../../../redux/modules/properties/properties.model'
import { IFormData as IBasicInfoFormData } from './StepBasicInfo/Form'

export function bindBasicInfoToProperty(cat: IProperty, data: IBasicInfoFormData): IProperty {
  cat.name = [
    {
      language: 'vietnamese',
      text: data.title_in_vietnamese,
    },
    {
      language: 'english',
      text: data.title_in_english,
    },
  ]

  cat.price = [
    {
      currency: 'VND',
      value: data.price_in_vnd,
    },
    {
      currency: 'USD',
      value: data.price_in_usd,
    },
  ]

  if (data.category) {
    cat.categoryID = data.category
  }

  cat.salesType = data.sale_type

  cat.rentalPeriod = {
    digits: data.rental_period_value,
    unit: data.rental_period_unit,
  }

  cat.availableUntil = data.available_until

  cat.facingDirection = data.facing_direction

  cat.bedRoomCount = data.bed_room_count

  cat.size = {
    width: data.size_width,
    length: data.size_length,
  }

  return cat
}
