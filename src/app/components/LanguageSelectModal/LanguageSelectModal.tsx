import * as React from 'react'

import {
  Button,
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
    const { t } = this.props

    function onHideClicked() {
      
    }

    return (
      <div className={ s.modalContainer }>
        <Modal show={ this.props.show } onHide={ onHideClicked }
          animation={ false }
          backdrop={ true }
          enforceFocus={ true }
          dialogComponent={
            <div></div>
          }
          dialogClassName={ s.dialog }
        >
          <LanguageSelectPanel/>
        </Modal>
      </div>
    )
  }
}

export default translate()(LanguageSelectModal)
