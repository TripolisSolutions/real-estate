import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

const Form = require('./Form').default

interface IProps extends InjectedTranslateProps {
  langCode: string
}

const StepBasicInfo = (props: IProps) => {
  const { t } = props

  function onSubmit(data) {
    console.log('data: ', data)
  }

  return (
    <div>
      <Form onSubmit={ onSubmit }/>
    </div>
  );
}

export default translate()(StepBasicInfo)
