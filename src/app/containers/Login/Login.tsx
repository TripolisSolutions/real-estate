import * as React from 'react'
import * as log from 'loglevel'
import { browserHistory } from 'react-router'

// const EmailSignInForm = require('redux-auth/bootstrap-theme').EmailSignInForm
import Login from '../../components/Login/Login'

export default class PropertiesListContainer extends React.Component<{}, {}> {

  public onNext = (login) => {
    log.debug('login success:  ', login)
    browserHistory.push('/admin')
  }

  public render() {
    return(
      <Login submitForm={ this.onNext }/>
    );
  }
}
