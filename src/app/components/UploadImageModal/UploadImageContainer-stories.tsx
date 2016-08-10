import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import '../../helpers/storyCommonResource'
import i18n, { StorybookProvider } from '../../helpers/storyTranslationHelper'
import UploadImageContainer from './UploadImageContainer'

storiesOf('UploadImageContainer', module)
  .add('default vietnamese', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <UploadImageContainer
          onImageUploaded={ (image) => action('image uploaded: ', image)() }
        />
      </StorybookProvider>
    )
  })
