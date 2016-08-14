import * as React from 'react'
import Icon from '../../Icon/Icon'
import { translate, InjectedTranslateProps } from 'react-i18next'

const s = require('./Option.less')

interface IProps extends InjectedTranslateProps {
  icon: string
  text: string
  value: string | number
}

function Option(props: IProps) {
  return (
    <div className={ s.container } >
      <div className={ s.icon }>
        <Icon icon={ props.icon } />
      </div>
      <span>{ props.text }: </span>
      <span> { props.value || props.t('unknown') } </span>
    </div>
  )
}

export default translate()(Option)
