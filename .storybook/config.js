import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/app/components/Admin/PropertiesList/PropertiesList-stories')
}

configure(loadStories, module);