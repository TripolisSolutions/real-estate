import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/app/components/Admin/PropertiesList/PropertiesList-stories')
  require('../src/app/components/Admin/PropertyWizard/PropertyWizard-stories')
  require('../src/app/components/ImageManager/ImageManager-stories')
  require('../src/app/components/ImageManager/ImageManagerModal-stories')
  require('../src/app/components/UploadImageModal/UploadImageContainer-stories')
  require('../src/app/components/GoogleMap/GoogleMap-stories')
  require('../src/app/components/LanguageSelectModal/LanguageSelectPanel-stories')
}

configure(loadStories, module);