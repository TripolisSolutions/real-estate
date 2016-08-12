import * as React from 'react'
import * as log from 'loglevel'
import { storiesOf, action } from '@kadira/storybook'

import '../../../helpers/storyCommonResource'
import i18n, { StorybookProvider } from '../../../helpers/storyTranslationHelper'
import PropertyWizard from './PropertyWizard'

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
]

storiesOf('PropertyWizard', module)
  .add('default vietnamese', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <PropertyWizard
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
          googleMapAPIKey='AIzaSyDHU5dwOcUU7uO3fvvM_5ZQd-83tLykEpA'
          langCode={ 'en' }
          categories={ categories }
          onWizardDone={ (property) => action('wizard done', property)() }
        />
      </StorybookProvider>
    )
  })
