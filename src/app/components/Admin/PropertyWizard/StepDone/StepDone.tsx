import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

interface IProps extends InjectedTranslateProps {
  langCode: string
  onSubmit?()
}

const StepBasicInfo = (props: IProps) => {
  const { t } = props

  return (
    <div>
      <button className='btn btn-lg btn-primary' onClick={ props.onSubmit }>
        <span className='glyphicon glyphicon-saved'></span> { t('create_the_property') }
      </button>
    </div>
  );
}

export default translate()(StepBasicInfo)
