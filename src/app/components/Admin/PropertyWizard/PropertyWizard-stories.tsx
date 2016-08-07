import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import '../../../helpers/storyCommonResource'
import { IProperty } from '../../../redux/modules/properties/properties.model'
import i18n, { StorybookProvider } from '../../../helpers/storyTranslationHelper'
import PropertyWizard from './PropertyWizard'

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
]

storiesOf('PropertyWizard', module)
  .add('default vietnamese', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <PropertyWizard
          langCode={ 'vi' }
          categories={ categories }
        />
      </StorybookProvider>
    )
  })
  .add('default english', () => {
    i18n.changeLanguage('en')

    return (
      <StorybookProvider>
        <PropertyWizard
          langCode={ 'en' }
          categories={ categories }
        />
      </StorybookProvider>
    )
  })
