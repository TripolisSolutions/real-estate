import { IOption } from 'formsy-react-components'
import { salesTypeOptions, facingDirectionOptions, rentalPeriodOptions, districtOptions, sizeOptions } from './optionsData'

export function translateOptions(options, t): IOption[] {
  return options.map((item) => {
    return {
      value: item.value,
      label: t(item.translationKey),
    }
  })
}

export const emptyOption = {
  value: '',
  label: '-----',
}

export function translatedOptions(t, shiftEmpty = true) {
  const salesTypes = translateOptions(salesTypeOptions, t)

  const facingDirections = translateOptions(facingDirectionOptions, t)

  const rentalPeriods = translateOptions(rentalPeriodOptions, t)

  const districts = translateOptions(districtOptions, t)

  const sizes = translateOptions(sizeOptions, t)

  if (shiftEmpty) {
    salesTypes.unshift(emptyOption)
    facingDirections.unshift(emptyOption)
    rentalPeriods.unshift(emptyOption)
    districts.unshift(emptyOption)
    sizes.unshift(emptyOption)
  }

  return {
    salesTypes,
    facingDirections,
    rentalPeriods,
    districts,
    sizes,
  }
}
