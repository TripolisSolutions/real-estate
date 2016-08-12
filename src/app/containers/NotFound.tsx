import * as React from 'react'
import { browserHistory } from 'react-router'
const { connect } = require('react-redux')
import { translate, InjectedTranslateProps } from 'react-i18next'

import { IndexLink } from 'react-router'
import { IState } from '../redux/reducers'

interface IProps extends IState, InjectedTranslateProps {
}

class NotFound extends React.Component<IProps, {}> {
    public static contextTypes = {
        'router': React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
    }

    public render() {
        const { t } = this.props

        return (
            <main>
                <h3>{ t('page_not_found.heading') }</h3>

                <a onClick={ () => browserHistory.goBack() }>Go back</a>
                <IndexLink to='/'>{ t('page_not_found.main_page') }</IndexLink>
            </main>
        )
    }
}

export default connect(
  state => state
)(translate()(NotFound))
