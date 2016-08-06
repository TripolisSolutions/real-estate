import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'

import { observer } from 'shared/context'

const s = require('./LanguageSelector.less')

function LanguageSelector(props) {

  function onChange(value) {
    props.setValue(value)
    props.onChange(value)
  }

  return (
    <div>
      <div
        className={ props.getValue() === 'vietnamese' ? s.selected : undefined }
        onClick={ () => onChange('vietnamese') }
        >Vietnamese</div>
      <div
        className={ props.getValue() === 'english' ? s.selected : undefined }
        onClick={ () => onChange('english') }
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
