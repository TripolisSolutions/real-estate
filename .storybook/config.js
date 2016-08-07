import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/app/components/Admin/PropertiesList/PropertiesList-stories')
  require('../src/app/components/Admin/PropertyWizard/PropertyWizard-stories')
}

configure(loadStories, module);