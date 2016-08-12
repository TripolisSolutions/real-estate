import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'
import * as log from 'loglevel'

const AlloyEditor = require('../../../alloyeditor/dist/alloy-editor/alloy-editor-no-react')
require('../../../alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean.css')

const s = require('./StepDescription.less')

interface IProps extends InjectedTranslateProps {
  langCode: string
  initialValue: string
  onChange(desc: string)
}

class StepDescription extends React.Component<IProps, void> {

  private id: string
  private retrieveContentInterval
  private editor

  constructor(props: IProps) {
    super(props)

    this.id = Math.random().toString()

    let prevContent
    this.retrieveContentInterval = setInterval(() => {
      const content = this.editor.get('nativeEditor').getData()

      if (prevContent === content) {
        return
      }

      log.debug('interval saving content: ', content)
      props.onChange(content)
      prevContent = content
    }, 1000)
  }

  public componentDidMount() {
    log.debug('RichEditor id: ', this.id)
    this.editor = AlloyEditor.editable(this.id, {})
  }

  public componentWillUnmount() {
    this.editor.destroy()
    clearInterval(this.retrieveContentInterval)
  }

  public render() {
    const { t } = this.props

    return (
      <div id={ this.id } className={ s.editor }>
        <p>{ this.props.initialValue || t('description_default_content')  }</p>
      </div>
    )
  }
}

export default translate()(StepDescription)
