import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import '../../helpers/storyCommonResource'
import i18n, { StorybookProvider } from '../../helpers/storyTranslationHelper'
import ImageManagerModal from './ImageManagerModal'

const files = []
for (let i = 1; i < 18; i++) {
  files.push({
    id: '' + i,
    fullImageUrl: 'http://lorempixel.com/400/300/',
  })
}

storiesOf('ImageManagerModal', module)
  .add('default', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <ImageManagerModal
          show={ true }
          onHideClicked={ () => action('hide')() }
          images={ files }
          onFilesDrop={ (files) => { action('dropped files: ', files)() } }
          isUploading={ false }
        />
      </StorybookProvider>
    )
  })
  .add('no images', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <ImageManagerModal
          show={ true }
          onHideClicked={ () => action('hide')() }
          images={ [] }
          onFilesDrop={ (files) => { action('dropped files: ', files)() } }
          isUploading={ false }
        />
      </StorybookProvider>
    )
  })
  .add('uploading', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <ImageManagerModal
          show={ true }
          onHideClicked={ () => action('hide')() }
          images={ [] }
          onFilesDrop={ (files) => { action('dropped files: ', files)() } }
          isUploading={ true }
        />
      </StorybookProvider>
    )
  })
