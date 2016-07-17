import React from 'react'
import { observer as mobxObserver } from 'mobx-react'
import log from 'loglevel'

const contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
  location: React.PropTypes.object,
  history: React.PropTypes.object,
}

export class ContextProvider extends React.Component {

  static propTypes = {
    context: React.PropTypes.object,
    children: React.PropTypes.any,
  }

  static childContextTypes= contextTypes

  getChildContext() {
    return this.props.context
  }

  render() {
    if (!this.props) {
      return null
    }
    return this.props.children
  }
}

/**
 * Decorate components with context and observable
 * @param component
 * @returns {Function|Class}
 */
export function observer(target: any) {
  log.warn('observer is deprecated! use connect from mobx-connect instead')
  Object.assign(target, { contextTypes })
  return mobxObserver(target)
}
