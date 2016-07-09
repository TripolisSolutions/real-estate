import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'

import { observer } from 'shared/context'

const s = require('./LanguageSelector.less')

function LanguageSelector(props) {
  return (
    <div>
      <div
        className={ props.getValue() === 'vietnamese' ? 'selected' : undefined }
        onClick={ (e) => props.setValue('vietnamese')}
        >Vietnamese</div>
      <div
        className={ props.getValue() === 'english' ? 'selected' : undefined }
        onClick={ (e) => props.setValue('english')}
        >English</div>
    </div>
  )
}

// @FormsyElement()
// export default class LanguageSelector extends React.Component {
//   render() {
//     return (
//       <div>
//         <div
//           className={ this.props.getValue() === 'vietnamese' ? 'selected' : undefined }
//           onClick={ (e) => this.props.setValue('vietnamese')}
//           >Vietnamese</div>
//         <div
//           className={ this.props.getValue() === 'english' ? 'selected' : undefined }
//           onClick={ (e) => this.props.setValue('english')}
//           >English</div>
//       </div>
//     )
//   }
// }

LanguageSelector.propTypes = {
  selected: React.PropTypes.string,
}

LanguageSelector.defaultProps = {
  selected: 'vietnamese',
}

export default FormsyElement()(LanguageSelector)
