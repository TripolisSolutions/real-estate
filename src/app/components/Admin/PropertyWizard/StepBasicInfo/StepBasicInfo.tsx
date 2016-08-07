import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

interface IProps extends InjectedTranslateProps {
  langCode: string
}

const StepBasicInfo = (props: IProps) => {
  const { t } = props

  return (
    <div>
      basic info
    </div>
  );
}

export default translate()(StepBasicInfo)
