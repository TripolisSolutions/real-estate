import * as React from 'react'

import {
  Modal,
} from 'react-bootstrap'

const s = require('./LanguageSelectPanel.less')

import { translate, InjectedTranslateProps } from 'react-i18next'

import LanguageSelectPanel, { IProps as IUploadImagePanelProps } from './LanguageSelectPanel'

interface IProps extends IUploadImagePanelProps, InjectedTranslateProps, React.Props<any> {
  show: boolean
}

export class LanguageSelectModal extends React.Component<IProps, void> {

  public render() {
    return (
      <div className={ s.modalContainer }>
        <Modal show={ this.props.show } onHide={ () => {} }
          animation={ false }
          backdrop={ true }
          enforceFocus={ true }
          dialogClassName={ s.dialog }
        >
          <LanguageSelectPanel selectLang={ this.props.selectLang }/>
        </Modal>
      </div>
    )
  }
}

export default translate()(LanguageSelectModal)
