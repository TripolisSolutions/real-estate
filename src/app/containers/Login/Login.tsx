import * as React from 'react'
import * as log from 'loglevel'
import { browserHistory } from 'react-router'

// const EmailSignInForm = require('redux-auth/bootstrap-theme').EmailSignInForm
import Login from '../../components/Login/Login'
import { logIn } from '../../helpers/auth'

export default class PropertiesListContainer extends React.Component<{}, {
  error: boolean
}> {

  constructor(props) {
    super(props)

    this.state = {
      error: false,
    }
  }

  public onLoginAttempt = (login) => {

    fetch('/auth/sign_in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(res => {
              const props = this.props as any
              const location = props.location as any

              logIn(res)

              if (location.state && location.state.nextPathname) {
                browserHistory.push(location.state.nextPathname)
              } else {
                browserHistory.push('/admin')
              }
            });
        } else {
          this.setState({
            error: true,
          })
        }
      })
      .catch(err => {
        log.error('error login: ', err)
        this.setState({
          error: true,
        })
      });
    browserHistory.push('/admin')
  }

  private hideError = () => {
    this.setState({
      error: false,
    })
  }

  public render() {
    return(
      <Login submitForm={ this.onLoginAttempt } onChange={ this.hideError } error={ this.state.error }/>
    );
  }
}
