import * as jwt from 'jwt-simple'
import * as nconf from 'nconf'

const createToken = (user) => {
  const payload = {
    sub: user.username,
  };
  const token = jwt.encode(payload, nconf.get('SETTINGS_LOGIN_SESSION_SECRET'));
  return token
}

const decodeToken = (token) => {
  const payload = jwt.decode(token, nconf.get('SETTINGS_LOGIN_SESSION_SECRET'));
  return payload
}

export { createToken, decodeToken }
