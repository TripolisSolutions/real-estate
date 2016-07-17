const translations = {
  english: {
    'saleTypes.buy': 'Buy',
    'saleTypes.rent': 'Rent',
    'directions.west': 'West',
    'directions.east': 'East',
  },
  vietnamese: {
    'saleTypes.buy': 'Mua',
    'saleTypes.rent': 'Thuê',
    'directions.west': 'Tây',
    'directions.east': 'Đông',
  }
}

export default function(language = 'vietnamese') {
  return translations[language]
}
