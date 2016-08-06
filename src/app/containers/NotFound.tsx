import * as React from 'react'

import { IndexLink } from 'react-router'


class NotFound extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    public render() {
        const { router } = this.context as any

        return <main className="">
            <h3>Page not found. Are you lost ?</h3>

            <a onClick={router.goBack}>Go back</a>
            <IndexLink to="/">Main menu</IndexLink>
        </main>
    }
}

export default NotFound
