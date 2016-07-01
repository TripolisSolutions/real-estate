import React from 'react'
import { observer as mobxObserver } from 'mobx-react'

import { Store } from './store'

const contextTypes = {
  store:  React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
  location: React.PropTypes.object,
  history: React.PropTypes.object,
}

export class ContextProvider extends React.Component {

  static childContextTypes= contextTypes

  getChildContext() {
    return this.props.context
  }

  render(): React.ReactElement<any> {
    if (this.props) {
      return this.props.children
    }
  }
}

/**
 * Decorate components with context and observable
 * @param component
 * @returns {Function|Class}
 */
export function observer(target: any) {
    target.contextTypes = contextTypes
    return mobxObserver(target)
}
