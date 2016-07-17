import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'
import { connect } from 'mobx-connect'
import AlloyEditor from 'alloyeditor'

@FormsyElement()
@connect
class RichEditor extends React.Component {

  propTypes = {
    value: React.PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.id = Math.random().toString()
  }

  componentDidMount() {
    this.editor = AlloyEditor.editable(this.id, this.props.alloyEditorConfig)
    // const $ele = $(this.refs.main)
    // $ele.trumbowyg()
    // .on('tbwchange', () => {
    //   const content = $ele.trumbowyg('html')

    //   this.setValue(content)

    //   if (this.onChange) {
    //     this.onChange(content)
    //   }
    // })
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
      <div id={ this.id } ref='container'>
      </div>
    )
  }
}

export default RichEditor
