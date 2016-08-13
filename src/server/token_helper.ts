import * as jwt from 'jwt-simple'
import * as nconf from 'nconf'

const createToken = (user, next) => {
  const payload = {
    sub: user.username,
  };
  const token = jwt.encode(payload, nconf.get('SETTINGS_LOGIN_SESSION_SECRET'));
  return next(token);
}

const decodeToken = (token, next) => {
  const payload = jwt.decode(token, nconf.get('SETTINGS_LOGIN_SESSION_SECRET'));
  return next(payload);
}

export { createToken, decodeToken }
