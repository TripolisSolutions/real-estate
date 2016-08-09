import * as React from 'react'
const { connect } = require('react-redux')
import { translate, InjectedTranslateProps } from 'react-i18next'

import { IndexLink } from 'react-router'
import { IState } from '../redux/reducers'

interface IProps extends IState, InjectedTranslateProps {
}

@connect(
  state => state
)
class NotFound extends React.Component<IProps, any> {
    public contextTypes = {
        router: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
    }

    public render() {
        const { t } = this.props
        const router = (this.context as any).router as any

        return (
            <main>
                <h3>{ t('page_not_found.heading') }</h3>

                <a onClick={ router.goBack() }>Go back</a>
                <IndexLink to='/'>{ t('page_not_found.main_page') }</IndexLink>
            </main>
        )
    }
}

export default translate()(NotFound)
