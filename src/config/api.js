const debug = process.env.NODE_ENV !== 'production'

export default {
  root: debug ? 'http://api.rest-starter.dev' : 'https://api.example.com',
  auth: {
    loginUrl: 'auth/login',
    registerUrl: 'auth/register',
    tokenUrl: 'auth/refresh-token',
    fetchUrl: 'auth/me',
    authRedirect: 'auth/login',
    tokenTimeoutOffset: 60 * 1000 * 10 // 10 minutes
  }
}
