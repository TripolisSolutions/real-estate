import * as React from 'react'
import * as c from 'classnames'

import { Col } from 'react-bootstrap'

const cookie = require('react-cookie')

import { translate, InjectedTranslateProps } from 'react-i18next'

const s = require('./LanguageSelectPanel.less')

export interface IProps extends InjectedTranslateProps, React.Props<any> {
  selectLang(langCode: string)
}

export class LanguageSelectPanel extends React.Component<IProps, void> {

  public componentDidMount() {
    // So that if visiter hasn't pick a language, immediate refresh would show popup language select againg
    cookie.remove('i18next')
  }

  public render() {
    const { t } = this.props

    return (
      <div className={ c(s.panel, s.isOpen) }>
        <div className='panel__content'>
          <h1>
            Language - Ngôn ngữ
          </h1>
        </div>
        <div className='panel__flaps'>
          <div className={ s.btn }>
            <h2> English </h2>
            <Col md={ 5 }>
              <a onClick={ () => this.props.selectLang('en') }>
                <img src='https://lipis.github.io/flag-icon-css/flags/4x3/us.svg'/>
              </a>
            </Col>
          </div>
          <div className={ s.btn }>
            <h2> Tiếng việt </h2>
            <Col md={ 5 }>
              <a onClick={ () => this.props.selectLang('vi') }>
                <img src='https://lipis.github.io/flag-icon-css/flags/4x3/vn.svg'/>
              </a>
            </Col>
          </div>
        </div>
      </div>
    )
  }
}

export default translate()(LanguageSelectPanel)
