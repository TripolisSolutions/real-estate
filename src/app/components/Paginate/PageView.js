/*eslint-disable */
import React from 'react'
import { Link } from 'react-router'

export default class PageView extends React.Component {
  render() {
    let linkClassName = this.props.pageLinkClassName
    let cssClassName = this.props.pageClassName
    let onClick = this.props.onClick

    if (this.props.selected) {
      if (typeof(cssClassName) !== 'undefined') {
        cssClassName = cssClassName + ' ' + this.props.activeClassName
      } else {
        cssClassName = this.props.activeClassName
      }
    }

    return (
        <li className={cssClassName}>
            <Link className={linkClassName} to={ this.props.navigateUrl + '?page=' + (this.props.page - 1) }>
              {this.props.page}
            </Link>
        </li>
    )
  }
}
