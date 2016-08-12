import * as React from 'react'
import * as log from 'loglevel'
import { storiesOf, action } from '@kadira/storybook'

import '../../../helpers/storyCommonResource'
import i18n, { StorybookProvider } from '../../../helpers/storyTranslationHelper'
import PropertyWizard from './PropertyWizard'
import { IProperty } from '../../../redux/modules/properties/properties.model'

log.setLevel(0)

const categories = [
  {
    id: '1',
    name: [
      {
        language: 'vietnamese',
        text: 'Cat 1',
      },
      {
        language: 'english',
        text: 'Cat 1',
      },
    ],
  },
  {
    id: '2',
    name: [
      {
        language: 'vietnamese',
        text: 'Cat 2',
      },
      {
        language: 'english',
        text: 'Cat 2',
      },
    ],
  },
]

storiesOf('PropertyWizard', module)
  .add('default vietnamese', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <PropertyWizard
          imageRootUrl={ 'http://localhost:8999/public/images' }
          googleMapAPIKey='AIzaSyDHU5dwOcUU7uO3fvvM_5ZQd-83tLykEpA'
          langCode={ 'vi' }
          categories={ categories }
          onWizardDone={ (property) => action('wizard done', property)() }
        />
      </StorybookProvider>
    )
  })
  .add('default english', () => {
    i18n.changeLanguage('en')

    return (
      <StorybookProvider>
        <PropertyWizard
          imageRootUrl={ 'http://localhost:8999/public/images' }
          googleMapAPIKey='AIzaSyDHU5dwOcUU7uO3fvvM_5ZQd-83tLykEpA'
          langCode={ 'en' }
          categories={ categories }
          onWizardDone={ (property) => action('wizard done', property)() }
        />
      </StorybookProvider>
    )
  })
  .add('edit english', () => {
    i18n.changeLanguage('en')

    const property: IProperty = {
      id: 'abc',
      name: [
        {
          language: 'vietnamese',
          text: 'Ưu đãi mùa thu cho căn hộ Hateco Hoàng Mai',
        },
        {
          language: 'english',
          text: 'Apartment for rent in Happy Valley, Phu My Hung, District 7, HCM',
        },
      ],
      price: [
        {
          currency: 'VND',
          value: 5000000,
        },
        {
          currency: 'USD',
          value: 100,
        },
      ],
      categoryID: '2',
      salesType: 'rent',
      rentalPeriod: {
        digits: 2,
        unit: 'months',
      },
      availableUntil: new Date('2017/02/03'),
      facingDirection: 'west',
      bedRoomCount: 4,
      size: {
        width: 200,
        length: 50,
      },

      desc: [
        {
          language: 'vietnamese',
          text: '<b>Ưu đãi</b> mùa thu cho căn hộ Hateco Hoàng Mai',
        },
        {
          language: 'english',
          text: '<p>Apartment for rent in Happy Valley, Phu My Hung, District 7, HCM</p>',
        },
      ],

      thumbnailImage: {
        id: 'i',
        fileName: 'images (5).jpeg',
      },

      galleryImages: [
        {
          id: 'i1',
          fileName: 'images (5).jpeg',
        },
        {
          id: 'i2',
          fileName: 'images (5).jpeg',
        },
      ],

      address: {
        name: [
          {
            language: 'vietnamese',
            text: 'Thao Dien, quan 2',
          },
          {
            language: 'english',
            text: 'Thao dien, district 2',
          },
        ],
        viewport: {
          lat: 10.785937800000015,
          lng: 106.52558109999995,
          zoom: 16,
        },
        circleMarker: {
          lat: 10.785937800000015,
          lng: 106.52558109999995,
          radius: 300,
        },
        visible: true,
      },
    }

    return (
      <StorybookProvider>
        <PropertyWizard
          imageRootUrl={ 'http://localhost:8999/public/images' }
          property={ property }
          googleMapAPIKey='AIzaSyDHU5dwOcUU7uO3fvvM_5ZQd-83tLykEpA'
          langCode={ 'en' }
          categories={ categories }
          onWizardDone={ (property) => action('wizard done', property)() }
        />
      </StorybookProvider>
    )
  })
