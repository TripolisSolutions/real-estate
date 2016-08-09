import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

import { Steps, Step } from './Multistep'

import { ICategory } from '../../../redux/modules/categories/categories.model'

import StepBasicInfo from './StepBasicInfo/StepBasicInfo'
import StepDescription from './StepDescription/StepDescription'

interface IProps extends InjectedTranslateProps {
  langCode: string
  categories: ICategory[]
}

const PropertyWizard = (props: IProps) => {
  const { t } = props

  return (
    <div>
      <Steps
        currentStep={1}
        prevButton='&#8592;'
        nextButton='&#8594;'
        stepShouldChange={this.stepShouldChange}
      >
        <Step customNavigator='User'>
        </Step>
        <Step customNavigator='User'>
        </Step>
        <Step customNavigator='User'>
        </Step>
      </Steps>
    </div>
  );
}

export default translate()(PropertyWizard)
