import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'
import 'trumbowyg'
import { connect } from 'mobx-connect'

import 'trumbowyg/dist/ui/trumbowyg.min.css'

// const s = require('./Textarea.less')

@FormsyElement()
@connect
class RichEditor {

  propTypes = {
    value: React.PropTypes.string,
  }

  componentDidMount() {
    const $ele = $(this.refs.main)
    $ele.trumbowyg()
    .on('tbwchange', () => {
      const content = $ele.trumbowyg('html')

      this.setValue(content)

      if (this.onChange) {
        this.onChange(content)
      }
    })
  }

  onChange = (e) => {
    this.props.setValue(e.target.value)
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    return (
      <div ref='main'>
      </div>
    )
  }
}

export default RichEditor
