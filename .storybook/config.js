import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/app/components/Admin/PropertiesList/PropertiesList-stories')
  require('../src/app/components/Admin/PropertyWizard/PropertyWizard-stories')
  require('../src/app/components/ImageManager/ImageManager-stories')
  require('../src/app/components/ImageManager/ImageManagerModal-stories')
}

configure(loadStories, module);