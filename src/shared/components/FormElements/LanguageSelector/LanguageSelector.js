import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'

import { observer } from 'shared/context'

const s = require('./LanguageSelector.less')

function LanguageSelector(props) {
  return (
    <div>
      <div
        className={ props.getValue() === 'vietnamese' ? s.selected : undefined }
        onClick={ (e) => props.setValue('vietnamese')}
        >Vietnamese</div>
      <div
        className={ props.getValue() === 'english' ? s.selected : undefined }
        onClick={ (e) => props.setValue('english')}
        >English</div>
    </div>
  )
}

LanguageSelector.propTypes = {
  selected: React.PropTypes.string,
}

LanguageSelector.defaultProps = {
  selected: 'vietnamese',
}

export default FormsyElement()(LanguageSelector)
