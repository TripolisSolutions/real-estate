import * as React from 'react'
import * as c from 'classnames'
import * as Dropzone from 'react-dropzone'

import { translate, InjectedTranslateProps } from 'react-i18next'

const s = require('./LanguageSelectPanel.less')

export interface IProps extends InjectedTranslateProps, React.Props<any> {
}

export class LanguageSelectPanel extends React.Component<IProps, void> {

  public render() {
    const { t } = this.props

    return (
      <div className={ c(s.panel, s.isOpen) }>
        <div className='panel__content'>
          <h4></h4>
          <h1>Bạn muốn chọn ngôn ngữ nào?</h1>
          <h1>What is your prefered language?</h1>
        </div>
        <div className='panel__flaps'>
          <div className='flap outer flap--left'></div>
          <a className='flap flap__btn'>
            <img src='https://lipis.github.io/flag-icon-css/flags/4x3/vn.svg'/>
            Vietnamese
          </a>
          <a className='flap flap__btn'>
            <img src='http://icons.iconarchive.com/icons/icons-land/vista-flags/256/English-Language-Flag-1-icon.png'/>
            English
          </a>
          <div className='flap outer flap--right'></div>
        </div>
      </div>
    )
  }
}

export default translate()(LanguageSelectPanel)
