import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import '../../../helpers/storyCommonResource'
import { IProperty } from '../../../redux/modules/properties/properties.model'
import i18n, { StorybookProvider } from '../../../helpers/storyTranslationHelper'
import PropetiesList from './PropertiesList'

const properties: IProperty[] = [
  {
    id: '1',
    name: [
      {
        language: 'vietnamese',
        text: 'Căn hộ Đức Long Golden Land Q7, vị trí hot giá thấp nhất khu vực, giá chỉ từ 1 tỷ/căn, CK 5%',
      },
      {
        language: 'english',
        text: 'Vinhome Central Park-Prime location, City\'s iconic park with stunning riverview, luxury furniture',
      },
    ],
    c_at: new Date().toString(),
  },
  {
    id: '2',
    name: [
      {
        language: 'vietnamese',
        text: 'Văn phòng cho thuê Bình Dương: Thành phố trải thảm, doanh nghiệp thờ ơ (kỳ 1)',
      },
      {
        language: 'english',
        text: 'Own an apartment in city center with price from $2500 USD/sqm. Discount up to 13.5%',
      },
    ],
    c_at: new Date().toString(),
  },
  {
    id: '3',
    name: [
      {
        language: 'vietnamese',
        text: 'Tp.HCM: Tổ chức rà soát các dự án “có vấn đề”',
      },
      {
        language: 'english',
        text: 'Apartment Centana in Thu Thiem, District 2. Price: only 1.3 billion',
      },
    ],
    c_at: new Date().toString(),
  },
]

storiesOf('PropertiesList', module)
  .add('default vietnamese', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <PropetiesList
          pageNum={ 10 }
          perPage={ 5 }
          currentPage={ 1 }
          properties={ properties }
          isFetching={ false }
          langCode={ 'vi' }
          onDeleteClicked={ (id) => action('delete click, id: ' + id) }
        />
      </StorybookProvider>
    )
  })
  .add('default english', () => {
    i18n.changeLanguage('en')

    return (
      <StorybookProvider>
        <PropetiesList
          pageNum={ 10 }
          perPage={ 5 }
          currentPage={ 1 }
          properties={ properties }
          isFetching={ false }
          langCode={ 'en' }
          onDeleteClicked={ (id) => action('delete click, id: ' + id) }
        />
      </StorybookProvider>
    )
  })
