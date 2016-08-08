import * as React from 'react'
import * as log from 'loglevel'

import { translate, InjectedTranslateProps } from 'react-i18next'

import Multistep, { IStep } from './ReactMultistep/ReactMultistep'
import './ReactMultistep/prog-tracker.less'

import { ICategory } from '../../../redux/modules/categories/categories.model'

import StepBasicInfo from './StepBasicInfo/StepBasicInfo'
import StepDescription from './StepDescription/StepDescription'

interface IProps extends InjectedTranslateProps, React.Props<any> {
  langCode: string
  categories: ICategory[]
}

export class PropertyWizard extends React.Component<IProps, void> {

  public refs: {
    [key: string]: any
    multistep: any
  }

  public render() {
    const { t } = this.props

    const steps: IStep[] = [
      {
        name: t('step_basic_info'),
        component: <StepBasicInfo langCode={ this.props.langCode } categories={ this.props.categories }
          onSubmit={ (formData) => {
          this.refs.multistep.next()
        } } />,
      },
      {
        name: t('step_description_vietnamese'),
        component: <StepDescription langCode={ this.props.langCode } />,
      },
      {
        name: t('step_description_english'),
        component: <StepDescription langCode={ this.props.langCode } />,
      },
    ]

    return (
      <div>
        <Multistep ref='multistep' showNavigation={false} steps={ steps }/>
      </div>
    )
  }
}

export default translate()(PropertyWizard)
