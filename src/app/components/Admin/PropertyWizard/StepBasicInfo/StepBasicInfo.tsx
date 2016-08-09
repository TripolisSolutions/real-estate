import * as React from 'react'
import * as log from 'loglevel'
import { translate, InjectedTranslateProps } from 'react-i18next'

import { ICategory } from '../../../../redux/modules/categories/categories.model'
import Form from './Form'

interface IProps extends InjectedTranslateProps {
  langCode: string
  categories: ICategory[]
  onSubmit?(data)
}

const StepBasicInfo = (props: IProps) => {

  function onSubmit(data) {
    if (props.onSubmit) {
      log.debug('basic info submit data: ', data)
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
