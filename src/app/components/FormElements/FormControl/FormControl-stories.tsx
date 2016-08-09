import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import '../../../helpers/storyCommonResource'
import FormControl from './FormControl'

storiesOf('FormControl', module)
  .add('FormControl', () => {
    return (
      <FormControl />
    )
  })
