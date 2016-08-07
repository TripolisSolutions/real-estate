import * as React from 'react'
import Multistep, { IStep } from 'react-multistep'
import { translate, InjectedTranslateProps } from 'react-i18next'

import 'react-multistep/assets/css/prog-tracker.css'

import { ICategory } from '../../../redux/modules/categories/categories.model'

import StepBasicInfo from './StepBasicInfo/StepBasicInfo'
import StepDescription from './StepDescription/StepDescription'

interface IProps extends InjectedTranslateProps {
  langCode: string
  categories: ICategory[]
}

const PropertyWizard = (props: IProps) => {
  const { t } = props

  const steps: IStep[] = [
    {
      name: t('step_basic_info'),
      component: <StepBasicInfo langCode={ props.langCode } categories={ props.categories } />,
    },
    {
      name: t('step_description_vietnamese'),
      component: <StepDescription langCode={ props.langCode } />,
    },
    {
      name: t('step_description_english'),
      component: <StepDescription langCode={ props.langCode } />,
    },
  ]

  return (
    <div>
      <Multistep showNavigation={true} steps={ steps }/>
    </div>
  );
}

export default translate()(PropertyWizard)
