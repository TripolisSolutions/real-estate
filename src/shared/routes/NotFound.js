import React from 'react'
import { connect } from 'mobx-connect'
import { IndexLink } from 'react-router'

@connect
class NotFound extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { router } = this.context

        return <main className="">
            <h3>Page not found. Are you lost ?</h3>

            <a onClick={router.goBack}>Go back</a>
            <IndexLink to="/">Main menu</IndexLink>
        </main>
    }
}

export default NotFound
