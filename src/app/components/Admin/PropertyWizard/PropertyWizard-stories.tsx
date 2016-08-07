import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import '../../../helpers/storyCommonResource'
import { IProperty } from '../../../redux/modules/properties/properties.model'
import i18n, { StorybookProvider } from '../../../helpers/storyTranslationHelper'
import PropertyWizard from './PropertyWizard'

storiesOf('PropertyWizard', module)
  .add('default vietnamese', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <PropertyWizard
          langCode={ 'vi' }
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
        />
      </StorybookProvider>
    )
  })
