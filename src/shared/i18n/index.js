const translations = {
  english: {
    'salesTypes.buy': 'Buy',
    'salesTypes.rent': 'Rent',
    'directions.west': 'West',
    'directions.east': 'East',
    'rentalPeriods.days': 'Days',
    'rentalPeriods.months': 'Months',
    'rentalPeriods.quarters': 'Quarters',
    'rentalPeriods.years': 'Years',
  },
  vietnamese: {
    'salesTypes.buy': 'Mua',
    'salesTypes.rent': 'Thuê',
    'directions.west': 'Tây',
    'directions.east': 'Đông',
    'rentalPeriods.days': 'Ngày',
    'rentalPeriods.months': 'Tháng',
    'rentalPeriods.quarters': 'Quý',
    'rentalPeriods.years': 'Năm',
  }
}

export default function(language = 'vietnamese') {
  return translations[language]
}
