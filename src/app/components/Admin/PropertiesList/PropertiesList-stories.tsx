import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import '../../../helpers/storyCommonResource'
import { IProperty } from '../../../redux/modules/properties/properties.model'
import { StorybookProvider } from '../../../helpers/storyTranslationHelper'
import PropetiesList from './PropertiesList'

storiesOf('PropertiesList', module)
  .add('default', () => {
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
    ]

    return (
      <StorybookProvider>
        <PropetiesList
          properties={ properties }
          isFetching={ false }
          langCode={ 'vi' }
        />
      </StorybookProvider>
    )
  })
