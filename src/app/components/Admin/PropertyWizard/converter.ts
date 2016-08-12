import { IProperty } from '../../../redux/modules/properties/properties.model'
import { IFormData as IBasicInfoFormData } from './StepBasicInfo/StepBasicInfo'

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
      value: parseFloat(data.price_in_vnd as any),
    },
    {
      currency: 'USD',
      value: parseFloat(data.price_in_usd as any),
    },
  ]

  if (data.category) {
    cat.categoryID = data.category
  }

  cat.salesType = data.sale_type

  cat.rentalPeriod = {
    digits: parseInt(data.rental_period_value as any, 10),
    unit: data.rental_period_unit,
  }

  cat.availableUntil = data.available_until

  cat.facingDirection = data.facing_direction

  cat.bedRoomCount = parseInt(data.bed_room_count as any, 10)

  cat.size = {
    width: parseInt(data.size_width as any, 10),
    length: parseInt(data.size_length as any, 10),
  }

  return cat
}
