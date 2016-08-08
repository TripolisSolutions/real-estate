import * as React from 'react'
import * as log from 'loglevel'
import { storiesOf, action } from '@kadira/storybook'

import '../../helpers/storyCommonResource'
import i18n, { StorybookProvider } from '../../helpers/storyTranslationHelper'
import ImageManager from './ImageManager'

const files = []
for (let i = 1; i < 18; i++) {
  files.push({
    id: '' + i,
    fullImageUrl: 'http://lorempixel.com/400/300/',
  })
}

storiesOf('ImageManager', module)
  .add('default', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <ImageManager
          images={ files }
          onFilesDrop={ (files) => { log.info('drop'); action('dropped files: ', files) } }
          isUploading={ false }
        />
      </StorybookProvider>
    )
  })
  .add('no images', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <ImageManager
          images={ [] }
          onFilesDrop={ (files) => { action('dropped files: ', files) } }
          isUploading={ false }
        />
      </StorybookProvider>
    )
  })
  .add('uploading', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <ImageManager
          images={ [] }
          onFilesDrop={ (files) => { action('dropped files: ', files) } }
          isUploading={ true }
        />
      </StorybookProvider>
    )
  })
