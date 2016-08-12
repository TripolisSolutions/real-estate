import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'
// import * as log from 'loglevel'

const ReactQuill = require('react-quill')

require('./quill.snow.less')
const s = require('./StepDescription.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  initialValue: string
  onChange(desc: string)
}

class StepDescription extends React.Component<IProps, void> {

  constructor(props: IProps) {
    super(props)
  }

  public render() {
    // const { t } = this.props

    return (
      <ReactQuill theme='snow'
        className={ s.editor }
        value={ this.props.initialValue }
        onChange={this.props.onChange}
      />
    )
  }
}

export default translate()(StepDescription)
