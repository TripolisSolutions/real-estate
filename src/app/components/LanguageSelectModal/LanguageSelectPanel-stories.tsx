import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import '../../helpers/storyCommonResource'
import i18n, { StorybookProvider } from '../../helpers/storyTranslationHelper'
import LanguageSelectPanel from './LanguageSelectPanel'

storiesOf('LanguageSelectPanel', module)
  .add('default vietnamese', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <LanguageSelectPanel
        />
      </StorybookProvider>
    )
  })
