import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'
import { connect } from 'mobx-connect'
import AlloyEditor from 'alloyeditor'
import log from 'loglevel'

import s from './RichEditor.less'

@FormsyElement()
@connect
class RichEditor extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.id = props.name
  }

  componentDidMount() {
    log.debug('RichEditor id: ', this.id)
    this.editor = AlloyEditor.editable(this.id, {})
  }

  componentWillUnmount() {
    this.editor.destroy()
  }

  onChange = (e) => {
    this.props.setValue(e.target.value)
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    return (
      <div id={ this.id } className={ s.editor }>
        <p>Content...</p>
      </div>
    )
  }
}

export default RichEditor
