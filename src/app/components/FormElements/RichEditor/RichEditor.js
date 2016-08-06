import React from 'react'
import {Decorator as FormsyElement} from 'formsy-react'
import { FormGroup, ControlLabel } from 'react-bootstrap'

import AlloyEditor from 'alloyeditor'
import log from 'loglevel'

import s from './RichEditor.less'

@FormsyElement()

class RichEditor extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
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
      <FormGroup>
        <ControlLabel>{ this.props.label }</ControlLabel>
        <div id={ this.id } className={ s.editor }>
          <p>{ this.props.placeholder }</p>
        </div>
      </FormGroup>
    )
  }
}

export default RichEditor
