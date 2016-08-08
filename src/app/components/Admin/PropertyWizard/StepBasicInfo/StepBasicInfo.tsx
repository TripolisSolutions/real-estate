import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

import { ICategory } from '../../../../redux/modules/categories/categories.model'
import Form from './Form'

interface IProps extends InjectedTranslateProps {
  langCode: string
  categories: ICategory[]
  onSubmit?(data)
}

const StepBasicInfo = (props: IProps) => {
  const { t } = props

  function onSubmit(data) {
    if (props.onSubmit) {
      console.log('data: ', data)
      props.onSubmit(data)
    }
  }

  return (
    <div>
      <Form onSubmit={ onSubmit } categories={ props.categories } langCode={ props.langCode }/>
    </div>
  );
}

export default translate()(StepBasicInfo)
