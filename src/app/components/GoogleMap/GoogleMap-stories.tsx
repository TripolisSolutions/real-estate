import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import '../../helpers/storyCommonResource'
import i18n, { StorybookProvider } from '../../helpers/storyTranslationHelper'
import GoogleMap from './GoogleMap'

storiesOf('GoogleMap', module)
  .add('default vietnamese', () => {
    i18n.changeLanguage('vi')

    return (
      <StorybookProvider>
        <div>
          <GoogleMap
            googleMapAPIKey='AIzaSyDHU5dwOcUU7uO3fvvM_5ZQd-83tLykEpA'
            circleMarker={{
              lat: 10.81442195828899,
              lng: 106.6552734375,
              radius: 2033.0578656555838,
            }}
            onClick={ action('click') }
            onViewportChange={ action('viewport change') }
          />
        </div>
      </StorybookProvider>
    )
  })
